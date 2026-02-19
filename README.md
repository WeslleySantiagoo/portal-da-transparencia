# 🌟 Portal de Transparência - Seed a Bit

Portal de transparência financeira desenvolvido para a empresa júnior **Seed a Bit**, com dashboard público e privado, gráficos interativos e controle de acesso por roles.

## 🎨 Identidade Visual

O projeto utiliza a paleta de cores oficial da Seed a Bit:

### Principal

- Azul Marinho: `#063472`
- Azul: `#0162b3`

### Secundária

- Verde Escuro: `#aebd24`
- Verde Limão: `#d8ea32`

### Auxiliar

- Branco Gelo: `#fbfafc`

## 🚀 Funcionalidades

### Preview do Projeto

#### Página Inicial (Landing Page)

<img width="1920" height="925" alt="image" src="https://github.com/user-attachments/assets/e6ad7f6c-9f62-44a8-b915-87bb567b37d8" />


#### Dashboard Público

<img width="1918" height="924" alt="image" src="https://github.com/user-attachments/assets/c85c13f0-0de8-44cd-bb89-ae74fb89ccd5" />


#### Página de Login

<img width="1917" height="924" alt="image" src="https://github.com/user-attachments/assets/4fb2d29e-06e1-44c9-9d08-46dfd59fa934" />


### 📊 Dashboard Público

- ✅ Visualização de todas as transações (entradas e despesas)
- ✅ Filtros por tipo, categoria, período, mês e ano
- ✅ Gráficos de pizza (entradas e despesas por categoria)
- ✅ Gráfico de barras mensal (entradas x despesas)
- ✅ Tabela detalhada de transações
- ✅ Resumo financeiro do período filtrado

### 🔒 Dashboard Privado (ADMIN/OPERAÇÕES)

Além de tudo do dashboard público:

- ✅ Saldo atual da conta
- ✅ Reserva de emergência
- ✅ Totais por operações, projetos e negócios
- ✅ Informações financeiras sensíveis
- ✅ Acesso completo a todos os dados

### 👥 Sistema de Autenticação

- ✅ Login com email e senha
- ✅ 3 níveis de acesso:
  - **PUBLICO**: acesso apenas ao dashboard público
  - **OPERACOES**: acesso aos dashboards público e privado + pode adicionar/editar transações
  - **ADMIN**: acesso total + pode deletar transações e gerenciar usuários

### 📝 Gerenciamento de Transações

- ✅ Formulário para adicionar transações (ADMIN/OPERAÇÕES)
- ✅ Campos: Data, Tipo, Valor, Descrição, Categoria, Beneficiário
- ✅ Categorias de Entrada: Concepção Digital, Desenvolvimento, E-Commerce, etc.
- ✅ Categorias de Despesa: Imposto, Serviço, Evento, Jurídico, etc.

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilização)
- **React Router DOM** (rotas)
- **Supabase** (backend, autenticação e banco de dados)
- **Recharts** (gráficos interativos)
- **Lucide React** (ícones)
- **date-fns** (manipulação de datas)

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd portal-da-transparencia
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

#### 3.1. Crie um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Preencha os dados do projeto

#### 3.2. Execute o script SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Abra o arquivo `supabase-setup.sql` deste projeto
3. Copie todo o conteúdo e cole no SQL Editor
4. Clique em **Run** para executar

Este script irá criar:

- ✅ Tabelas `users` e `transacoes`
- ✅ Políticas de segurança (RLS)
- ✅ Views para resumos financeiros
- ✅ Índices para performance
- ✅ Triggers para automação

#### 3.3. Configure as variáveis de ambiente

1. Preencha o arquivo `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

Para encontrar essas informações:

- Vá em **Settings** > **API** no painel do Supabase
- Copie o **Project URL** e a **anon public** key

### 4. Crie o primeiro usuário

#### 4.1. Crie via painel do Supabase

1. Vá em **Authentication** > **Users**
2. Clique em **Add user** > **Create new user**
3. Preencha email e senha
4. Copie o UUID do usuário criado

#### 4.2. Configure a role do usuário

No **SQL Editor**, execute:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE email = 'seu@email.com';
```

