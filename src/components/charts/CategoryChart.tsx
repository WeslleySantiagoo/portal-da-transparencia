import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { COLORS } from '../../lib/constants';

interface CategoryChartProps {
  data: Record<string, number>;
  title: string;
}

const CHART_COLORS = [
  COLORS.chart.blue,
  COLORS.chart.navy,
  COLORS.chart.green,
  COLORS.chart.lime,
  COLORS.chart.orange,
  COLORS.chart.purple,
  COLORS.chart.red,
  COLORS.chart.gray,
];

export const CategoryChart = ({ data, title }: CategoryChartProps) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-[#063472] mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `R$ ${value.toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4 text-xl font-bold text-[#063472]">
        Total: R$ {total.toFixed(2)}
      </div>
    </div>
  );
};
