import { useState } from 'react';
import { X } from 'lucide-react';
import { transactionQueries } from '../lib/supabase-queries';
import type { TransactionType, EntradaCategoria, DespesaCategoria } from '../types';
import { ENTRADA_CATEGORIAS, DESPESA_CATEGORIAS } from '../lib/constants';
import { useAuth } from '../contexts/AuthContext';

interface TransactionFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const TransactionForm = ({ onClose, onSuccess }: TransactionFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    tipo: 'ENTRADA' as TransactionType,
    valor: '',
    descricao: '',
    categoria: '',
    beneficiario: '',
  });

  const categorias = formData.tipo === 'ENTRADA' ? ENTRADA_CATEGORIAS : DESPESA_CATEGORIAS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await transactionQueries.createTransaction({
        data: formData.data,
        tipo: formData.tipo,
        valor: parseFloat(formData.valor),
        descricao: formData.descricao,
        categoria: formData.categoria as EntradaCategoria | DespesaCategoria,
        beneficiario: formData.beneficiario,
        created_by: user!.id,
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('Erro ao criar transação. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#063472] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Nova Transação</h2>
          <button onClick={onClose} className="hover:text-[#d8ea32] transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <input
                type="date"
                required
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  tipo: e.target.value as TransactionType,
                  categoria: '' 
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              >
                <option value="ENTRADA">Entrada</option>
                <option value="DESPESA">Despesa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <select
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              rows={3}
              placeholder="Descreva a transação..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Beneficiário</label>
            <input
              type="text"
              required
              value={formData.beneficiario}
              onChange={(e) => setFormData({ ...formData, beneficiario: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              placeholder="Nome do beneficiário"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#0162b3] hover:bg-[#063472] text-white py-3 rounded font-medium transition disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Transação'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 border border-gray-300 hover:bg-gray-100 rounded transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
