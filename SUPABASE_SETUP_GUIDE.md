# 📘 Guia Completo de Configuração do Supabase

Este documento contém todas as instruções necessárias para configurar o backend do Portal de Transparência usando Supabase.

## 🎯 Visão Geral

O Supabase fornecerá:
- ✅ Banco de dados PostgreSQL
- ✅ Autenticação de usuários
- ✅ API REST automática
- ✅ Row Level Security (RLS)
- ✅ Realtime subscriptions (opcional)

---

## 📋 Passo 1: Criar Conta e Projeto

### 1.1. Criar Conta no Supabase
1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Faça login com GitHub, Google ou Email
4. Confirme seu email

### 1.2. Criar Novo Projeto
1. No dashboard, clique em **"New Project"**
2. Preencha:
   - **Name**: `portal-transparencia-seedabit` (ou qualquer nome)
   - **Database Password**: Crie uma senha forte (salve em local seguro!)
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
   - **Pricing Plan**: Free (suficiente para começar)
3. Clique em **"Create new project"**
4. Aguarde 2-3 minutos enquanto o projeto é provisionado

---

## 📋 Passo 2: Executar o Script SQL

### 2.1. Acessar o SQL Editor
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New Query"**

### 2.2. Copiar e Executar o Script
1. Abra o arquivo `supabase-setup.sql` deste projeto
2. Copie **TODO** o conteúdo do arquivo
3. Cole no SQL Editor do Supabase
4. Clique em **"Run"** (ou pressione Ctrl + Enter)
5. Aguarde a execução completa (deve aparecer "Success. No rows returned")

### 2.3. Verificar se foi criado corretamente
Execute cada query abaixo para verificar:

**Verificar tabelas:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```
Deve retornar: `users`, `transacoes`

**Verificar views:**
```sql
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';
```
Deve retornar: `vw_resumo_financeiro`, `vw_resumo_mensal`, `vw_entradas_por_categoria`, `vw_despesas_por_categoria`

**Verificar policies:**
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```
Deve retornar várias policies para as tabelas `users` e `transacoes`

---

## 📋 Passo 3: Configurar Autenticação

### 3.1. Configurar Email Auth
1. No menu lateral, clique em **"Authentication"** > **"Providers"**
2. Encontre **"Email"** na lista
3. Certifique-se de que está **habilitado**
4. Configure (opcional):
   - **Enable email confirmations**: Desabilite para testes (usuários não precisarão confirmar email)
   - **Enable secure email change**: Deixe habilitado

### 3.2. Configurar URLs de Redirect (opcional)
1. Em **"Authentication"** > **"URL Configuration"**
2. Adicione suas URLs:
   - **Site URL**: `http://localhost:5173` (desenvolvimento)
   - **Redirect URLs**: 
     - `http://localhost:5173/**`
     - Adicione sua URL de produção quando fizer deploy

---

## 📋 Passo 4: Obter Credenciais

### 4.1. Pegar API Keys
1. No menu lateral, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Você verá duas informações importantes:

**Project URL:**
```
https://seuprojetoid.supabase.co
```

**API Keys:**
- **anon public**: Esta é sua chave pública (pode ser exposta no frontend)
- **service_role**: NÃO USE no frontend! Apenas em backend/scripts

### 4.2. Configurar .env do Projeto
1. No projeto React, abra o arquivo `.env`
2. Preencha:
```env
VITE_SUPABASE_URL=https://seuprojetoid.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-public-key-aqui
```

3. **IMPORTANTE**: Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

---

## 📋 Passo 5: Criar Primeiro Usuário

### 5.1. Criar Usuário via Painel
1. No menu lateral, clique em **"Authentication"** > **"Users"**
2. Clique em **"Add user"** > **"Create new user"**
3. Preencha:
   - **Email**: seu@email.com
   - **Password**: senha-forte-aqui
   - **Auto Confirm User**: Marque esta opção (para testes)
4. Clique em **"Create user"**
5. **IMPORTANTE**: Copie o **UUID** do usuário (está na coluna ID)

### 5.2. Configurar Role do Usuário
1. Volte ao **SQL Editor**
2. Execute este comando (substitua o email):
```sql
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'seu@email.com';
```

