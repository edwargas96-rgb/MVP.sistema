export type UserRole = "laboratorio" | "clinica";

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  clinicId?: string;
}

export interface Credential {
  email: string;
  senha: string;
  user: AuthUser;
}

export interface Clinic {
  id: string;
  nome: string;
  responsavel: string;
  telefone: string;
  email: string;
  endereco: string;
  documento: string;
  ativo: boolean;
}

export interface Patient {
  id: string;
  nome: string;
  clinicId: string;
  dentista: string;
  telefone?: string;
  observacoes?: string;
}

/**
 * Etapa do fluxo de produção. O conjunto e a ordem válidos de valores vêm de
 * `brand.statusFlow` (BrandConfig) — cada marca define seu próprio fluxo.
 */
export type OrderStatus = string;

export interface OrderFile {
  id: string;
  nome: string;
  tipo: "arquivo" | "foto";
  extensao: string;
  tamanhoKb: number;
  criadoEm: string;
}

export interface OrderEvent {
  id: string;
  status: OrderStatus;
  comentario: string;
  autor: string;
  criadoEm: string;
}

export type Prioridade = "Normal" | "Alta" | "Urgente";

export interface Order {
  id: string;
  numero: string;
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
  prazo: string;
  prioridade: Prioridade;
  /** Derivado de prioridade === "Urgente"; mantido para compatibilidade com badges e filtros. */
  urgente: boolean;
  /** Pessoa da equipe interna do laboratório responsável pelo caso. */
  responsavelInterno?: string;
  observacoes: string;
  status: OrderStatus;
  arquivos: OrderFile[];
  eventos: OrderEvent[];
  criadaEm: string;
}

export interface Catalogs {
  servicos: string[];
  materiais: string[];
  sistemasImplante: string[];
  coresVita: string[];
}

export interface LabDataset {
  clinics: Clinic[];
  patients: Patient[];
  orders: Order[];
  catalogs: Catalogs;
  credentials: Credential[];
}
