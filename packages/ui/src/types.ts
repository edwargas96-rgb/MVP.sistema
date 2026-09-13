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

export type OrderStatus =
  | "Recebida"
  | "Em análise"
  | "Em produção"
  | "Em prova"
  | "Pronta"
  | "Entregue";

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "Recebida",
  "Em análise",
  "Em produção",
  "Em prova",
  "Pronta",
  "Entregue",
];

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

export interface Order {
  id: string;
  numero: string;
  clinicId: string;
  paciente: string;
  dentista: string;
  servico: string;
  elementos: number[];
  sobImplante: boolean;
  sistemaImplante?: string;
  material: string;
  cor: string;
  prazo: string;
  urgente: boolean;
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