3. Verifique se funcionou:
```sql
SELECT id, email, role 
FROM users 
WHERE email = 'seu@email.com';
```

---

## 📋 Passo 6: Inserir Dados de Teste (Opcional)

### 6.1. Pegar o UUID do Usuário
No SQL Editor, execute:
```sql
SELECT id FROM users WHERE email = 'seu@email.com';
```
Copie o UUID retornado.

### 6.2. Inserir Transações de Exemplo
Substitua `'SEU-UUID-AQUI'` pelo UUID copiado e execute:

```sql
INSERT INTO transacoes (data, tipo, valor, descricao, categoria, beneficiario, created_by)
VALUES
  ('2025-01-15', 'ENTRADA', 5000.00, 'Projeto de Desenvolvimento Web', 'Desenvolvimento', 'Cliente XYZ', 'SEU-UUID-AQUI'),
  ('2025-01-20', 'DESPESA', 1500.00, 'Hospedagem e Domínios', 'Operacional', 'AWS', 'SEU-UUID-AQUI'),
  ('2025-02-01', 'ENTRADA', 8000.00, 'E-Commerce para loja virtual', 'E-Commerce', 'Loja ABC', 'SEU-UUID-AQUI'),
  ('2025-02-10', 'DESPESA', 500.00, 'Marketing digital - Anúncios', 'Marketing', 'Google Ads', 'SEU-UUID-AQUI'),
  ('2025-02-15', 'ENTRADA', 3000.00, 'Consultoria em TI', 'Concepção Digital', 'Empresa Tech', 'SEU-UUID-AQUI'),
  ('2025-02-20', 'DESPESA', 800.00, 'Impostos mensais', 'Imposto', 'Receita Federal', 'SEU-UUID-AQUI'),
  ('2025-03-01', 'ENTRADA', 12000.00, 'Projeto de E-Commerce Completo', 'E-Commerce', 'Loja Virtual Brasil', 'SEU-UUID-AQUI'),
  ('2025-03-05', 'DESPESA', 2000.00, 'Evento de Networking', 'Evento', 'Centro de Convenções', 'SEU-UUID-AQUI'),
  ('2025-03-10', 'DESPESA', 1500.00, 'Consultoria Jurídica', 'Jurídico', 'Escritório de Advocacia', 'SEU-UUID-AQUI'),
  ('2025-03-15', 'ENTRADA', 6000.00, 'Manutenção de Sistema', 'Serviço de Manutenção', 'Cliente ABC', 'SEU-UUID-AQUI');
```

---

## 📋 Passo 7: Testar o Sistema

### 7.1. Testar Login
1. Inicie o projeto React: `npm run dev`
2. Acesse: `http://localhost:5173`
3. Clique em **"Login"**
4. Entre com o email e senha criados
5. Você deve ser redirecionado para o dashboard

### 7.2. Testar Dashboard Público
1. Acesse `/dashboard`
2. Deve mostrar:
   - Filtros funcionando
   - Gráficos com as transações inseridas
   - Resumo financeiro
   - Tabela de transações

### 7.3. Testar Dashboard Privado
1. Acesse `/dashboard/privado`
2. Deve mostrar:
   - Saldo atual
   - Reserva de emergência
   - Todos os totais
   - Cards coloridos com informações sensíveis

### 7.4. Testar Adição de Transação
1. No dashboard, clique em **"Nova Transação"**
2. Preencha o formulário
3. Clique em **"Salvar"**
4. A transação deve aparecer imediatamente nos gráficos e tabela

---

## 🔐 Gerenciamento de Usuários

### Criar Novo Usuário com Role Específica

**Opção 1: Via Painel + SQL**
1. Crie o usuário no Authentication do Supabase
2. No SQL Editor, configure a role:
```sql
UPDATE users 
SET role = 'OPERACOES'  -- ou 'ADMIN' ou 'PUBLICO'
WHERE email = 'novousuario@email.com';
```

**Opção 2: Via SQL (usuário já existe em auth.users)**
```sql
INSERT INTO users (id, email, role)
VALUES (
  'uuid-do-usuario-da-tabela-auth',
  'email@exemplo.com',
  'OPERACOES'
);
```

