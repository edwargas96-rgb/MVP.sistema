import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthUser,
  Catalogs,
  Clinic,
  LabDataset,
  Order,
  OrderEvent,
  OrderFile,
  OrderStatus,
  Patient,
  Prioridade,
} from "../types";
import { createLabStore, genId, sessionKey } from "../lib/store";
import { useBrand } from "../brand/BrandProvider";

interface DataContextValue {
  brandId: string;
  data: LabDataset;
  currentUser: AuthUser | null;
  /**
   * Ambiente de demonstração: sempre autentica com sucesso, mesmo com campos
   * vazios. Se o e-mail informado corresponder a um cadastro conhecido, usa
   * esse perfil; caso contrário, usa o perfil de demonstração do papel
   * (laboratório ou clínica) solicitado.
   */
  loginDemo: (email: string, papelPreferido: "laboratorio" | "clinica") => AuthUser;
  logout: () => void;
  visibleOrders: Order[];
  addOrder: (input: NovoOrdemInput) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, comentario: string) => void;
  addOrderFiles: (orderId: string, files: OrderFile[]) => void;
  addOrderComment: (orderId: string, comentario: string) => void;
  addClinic: (clinic: Omit<Clinic, "id">) => void;
  updateClinic: (id: string, patch: Partial<Clinic>) => void;
  addPatient: (patient: Omit<Patient, "id">) => void;
  addCatalogItem: (catalogo: keyof Catalogs, valor: string) => void;
  removeCatalogItem: (catalogo: keyof Catalogs, valor: string) => void;
  resetDemoData: () => void;
  clinicName: (clinicId: string) => string;
}

export interface NovoOrdemInput {
  clinicId: string;
  paciente: string;
  idade?: string;
  dentista: string;
  servico: string;
  elementos: number[];
  sobImplante: boolean;
  sistemaImplante?: string;
  material: string;
  cor: string;
  scanner?: string;
  prazo: string;
  prioridade: Prioridade;
  responsavelInterno?: string;
  observacoes: string;
  arquivos: OrderFile[];
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({
  brandId,
  seed,
  children,
}: {
  brandId: string;
  seed: LabDataset;
  children: ReactNode;
}) {
  const brand = useBrand();
  const store = useMemo(() => createLabStore(brandId, seed), [brandId, seed]);
  useMemo(() => store.ensureSeeded(), [store]);

  const [data, setData] = useState<LabDataset>(() => store.read());
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const raw = window.localStorage.getItem(sessionKey(brandId));
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const persist = useCallback(
    (updater: (prev: LabDataset) => LabDataset) => {
      setData((prev) => {
        const next = updater(prev);
        store.write(next);
        return next;
      });
    },
    [store],
  );

  const loginDemo = useCallback(
    (email: string, papelPreferido: "laboratorio" | "clinica") => {
      const termo = email.trim().toLowerCase();
      const porEmail = termo ? data.credentials.find((c) => c.email.toLowerCase() === termo) : undefined;
      const porPapel = data.credentials.find((c) => c.user.role === papelPreferido);
      const escolhido = porEmail ?? porPapel ?? data.credentials[0];
      setCurrentUser(escolhido.user);
      window.localStorage.setItem(sessionKey(brandId), JSON.stringify(escolhido.user));
      return escolhido.user;
    },
    [data.credentials, brandId],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    window.localStorage.removeItem(sessionKey(brandId));
  }, [brandId]);

