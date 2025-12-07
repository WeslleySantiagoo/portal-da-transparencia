import { supabase } from '../supabaseClient';
import type { Transaction, DashboardFilters, FinancialSummary } from '../types';

export const transactionQueries = {
  // Buscar todas as transações com filtros
  async getTransactions(filters?: DashboardFilters): Promise<Transaction[]> {
    let query = supabase
      .from('transacoes')
      .select('*')
      .order('data', { ascending: false });

    if (filters?.tipo && filters.tipo !== 'TODOS') {
      query = query.eq('tipo', filters.tipo);
    }

    if (filters?.categoria && filters.categoria !== 'TODOS') {
      query = query.eq('categoria', filters.categoria);
    }

    if (filters?.startDate) {
      query = query.gte('data', filters.startDate.toISOString().split('T')[0]);
    }

    if (filters?.endDate) {
      query = query.lte('data', filters.endDate.toISOString().split('T')[0]);
    }

    if (filters?.ano) {
      query = query.gte('data', `${filters.ano}-01-01`);
      query = query.lte('data', `${filters.ano}-12-31`);
    }

    if (filters?.mes && filters?.ano) {
      const month = filters.mes.toString().padStart(2, '0');
      const nextMonth = (filters.mes === 12 ? 1 : filters.mes + 1).toString().padStart(2, '0');
      const nextYear = filters.mes === 12 ? filters.ano + 1 : filters.ano;
      
      query = query.gte('data', `${filters.ano}-${month}-01`);
      query = query.lt('data', `${nextYear}-${nextMonth}-01`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  // Criar nova transação
  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transacoes')
      .insert([transaction])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar transação
  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transacoes')
      .update(transaction)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar transação
  async deleteTransaction(id: string): Promise<void> {
    const { error } = await supabase
      .from('transacoes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Obter resumo financeiro (para dashboard privado)
  async getFinancialSummary(): Promise<FinancialSummary> {
    const { data, error } = await supabase
      .from('vw_resumo_financeiro')
      .select('*')
      .single();

    if (error) {
      // Se a view não existir, calcular manualmente
      const transactions = await this.getTransactions();
      const entradas = transactions.filter(t => t.tipo === 'ENTRADA');
      const despesas = transactions.filter(t => t.tipo === 'DESPESA');
      
      const totalEntradas = entradas.reduce((sum, t) => sum + t.valor, 0);
      const totalDespesas = despesas.reduce((sum, t) => sum + t.valor, 0);
      const reserva = despesas
        .filter(t => t.categoria === 'Reserva')
        .reduce((sum, t) => sum + t.valor, 0);

      return {
        saldoAtual: totalEntradas - totalDespesas,
        reservaEmergencia: reserva,
        totalOperacoes: totalDespesas,
        totalProjetos: totalEntradas,
        totalNegocios: totalEntradas,
        totalEntradas,
        totalDespesas,
      };
    }

    return data;
  },

  // Obter dados para gráficos
  async getChartData(filters?: DashboardFilters) {
    const transactions = await this.getTransactions(filters);

    // Entradas por categoria
    const entradasPorCategoria = transactions
      .filter(t => t.tipo === 'ENTRADA')
      .reduce((acc, t) => {
        acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
        return acc;
      }, {} as Record<string, number>);

    // Despesas por categoria
    const despesasPorCategoria = transactions
      .filter(t => t.tipo === 'DESPESA')
      .reduce((acc, t) => {
        acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
        return acc;
      }, {} as Record<string, number>);

    // Entradas e despesas por mês
    const porMes = transactions.reduce((acc, t) => {
      const mes = new Date(t.data).getMonth();
      if (!acc[mes]) {
        acc[mes] = { entradas: 0, despesas: 0 };
      }
      if (t.tipo === 'ENTRADA') {
        acc[mes].entradas += t.valor;
      } else {
        acc[mes].despesas += t.valor;
      }
      return acc;
    }, {} as Record<number, { entradas: number; despesas: number }>);

    return {
      entradasPorCategoria,
      despesasPorCategoria,
      porMes,
    };
  },
};
