# 🔐 Como Testar o Login

## Problema Identificado e Solucionado

O problema era que após o login, o estado do usuário não estava sendo atualizado corretamente e a navegação não funcionava. 

### ✅ Correções Aplicadas:

1. **LoginPage.tsx**: Adicionado `useEffect` que monitora o estado do `user` e redireciona automaticamente quando o login é bem-sucedido
2. **AuthContext.tsx**: Melhorado o `fetchUserProfile` com tratamento de erro e logs para debug
3. **App.tsx**: Adicionada tela de loading global enquanto verifica a sessão do usuário

## 🧪 Como Testar

### Passo 1: Criar um Usuário no Supabase

Você precisa criar um usuário no Supabase antes de fazer login. Há duas formas:

#### Opção A: Via Console do Supabase (Recomendado)
1. Acesse: https://supabase.com/dashboard/project/doepwaarabutdrbfgomo
2. Vá em **Authentication** → **Users**
3. Clique em **Add user** → **Create new user**
4. Preencha:
   - Email: `admin@seedabit.com`
   - Password: `SeedaBit2024!`
   - Auto Confirm User: ✅ **Marque esta opção**
5. Clique em **Create user**

#### Opção B: Via SQL Editor
1. Acesse: https://supabase.com/dashboard/project/doepwaarabutdrbfgomo/sql/new
2. Execute este SQL:

```sql
-- Criar usuário na tabela users (depois que o usuário de auth for criado)
-- Primeiro, crie o usuário via Authentication UI, depois pegue o UUID dele e use aqui

INSERT INTO users (id, email, role, created_at)
VALUES 
  -- Substitua 'UUID_DO_USUARIO' pelo ID real do usuário criado no Authentication
  ('UUID_DO_USUARIO', 'admin@seedabit.com', 'ADMIN', NOW());
```

### Passo 2: Fazer Login no Portal

1. Acesse: http://localhost:5173/login
2. Digite:
   - **Email**: `admin@seedabit.com`
   - **Senha**: `SeedaBit2024!`
3. Clique em **Entrar**

### 📊 O Que Deve Acontecer

1. ✅ Você verá "Carregando..." por alguns segundos
2. ✅ Será redirecionado automaticamente para `/dashboard`
3. ✅ O Header mostrará seu email e role (ADMIN)
4. ✅ Verá o link "Dashboard Privado" no menu
5. ✅ Poderá acessar `/dashboard/privado` com todas as informações de admin

### 🔍 Debug no Console do Browser

Abra o DevTools (F12) e vá na aba Console. Você verá logs como:

```
Attempting sign in for: admin@seedabit.com
Sign in successful: { user: {...}, session: {...} }
User profile fetched: { id: '...', email: 'admin@seedabit.com', role: 'ADMIN' }
```

Se houver erros, eles aparecerão aqui e me envie para eu ajudar!

## 🎯 Testando Diferentes Roles

### Criar Usuário OPERACOES
```sql
-- No Authentication, crie: operacoes@seedabit.com
-- Depois, insira na tabela users:
INSERT INTO users (id, email, role, created_at)
VALUES ('UUID_DO_USUARIO', 'operacoes@seedabit.com', 'OPERACOES', NOW());
```

### Criar Usuário PUBLICO
```sql
-- No Authentication, crie: publico@seedabit.com
-- Depois, insira na tabela users:
INSERT INTO users (id, email, role, created_at)
VALUES ('UUID_DO_USUARIO', 'publico@seedabit.com', 'PUBLICO', NOW());
```

## 🚨 Problemas Comuns

### "Email ou senha inválidos"
- ✅ Verifique se o usuário foi criado no Supabase Authentication
- ✅ Certifique-se de marcar "Auto Confirm User" ao criar
- ✅ Verifique se a senha está correta

### Fica na tela de login após digitar
- ✅ Abra o Console (F12) e veja se há erros
- ✅ Verifique se o `.env` tem as credenciais corretas
- ✅ Veja os logs: "Attempting sign in" deve aparecer

### Redireciona mas não mostra info do usuário
- ✅ Verifique se o usuário existe na tabela `users` do Supabase
- ✅ O console deve mostrar "User profile fetched"
- ✅ Se não tiver na tabela, será criado automaticamente como PUBLICO

## 📝 Próximos Passos

Depois que conseguir fazer login:

1. ✅ Testar Dashboard Público (todos podem ver)
2. ✅ Testar Dashboard Privado (só ADMIN e OPERACOES)
3. ✅ Testar criação de transações (botão "Nova Transação")
4. ✅ Testar filtros de data, tipo, categoria
5. ✅ Verificar gráficos e resumo financeiro

---

**Importante**: As alterações já estão aplicadas! Basta recarregar a página (Ctrl+R) no navegador.
