import { Filter } from 'lucide-react';
import type { DashboardFilters, TransactionType, TransactionCategory } from '../types';
import { ENTRADA_CATEGORIAS, DESPESA_CATEGORIAS, MESES } from '../lib/constants';

interface DashboardFiltersProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

export const DashboardFiltersComponent = ({ filters, onFiltersChange }: DashboardFiltersProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const categorias = filters.tipo === 'ENTRADA' 
    ? ENTRADA_CATEGORIAS 
    : filters.tipo === 'DESPESA' 
    ? DESPESA_CATEGORIAS 
    : [...ENTRADA_CATEGORIAS, ...DESPESA_CATEGORIAS];

  return (
    <div className="bg-[#063472] text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={24} className="text-[#d8ea32]" />
        <h2 className="text-xl font-bold">Filtros de Pesquisa</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ano</label>
          <select
            value={filters.ano || ''}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              ano: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#aebd24]"
          >
            <option value="">Todos</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mês</label>
          <select
            value={filters.mes || ''}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              mes: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#aebd24]"
          >
            <option value="">Todos</option>
            {MESES.map((mes, index) => (
              <option key={index} value={index + 1}>{mes}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tipo</label>
          <select
            value={filters.tipo || 'TODOS'}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              tipo: e.target.value as TransactionType | 'TODOS',
              categoria: undefined 
            })}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#aebd24]"
          >
            <option value="TODOS">Todos</option>
            <option value="ENTRADA">Entrada</option>
            <option value="DESPESA">Despesa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Categoria</label>
          <select
            value={filters.categoria || 'TODOS'}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              categoria: e.target.value as TransactionCategory | 'TODOS' 
            })}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#aebd24]"
          >
            <option value="TODOS">Todos</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => onFiltersChange({ tipo: 'TODOS', categoria: 'TODOS' })}
        className="mt-4 text-sm text-[#d8ea32] hover:text-white transition underline"
      >
        Limpar Filtros
      </button>
    </div>
  );
};
