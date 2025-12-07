import { useState, useEffect } from 'react';
import { Plus, Table, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';
import { DashboardFiltersComponent } from '../components/DashboardFilters';
import { CategoryChart } from '../components/charts/CategoryChart';
import { MonthlyChart } from '../components/charts/MonthlyChart';
import { TransactionsTable } from '../components/TransactionsTable';
import { TransactionForm } from '../components/TransactionForm';
import { transactionQueries } from '../lib/supabase-queries';
import type { DashboardFilters, Transaction, FinancialSummary } from '../types';

export const PrivateDashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    tipo: 'TODOS',
    categoria: 'TODOS',
    ano: new Date().getFullYear(),
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [txs, charts, financialSummary] = await Promise.all([
        transactionQueries.getTransactions(filters),
        transactionQueries.getChartData(filters),
        transactionQueries.getFinancialSummary(),
      ]);
      setTransactions(txs);
      setChartData(charts);
      setSummary(financialSummary);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfafc] flex items-center justify-center">
        <div className="text-2xl text-[#063472]">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfafc]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-4xl font-bold text-[#063472]">
              Dashboard Privado
            </h1>
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              CONFIDENCIAL
            </span>
          </div>
          <p className="text-gray-600">
            Informações financeiras detalhadas - Acesso restrito
          </p>
        </div>

        {/* Resumo Financeiro Completo */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign size={32} />
                <h3 className="text-lg font-medium">Saldo Atual</h3>
              </div>
              <p className="text-3xl font-bold">
                R$ {summary.saldoAtual.toFixed(2)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <PiggyBank size={32} />
                <h3 className="text-lg font-medium">Reserva de Emergência</h3>
              </div>
              <p className="text-3xl font-bold">
                R$ {summary.reservaEmergencia.toFixed(2)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp size={32} />
                <h3 className="text-lg font-medium">Total Entradas</h3>
              </div>
              <p className="text-3xl font-bold">
                R$ {summary.totalEntradas.toFixed(2)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp size={32} className="rotate-180" />
                <h3 className="text-lg font-medium">Total Despesas</h3>
              </div>
              <p className="text-3xl font-bold">
                R$ {summary.totalDespesas.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="mb-8">
          <DashboardFiltersComponent filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Botão para adicionar transação */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0162b3] hover:bg-[#063472] text-white px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nova Transação</span>
          </button>
        </div>

        {/* Resumo do período filtrado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              Entradas (Período Filtrado)
            </h3>
            <p className="text-3xl font-bold text-green-600">
              R$ {transactions
                .filter(t => t.tipo === 'ENTRADA')
                .reduce((sum, t) => sum + t.valor, 0)
                .toFixed(2)}
            </p>
          </div>

          <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Despesas (Período Filtrado)
            </h3>
            <p className="text-3xl font-bold text-red-600">
              R$ {transactions
                .filter(t => t.tipo === 'DESPESA')
                .reduce((sum, t) => sum + t.valor, 0)
                .toFixed(2)}
            </p>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Saldo (Período Filtrado)
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              R$ {(transactions
                .filter(t => t.tipo === 'ENTRADA')
                .reduce((sum, t) => sum + t.valor, 0) -
                transactions
                .filter(t => t.tipo === 'DESPESA')
                .reduce((sum, t) => sum + t.valor, 0))
                .toFixed(2)}
            </p>
          </div>
        </div>

        {/* Gráficos */}
        {chartData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {Object.keys(chartData.entradasPorCategoria).length > 0 && (
              <CategoryChart 
                data={chartData.entradasPorCategoria} 
                title="Distribuição de Entradas por Categoria"
              />
            )}

            {Object.keys(chartData.despesasPorCategoria).length > 0 && (
              <CategoryChart 
                data={chartData.despesasPorCategoria} 
                title="Distribuição de Despesas por Categoria"
              />
            )}
          </div>
        )}

        {/* Gráfico Mensal */}
        {chartData && Object.keys(chartData.porMes).length > 0 && (
          <div className="mb-8">
            <MonthlyChart data={chartData.porMes} />
          </div>
        )}

        {/* Botão para mostrar tabela */}
        <div className="mb-4">
          <button
            onClick={() => setShowTable(!showTable)}
            className="bg-[#aebd24] hover:bg-[#d8ea32] text-[#063472] px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
          >
            <Table size={20} />
            <span>{showTable ? 'Ocultar' : 'Ver'} Tabela Completa</span>
          </button>
        </div>

        {/* Tabela de transações */}
        {showTable && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#063472] mb-4">
              Todas as Transações ({transactions.length})
            </h2>
            <TransactionsTable transactions={transactions} />
          </div>
        )}
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <TransactionForm 
          onClose={() => setShowForm(false)} 
          onSuccess={() => loadData()} 
        />
      )}
    </div>
  );
};