### Listar Todos os Usuários
```sql
SELECT 
  u.id,
  u.email,
  u.role,
  u.created_at,
  COUNT(t.id) as total_transacoes
FROM users u
LEFT JOIN transacoes t ON t.created_by = u.id
GROUP BY u.id, u.email, u.role, u.created_at
ORDER BY u.created_at DESC;
```

### Mudar Role de um Usuário
```sql
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'usuario@email.com';
```

---

## 📊 Queries Úteis

### Ver Resumo Financeiro Completo
```sql
SELECT * FROM vw_resumo_financeiro;
```

### Ver Resumo por Mês
```sql
SELECT * FROM vw_resumo_mensal;
```

### Ver Entradas por Categoria
```sql
SELECT * FROM vw_entradas_por_categoria;
```

### Ver Despesas por Categoria
```sql
SELECT * FROM vw_despesas_por_categoria;
```

### Ver Transações do Último Mês
```sql
SELECT 
  data,
  tipo,
  valor,
  categoria,
  descricao,
  beneficiario
FROM transacoes
WHERE data >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY data DESC;
```

### Ver Transações por Usuário
```sql
SELECT 
  u.email,
  COUNT(t.id) as total_transacoes,
  SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.valor ELSE 0 END) as total_entradas,
  SUM(CASE WHEN t.tipo = 'DESPESA' THEN t.valor ELSE 0 END) as total_despesas
FROM users u
LEFT JOIN transacoes t ON t.created_by = u.id
GROUP BY u.email
ORDER BY total_transacoes DESC;
```

---

## 🐛 Troubleshooting

### Erro: "new row violates row-level security policy"
**Causa**: O usuário não tem permissão para essa operação.
**Solução**:
1. Verifique se o usuário está autenticado
2. Verifique a role do usuário: `SELECT role FROM users WHERE id = auth.uid();`
3. Para ADMIN/OPERACOES criarem transações, verifique se a policy está correta

### Erro: "relation does not exist"
**Causa**: As tabelas ou views não foram criadas.
**Solução**:
1. Re-execute o script `supabase-setup.sql` completo
2. Verifique se há erros no console do SQL Editor

### Views não retornam dados
**Causa**: Não há transações cadastradas ou problemas nas queries.
**Solução**:
1. Verifique se há transações: `SELECT COUNT(*) FROM transacoes;`
2. Insira dados de teste (veja Passo 6)

### Não consigo fazer login
**Causa**: Usuário não confirmado ou credenciais incorretas.
**Solução**:
1. Verifique se o usuário está na tabela `auth.users`
2. Verifique se há registro correspondente em `public.users`
3. No painel do Supabase, vá em Authentication > Users e confirme manualmente o usuário

### RLS bloqueando acesso
**Causa**: Row Level Security muito restritivo.
**Solução**:
1. Verifique as policies: `SELECT * FROM pg_policies WHERE tablename = 'transacoes';`
2. Para debug temporário (APENAS EM DESENVOLVIMENTO):
```sql
ALTER TABLE transacoes DISABLE ROW LEVEL SECURITY;
-- Lembre-se de reabilitar depois!
```

---

## 🚀 Deploy em Produção

### Antes do Deploy

1. **Backup do Banco**
   - No Supabase, vá em Database > Backups
   - Configure backups automáticos

2. **Confirmar Policies**
   - Teste todas as operações
   - Certifique-se de que apenas ADMIN/OPERACOES podem modificar dados

3. **Variáveis de Ambiente**
   - Configure as variáveis no serviço de hospedagem (Vercel, Netlify, etc.)
   - Use a mesma SUPABASE_URL e ANON_KEY

### Monitoramento

**Logs de Autenticação:**
- Authentication > Logs

**Logs de Banco:**
- Database > Logs

**Uso de API:**
- Settings > Usage

---

## 📚 Recursos Adicionais

- [Documentação Oficial do Supabase](https://supabase.com/docs)
- [Guia de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs no Supabase Dashboard
2. Consulte este guia novamente
3. Verifique a documentação oficial do Supabase
4. Entre em contato com o time de desenvolvimento da Seed a Bit

---

Desenvolvido para **Seed a Bit** 💚
