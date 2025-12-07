# 📁 Estrutura de Arquivos do Projeto

```
portal-da-transparencia/
│
├── 📄 package.json                    # Dependências e scripts do projeto
├── 📄 vite.config.ts                  # Configuração do Vite
├── 📄 tsconfig.json                   # Configuração do TypeScript
├── 📄 tailwind.config.js              # Configuração do Tailwind CSS (se houver)
├── 📄 .env                            # Variáveis de ambiente (NÃO commitar!)
├── 📄 .env.example                    # Exemplo de variáveis de ambiente
├── 📄 .gitignore                      # Arquivos ignorados pelo Git
│
├── 📚 README.md                       # Documentação principal
├── 📚 SUPABASE_SETUP_GUIDE.md        # Guia completo de setup do Supabase
├── 📚 ROADMAP.md                     # Funcionalidades futuras
├── 📚 CHECKLIST.md                   # Checklist de setup
├── 📚 FILE_STRUCTURE.md              # Este arquivo
│
├── 📜 supabase-setup.sql             # Script SQL para criar tabelas/policies
│
├── 📂 public/                        # Arquivos públicos estáticos
│   └── vite.svg
│
└── 📂 src/                           # Código fonte principal
    │
    ├── 📄 main.tsx                   # Entry point da aplicação
    ├── 📄 App.tsx                    # Componente raiz com rotas
    ├── 📄 index.css                  # Estilos globais + Tailwind
    ├── 📄 App.css                    # Estilos específicos do App
    ├── 📄 supabaseClient.ts          # Cliente configurado do Supabase
    │
    ├── 📂 types/                     # Definições de tipos TypeScript
    │   └── 📄 index.ts              # Todos os tipos: User, Transaction, etc.
    │
    ├── 📂 lib/                       # Utilitários e configurações
    │   ├── 📄 constants.ts          # Constantes (cores, categorias)
    │   └── 📄 supabase-queries.ts   # Funções de query do Supabase
    │
    ├── 📂 contexts/                  # Contextos React
    │   └── 📄 AuthContext.tsx       # Context de autenticação
    │
    ├── 📂 components/                # Componentes reutilizáveis
    │   │
    │   ├── 📄 Header.tsx            # Cabeçalho com navegação
    │   ├── 📄 ProtectedRoute.tsx    # HOC para proteger rotas
    │   ├── 📄 DashboardFilters.tsx  # Componente de filtros
    │   ├── 📄 TransactionForm.tsx   # Formulário de transações
    │   ├── 📄 TransactionsTable.tsx # Tabela de transações
    │   │
    │   └── 📂 charts/               # Componentes de gráficos
    │       ├── 📄 CategoryChart.tsx # Gráfico de pizza por categoria
    │       └── 📄 MonthlyChart.tsx  # Gráfico de barras mensal
    │
    └── 📂 pages/                     # Páginas da aplicação
        ├── 📄 LandingPage.tsx       # Página inicial (/)
        ├── 📄 LoginPage.tsx         # Página de login (/login)
        ├── 📄 PublicDashboard.tsx   # Dashboard público (/dashboard)
        └── 📄 PrivateDashboard.tsx  # Dashboard privado (/dashboard/privado)
```

## 🎯 Descrição dos Arquivos Principais

### 📄 Configuração

**package.json**
- Gerencia dependências do projeto
- Define scripts: `dev`, `build`, `preview`

**vite.config.ts**
- Configuração do bundler Vite
- Plugins e otimizações

**tsconfig.json**
- Configuração do TypeScript
- Strict mode, paths, etc.

**.env**
- Variáveis de ambiente secretas
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- **NUNCA** commitar este arquivo!

### 📚 Documentação

**README.md**
- Guia principal de instalação
- Overview das funcionalidades
- Instruções básicas de uso

**SUPABASE_SETUP_GUIDE.md**
- Guia passo a passo do Supabase
- Troubleshooting detalhado
- Queries SQL úteis

**ROADMAP.md**
- Lista de features futuras
- Priorização de melhorias
- Ideias de expansão

**CHECKLIST.md**
- Lista de verificação do setup
- Testes funcionais
- Validação completa

### 📜 SQL

**supabase-setup.sql**
- Criação de tabelas
- Row Level Security (RLS)
- Views para relatórios
- Triggers automáticos
- Policies de acesso

### 🎨 Frontend

**main.tsx**
- Entry point
- Renderiza `<App />` no DOM

**App.tsx**
- Define rotas com React Router
- Envolve com `AuthProvider`
- Estrutura geral da aplicação

**supabaseClient.ts**
- Inicializa cliente do Supabase
- Usa variáveis de ambiente

### 📦 Types

**types/index.ts**
- `User`: dados do usuário
- `UserRole`: ADMIN | OPERACOES | PUBLICO
- `Transaction`: transação financeira
- `TransactionType`: ENTRADA | DESPESA
- `DashboardFilters`: filtros do dashboard
- `FinancialSummary`: resumo financeiro

### 🔧 Lib

