import type { Transaction } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#063472] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-left">Valor</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Beneficiário</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3 text-sm">
                  {format(new Date(transaction.data), 'dd/MM/yyyy', { locale: ptBR })}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    transaction.tipo === 'ENTRADA' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.tipo}
                  </span>
                </td>
                <td className={`px-4 py-3 font-medium ${
                  transaction.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'
                }`}>
                  R$ {transaction.valor.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm">{transaction.descricao}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {transaction.categoria}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{transaction.beneficiario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma transação encontrada com os filtros selecionados.
        </div>
      )}
    </div>
  );
};
