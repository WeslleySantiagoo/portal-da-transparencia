# 🔧 Como Corrigir a Role do Usuário

## Problema
O sistema não está pegando sua role corretamente porque o usuário não existe na tabela `users` ou a role está incorreta.

## ✅ Solução Rápida

### Passo 1: Abrir SQL Editor do Supabase
1. Acesse: https://supabase.com/dashboard/project/doepwaarabutdrbfgomo/sql/new

### Passo 2: Verificar seu User ID
Execute este SQL:
```sql
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

Copie o **UUID** (id) do seu usuário.

### Passo 3: Inserir/Atualizar na tabela users

#### Se o usuário NÃO existe na tabela users:
```sql
INSERT INTO users (id, email, role, created_at)
VALUES (
  'COLE_AQUI_SEU_UUID',  -- Cole o UUID que você copiou
  'seu@email.com',        -- Seu email
  'ADMIN',                -- Role desejada: ADMIN, OPERACOES ou PUBLICO
  NOW()
);
```

#### Se o usuário JÁ existe mas a role está errada:
```sql
UPDATE users 
SET role = 'ADMIN'  -- Altere para: ADMIN, OPERACOES ou PUBLICO
WHERE email = 'seu@email.com';
```

### Passo 4: Verificar se deu certo
```sql
SELECT id, email, role, created_at 
FROM users 
WHERE email = 'seu@email.com';
```

Deve retornar algo como:
```
id: 12345-abcd-...
email: seu@email.com
role: ADMIN
created_at: 2025-12-06 ...
```

### Passo 5: Fazer logout e login novamente
1. No portal, clique em "Sair"
2. Vá em `/login`
3. Faça login novamente
4. Agora sua role estará correta! ✨

## 🐛 Verificando no Browser

Agora o site tem um **painel de debug** no canto inferior direito que mostra:
- ✅ Se está carregando
- ✅ Supabase User ID
- ✅ Email
- ✅ **Role** (em destaque)

Se aparecer `role: PUBLICO` mas você quer `ADMIN`, siga os passos acima!

## 📋 Exemplo Completo

Vamos supor que:
- Seu UUID é: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- Seu email é: `admin@seedabit.com`
- Você quer role: `ADMIN`

Execute:
```sql
-- Verificar se já existe
SELECT * FROM users WHERE email = 'admin@seedabit.com';

-- Se NÃO existir, inserir:
INSERT INTO users (id, email, role, created_at)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'admin@seedabit.com',
  'ADMIN',
  NOW()
);

-- Se já existir, atualizar:
UPDATE users 
SET role = 'ADMIN'
WHERE email = 'admin@seedabit.com';
```

## 🎯 Roles Disponíveis

- **ADMIN**: Acesso total (Dashboard Privado + pode criar/editar/deletar transações)
- **OPERACOES**: Acesso ao Dashboard Privado + pode criar/editar transações
- **PUBLICO**: Acesso apenas ao Dashboard Público (sem informações sensíveis)

---

**Depois de fazer isso, recarregue a página e veja o painel de debug no canto inferior direito!** 🚀
