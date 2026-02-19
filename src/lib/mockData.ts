// Dados mockados para desenvolvimento
export const mockTransactions = [
  {
    id: '1',
    date: '2026-02-15',
    type: 'ENTRADA',
    category: 'SERVIÇOS',
    description: 'Consultoria - TechCorp',
    amount: 5000.00,
  },
  {
    id: '2',
    date: '2026-02-14',
    type: 'SAÍDA',
    category: 'INFRAESTRUTURA',
    description: 'Renovação de servidor',
    amount: -1200.00,
  },
  {
    id: '3',
    date: '2026-02-12',
    type: 'ENTRADA',
    category: 'PROJETOS',
    description: 'Projeto IA - Startup ABC',
    amount: 8000.00,
  },
  {
    id: '4',
    date: '2026-02-10',
    type: 'SAÍDA',
    category: 'MATERIAIS',
    description: 'Compra de equipamentos',
    amount: -2500.00,
  },
  {
    id: '5',
    date: '2026-02-08',
    type: 'ENTRADA',
    category: 'TREINAMENTOS',
    description: 'Workshop desenvolvimento web',
    amount: 3000.00,
  },
];

export const mockCategoryData = [
  { name: 'Serviços', value: 35, color: '#0162b3' },
  { name: 'Projetos', value: 30, color: '#063472' },
  { name: 'Treinamentos', value: 20, color: '#aebd24' },
  { name: 'Infraestrutura', value: 10, color: '#d8ea32' },
  { name: 'Materiais', value: 5, color: '#fbfafc' },
];

export const mockMonthlyData = [
  { month: 'Jan', entradas: 12000, saidas: 5000 },
  { month: 'Fev', entradas: 15000, saidas: 6000 },
  { month: 'Mar', entradas: 10000, saidas: 4500 },
  { month: 'Abr', entradas: 18000, saidas: 7000 },
  { month: 'Mai', entradas: 14000, saidas: 5500 },
  { month: 'Jun', entradas: 20000, saidas: 8000 },
];

export const mockStats = {
  totalEntradas: 92000,
  totalSaidas: 36000,
  saldo: 56000,
  transacoes: 18,
};
