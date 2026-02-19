import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { mockTransactions, mockStats } from "../lib/mockData";

export const PublicDashboard = () => {
  const [showTable, setShowTable] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#063472] to-[#0162b3] text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-[#d8ea32]">Seed</span> a Bit
            </h1>
            <p className="text-sm text-gray-300">Portal de Transparência</p>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-[#fbfafc] pt-28">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#063472] mb-2">
                Dashboard Público
              </h1>
              <p className="text-gray-600">
                Acompanhe a transparência financeira em tempo real
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center space-x-2 bg-[#0162b3] hover:bg-[#063472] text-white px-6 py-3 rounded-lg transition"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#0162b3]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Entradas</p>
                  <p className="text-2xl font-bold text-[#063472]">
                    {formatCurrency(mockStats.totalEntradas)}
                  </p>
                </div>
                <TrendingUp size={32} className="text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Saídas</p>
                  <p className="text-2xl font-bold text-[#063472]">
                    {formatCurrency(mockStats.totalSaidas)}
                  </p>
                </div>
                <TrendingDown size={32} className="text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#aebd24]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Saldo</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(mockStats.saldo)}
                  </p>
                </div>
                <DollarSign size={32} className="text-[#aebd24]" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Transações</p>
                  <p className="text-2xl font-bold text-[#063472]">
                    {mockStats.transacoes}
                  </p>
                </div>
                <div className="text-4xl text-blue-500" />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#063472]">
                Transações Recentes
              </h2>
              <button
                onClick={() => setShowTable(!showTable)}
                className="bg-[#0162b3] hover:bg-[#063472] text-white px-4 py-2 rounded transition"
              >
                {showTable ? "Ocultar" : "Ver"} Tabela
              </button>
            </div>

            {showTable && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Data
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Tipo
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Categoria
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Descrição
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          {new Date(tx.date).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              tx.type === "ENTRADA"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {tx.category}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {tx.description}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">
                          <span
                            className={
                              tx.type === "ENTRADA"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {formatCurrency(tx.amount)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Demo Notice */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">📌 Modo Demo</h3>
            <p className="text-blue-800">
              Esta é uma versão de demonstração com dados mockados. Em produção,
              esses dados viriam do banco de dados Supabase.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
