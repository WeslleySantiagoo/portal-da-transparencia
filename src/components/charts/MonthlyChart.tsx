import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MESES, COLORS } from '../../lib/constants';

interface MonthlyChartProps {
  data: Record<number, { entradas: number; despesas: number }>;
}

export const MonthlyChart = ({ data }: MonthlyChartProps) => {
  const chartData = Object.entries(data).map(([mes, valores]) => ({
    mes: MESES[parseInt(mes)],
    Entradas: valores.entradas,
    Despesas: valores.despesas,
    Saldo: valores.entradas - valores.despesas,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-[#063472] mb-4">
        Entradas x Despesas por Mês
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `R$ ${value.toFixed(2)}`}
          />
          <Legend />
          <Bar dataKey="Entradas" fill={COLORS.chart.green} />
          <Bar dataKey="Despesas" fill={COLORS.chart.red} />
          <Bar dataKey="Saldo" fill={COLORS.chart.blue} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