  const visibleOrders = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "laboratorio") return data.orders;
    return data.orders.filter((o) => o.clinicId === currentUser.clinicId);
  }, [data.orders, currentUser]);

  const addOrder = useCallback(
    (input: NovoOrdemInput): Order => {
      const numero = `OS-${String(data.orders.length + 1).padStart(4, "0")}`;
      const now = new Date().toISOString();
      const statusInicial = brand.statusFlow[0];
      const order: Order = {
        id: genId("ord"),
        numero,
        status: statusInicial,
        urgente: input.prioridade === "Urgente",
        criadaEm: now,
        eventos: [
          {
            id: genId("evt"),
            status: statusInicial,
            comentario: "Ordem criada e recebida pelo laboratório.",
            autor: currentUser?.nome ?? "Sistema",
            criadoEm: now,
          },
        ],
        ...input,
      };
      persist((prev) => ({ ...prev, orders: [order, ...prev.orders] }));
      return order;
    },
    [data.orders.length, currentUser, persist, brand.statusFlow],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, comentario: string) => {
      const now = new Date().toISOString();
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) => {
          if (o.id !== orderId) return o;
          const evento: OrderEvent = {
            id: genId("evt"),
            status,
            comentario: comentario || `Status atualizado para ${status}.`,
            autor: currentUser?.nome ?? "Laboratório",
            criadoEm: now,
          };
          return { ...o, status, eventos: [...o.eventos, evento] };
        }),
      }));
    },
    [currentUser, persist],
  );

  const addOrderFiles = useCallback(
    (orderId: string, files: OrderFile[]) => {
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId ? { ...o, arquivos: [...o.arquivos, ...files] } : o,
        ),
      }));
    },
    [persist],
  );

  const addOrderComment = useCallback(
    (orderId: string, comentario: string) => {
      const now = new Date().toISOString();
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                eventos: [
                  ...o.eventos,
                  {
                    id: genId("evt"),
                    status: o.status,
                    comentario,
                    autor: currentUser?.nome ?? "Usuário",
                    criadoEm: now,
                  },
                ],
              }
            : o,
        ),
      }));
    },
    [currentUser, persist],
  );

  const addClinic = useCallback(
    (clinic: Omit<Clinic, "id">) => {
      persist((prev) => ({
        ...prev,
        clinics: [...prev.clinics, { ...clinic, id: genId("cli") }],
      }));
    },
    [persist],
  );

  const updateClinic = useCallback(
    (id: string, patch: Partial<Clinic>) => {
      persist((prev) => ({
        ...prev,
        clinics: prev.clinics.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      }));
    },
    [persist],
  );

  const addPatient = useCallback(
    (patient: Omit<Patient, "id">) => {
      persist((prev) => ({
        ...prev,
        patients: [...prev.patients, { ...patient, id: genId("pac") }],
      }));
    },
    [persist],
  );

  const addCatalogItem = useCallback(
    (catalogo: keyof Catalogs, valor: string) => {
      if (!valor.trim()) return;
      persist((prev) => {
        const atual = prev.catalogs[catalogo] ?? [];
        if (atual.includes(valor)) return prev;
        return { ...prev, catalogs: { ...prev.catalogs, [catalogo]: [...atual, valor] } };
      });
    },
    [persist],
  );

  const removeCatalogItem = useCallback(
    (catalogo: keyof Catalogs, valor: string) => {
      persist((prev) => ({
        ...prev,
        catalogs: { ...prev.catalogs, [catalogo]: (prev.catalogs[catalogo] ?? []).filter((v) => v !== valor) },
      }));
    },
    [persist],
  );

  const resetDemoData = useCallback(() => {
    store.reset();
    setData(store.read());
  }, [store]);

  const clinicName = useCallback(
    (clinicId: string) => data.clinics.find((c) => c.id === clinicId)?.nome ?? "Clínica",
    [data.clinics],
  );

  const value: DataContextValue = {
    brandId,
    data,
    currentUser,
    loginDemo,
    logout,
    visibleOrders,
    addOrder,
    updateOrderStatus,
    addOrderFiles,
    addOrderComment,
    addClinic,
    updateClinic,
    addPatient,
    addCatalogItem,
    removeCatalogItem,
    resetDemoData,
    clinicName,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData deve ser usado dentro de um DataProvider");
  return ctx;
}