**constants.ts**
- Cores da identidade visual
- Categorias de entradas/despesas
- Meses do ano

**supabase-queries.ts**
- `getTransactions()`: buscar transações
- `createTransaction()`: criar transação
- `updateTransaction()`: atualizar transação
- `deleteTransaction()`: deletar transação
- `getFinancialSummary()`: resumo financeiro
- `getChartData()`: dados para gráficos

### 🔐 Contexts

**AuthContext.tsx**
- Gerencia estado de autenticação
- Funções: `signIn()`, `signOut()`, `hasRole()`
- Disponibiliza `user` atual
- Hook: `useAuth()`

### 🧩 Components

**Header.tsx**
- Navbar responsiva
- Logo Seed a Bit
- Links de navegação
- Informações do usuário logado
- Botão de logout

**ProtectedRoute.tsx**
- HOC para proteger rotas
- Verifica autenticação
- Verifica roles permitidas
- Redireciona se não autorizado

**DashboardFilters.tsx**
- Filtros interativos
- Ano, Mês, Tipo, Categoria
- Botão "Limpar Filtros"

**TransactionForm.tsx**
- Modal de criação de transação
- Validação de campos
- Categorias dinâmicas por tipo
- Apenas para ADMIN/OPERACOES

**TransactionsTable.tsx**
- Tabela responsiva
- Formatação de datas
- Badges de tipo e categoria
- Cores por tipo (verde/vermelho)

**charts/CategoryChart.tsx**
- Gráfico de pizza (Recharts)
- Distribuição por categoria
- Tooltip com valores
- Legendas

**charts/MonthlyChart.tsx**
- Gráfico de barras (Recharts)
- Entradas x Despesas x Saldo
- Por mês do ano

### 📄 Pages

**LandingPage.tsx**
- Página inicial bonita
- Apresentação do projeto
- CTAs para dashboard e login
- Informações sobre transparência

**LoginPage.tsx**
- Formulário de login
- Validação de credenciais
- Tratamento de erros
- Link para voltar à home

**PublicDashboard.tsx**
- Dashboard acessível a todos
- Filtros
- Gráficos públicos
- Tabela de transações
- Resumo financeiro básico
- Botão "Nova Transação" (se ADMIN/OPERACOES)

**PrivateDashboard.tsx**
- Dashboard só para ADMIN/OPERACOES
- Todas as features do público +
- Saldo atual
- Reserva de emergência
- Informações sensíveis
- Cards coloridos com totais

## 🔄 Fluxo de Dados

```
User Action (UI)
    ↓
Component/Page
    ↓
Context (se autenticação)
    ↓
supabase-queries.ts
    ↓
supabaseClient.ts
    ↓
Supabase API
    ↓
PostgreSQL Database
    ↓
Row Level Security (RLS) ← Verifica permissões
    ↓
Response
    ↓
Component State
    ↓
Re-render UI
```

## 🎨 Fluxo de Rotas

```
/
└── LandingPage
    ├── /login → LoginPage
    ├── /dashboard → PublicDashboard (acessível a todos)
    └── /dashboard/privado → PrivateDashboard (apenas ADMIN/OPERACOES)
```

## 🔒 Hierarquia de Permissões

```
PUBLICO
├── Ver dashboard público
└── Ler transações

OPERACOES (herda PUBLICO +)
├── Ver dashboard privado
├── Criar transações
└── Editar transações

ADMIN (herda OPERACOES +)
├── Deletar transações
├── Gerenciar usuários
└── Acesso total
```

## 📊 Estrutura do Banco (Supabase)

```
auth.users (Supabase Auth)
    ↓ (trigger on insert)
public.users
    ├── id (FK → auth.users.id)
    ├── email
    ├── role
    └── created_at

public.transacoes
    ├── id
    ├── data
    ├── tipo
    ├── valor
    ├── descricao
    ├── categoria
    ├── beneficiario
    ├── created_by (FK → users.id)
    └── created_at

Views:
├── vw_resumo_financeiro
├── vw_resumo_mensal
├── vw_entradas_por_categoria
└── vw_despesas_por_categoria
```

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Compila para produção
npm run preview  # Preview da build de produção
npm run lint     # Verifica erros de linting
```

## 📦 Dependências Principais

**Produção:**
- `react` + `react-dom`: Framework UI
- `react-router-dom`: Roteamento
- `@supabase/supabase-js`: Cliente Supabase
- `recharts`: Gráficos
- `lucide-react`: Ícones
- `date-fns`: Manipulação de datas
- `tailwindcss`: Estilização

**Desenvolvimento:**
- `vite`: Build tool
- `typescript`: Type checking
- `eslint`: Linting
- `@types/*`: Definições de tipos

## 🎯 Próximos Passos

1. ✅ Setup local completo
2. ✅ Configuração do Supabase
3. ✅ Criação de usuários
4. ✅ Testes funcionais
5. 🚀 Deploy para produção

---

**Dica**: Use `Ctrl + P` no VS Code para buscar rapidamente qualquer arquivo!

Desenvolvido com ❤️ para a **Seed a Bit**
