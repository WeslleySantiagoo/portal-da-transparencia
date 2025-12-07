export type UserRole = 'ADMIN' | 'OPERACOES' | 'PUBLICO';

// Tipo para o usuário da nossa aplicação (da tabela users)
export interface User {
  id: string;
  email: string;
  role: UserRole; // Role personalizada da tabela users (não do Supabase Auth)
  created_at: string;
}

export type TransactionType = 'ENTRADA' | 'DESPESA';

export type EntradaCategoria = 
  | 'Concepção Digital'
  | 'Desenvolvimento'
  | 'E-Commerce'
  | 'Concessão de Time'
  | 'Projeto Conjunto de Terceirização'
  | 'Serviço de Manutenção'
  | 'Ressarcimento'
  | 'Outro';

export type DespesaCategoria = 
  | 'Imposto'
  | 'Serviço'
  | 'Evento'
  | 'Jurídico'
  | 'Operacional'
  | 'Marketing'
  | 'Terceirização'
  | 'Reserva';

export type TransactionCategory = EntradaCategoria | DespesaCategoria;

export interface Transaction {
  id: string;
  data: string;
  tipo: TransactionType;
  valor: number;
  descricao: string;
  categoria: TransactionCategory;
  beneficiario: string;
  created_by: string;
  created_at: string;
}

export interface DashboardFilters {
  tipo?: TransactionType | 'TODOS';
  categoria?: TransactionCategory | 'TODOS';
  startDate?: Date;
  endDate?: Date;
  ano?: number;
  mes?: number;
}

export interface FinancialSummary {
  saldoAtual: number;
  reservaEmergencia: number;
  totalOperacoes: number;
  totalProjetos: number;
  totalNegocios: number;
  totalEntradas: number;
  totalDespesas: number;
}