### 5. Execute o projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── charts/         # Componentes de gráficos
│   ├── Header.tsx      # Cabeçalho com navegação
│   ├── ProtectedRoute.tsx # Proteção de rotas
│   ├── DashboardFilters.tsx # Filtros do dashboard
│   ├── TransactionForm.tsx # Formulário de transações
│   └── TransactionsTable.tsx # Tabela de transações
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── lib/               # Utilitários e configurações
│   ├── constants.ts   # Constantes (cores, categorias)
│   └── supabase-queries.ts # Queries do Supabase
├── pages/             # Páginas principais
│   ├── LandingPage.tsx    # Página inicial
│   ├── LoginPage.tsx      # Página de login
│   ├── PublicDashboard.tsx # Dashboard público
│   └── PrivateDashboard.tsx # Dashboard privado
├── types/             # Tipos TypeScript
│   └── index.ts
├── App.tsx            # Componente raiz
├── main.tsx           # Entry point
└── supabaseClient.ts  # Cliente do Supabase
```

## 🔐 Roles e Permissões

| Role          | Dashboard Público | Dashboard Privado | Adicionar Transação | Editar Transação | Deletar Transação |
| ------------- | ----------------- | ----------------- | ------------------- | ---------------- | ----------------- |
| **PUBLICO**   | ✅                | ❌                | ❌                  | ❌               | ❌                |
| **OPERACOES** | ✅                | ✅                | ✅                  | ✅               | ❌                |
| **ADMIN**     | ✅                | ✅                | ✅                  | ✅               | ✅                |

## 📊 Estrutura do Banco de Dados

### Tabela: users

```sql
id (UUID)           - ID do usuário (referência auth.users)
email (TEXT)        - Email do usuário
role (TEXT)         - Role: ADMIN | OPERACOES | PUBLICO
created_at (TIMESTAMP) - Data de criação
```

### Tabela: transacoes

```sql
id (UUID)           - ID da transação
data (DATE)         - Data da transação
tipo (TEXT)         - ENTRADA | DESPESA
valor (NUMERIC)     - Valor da transação
descricao (TEXT)    - Descrição detalhada
categoria (TEXT)    - Categoria da transação
beneficiario (TEXT) - Nome do beneficiário
created_by (UUID)   - ID do usuário que criou
created_at (TIMESTAMP) - Data de criação
```

## 🎯 Categorias

### Entradas

- Concepção Digital
- Desenvolvimento
- E-Commerce
- Concessão de Time
- Projeto Conjunto de Terceirização
- Serviço de Manutenção
- Ressarcimento
- Outro

### Despesas

- Imposto
- Serviço
- Evento
- Jurídico
- Operacional
- Marketing
- Terceirização
- Reserva

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod
```

### Outras plataformas

O projeto é uma SPA (Single Page Application) React. Basta fazer o build e hospedar os arquivos estáticos:

```bash
npm run build
```

Os arquivos estarão na pasta `dist/`

**IMPORTANTE**: Configure as variáveis de ambiente no serviço de hospedagem!

## 🧪 Dados de Teste

Para inserir dados de teste, execute no **SQL Editor** do Supabase:

```sql
-- Substitua 'SEU-UUID-AQUI' pelo ID do seu usuário
INSERT INTO transacoes (data, tipo, valor, descricao, categoria, beneficiario, created_by)
VALUES
  ('2025-01-15', 'ENTRADA', 5000.00, 'Projeto de Desenvolvimento Web', 'Desenvolvimento', 'Cliente XYZ', 'SEU-UUID-AQUI'),
  ('2025-01-20', 'DESPESA', 1500.00, 'Hospedagem e Domínios', 'Operacional', 'AWS', 'SEU-UUID-AQUI'),
  ('2025-02-01', 'ENTRADA', 8000.00, 'E-Commerce para loja virtual', 'E-Commerce', 'Loja ABC', 'SEU-UUID-AQUI'),
  ('2025-02-10', 'DESPESA', 500.00, 'Marketing digital - Anúncios', 'Marketing', 'Google Ads', 'SEU-UUID-AQUI');
```

## 🐛 Troubleshooting

### Erro: "Invalid API key"

- Verifique se as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão corretas no `.env`
- Reinicie o servidor de desenvolvimento após alterar o `.env`

### Erro: "Row Level Security"

- Certifique-se de que executou o script `supabase-setup.sql` completo
- Verifique se as policies foram criadas corretamente no Supabase

### Gráficos não aparecem

- Verifique se há transações cadastradas no banco
- Confira se os filtros não estão muito restritivos

### Não consigo fazer login

- Verifique se o usuário foi criado via Authentication do Supabase
- Confirme que a role foi configurada na tabela `users`

## 📝 Licença

Este projeto foi desenvolvido para a **Seed a Bit** e está sob licença proprietária.

## 👥 Contribuindo

Para contribuir com o projeto:

1. Faça um fork
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

Desenvolvido com ❤️ para a **Seed a Bit**
