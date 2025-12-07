-- ================================================
-- SCRIPT PARA VERIFICAR E CRIAR USUÁRIOS COM ROLES
-- Execute este script no SQL Editor do Supabase
-- ================================================

-- 1. VERIFICAR SE AS TABELAS EXISTEM
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'transacoes');

-- 2. VERIFICAR USUÁRIOS EXISTENTES NA TABELA USERS
SELECT id, email, role, created_at 
FROM users 
ORDER BY created_at DESC;

-- 3. LISTAR TODOS OS USUÁRIOS AUTENTICADOS (da tabela auth.users)
SELECT id, email, created_at, confirmed_at 
FROM auth.users 
ORDER BY created_at DESC;

-- ================================================
-- 4. CRIAR/ATUALIZAR USUÁRIO COM ROLE CORRETA
-- ================================================

-- IMPORTANTE: Primeiro você precisa criar o usuário no Authentication UI do Supabase
-- Depois, execute um dos scripts abaixo conforme necessário:

-- Opção A: INSERIR novo usuário na tabela users (se não existe)
-- Substitua 'SEU_USER_ID_AQUI' pelo UUID do usuário criado no Authentication
-- Substitua 'seu@email.com' pelo email do usuário
-- Escolha a ROLE: 'ADMIN', 'OPERACOES' ou 'PUBLICO'

INSERT INTO users (id, email, role, created_at)
VALUES (
  'SEU_USER_ID_AQUI',  -- Cole aqui o UUID do auth.users
  'seu@email.com',      -- Email do usuário
  'ADMIN',              -- Role desejada: ADMIN, OPERACOES ou PUBLICO
  NOW()
)
ON CONFLICT (id) DO NOTHING;  -- Não faz nada se já existir

-- Opção B: ATUALIZAR role de usuário existente
-- Use este se o usuário já existe mas a role está errada

UPDATE users 
SET role = 'ADMIN'  -- Altere para a role desejada
WHERE email = 'seu@email.com';  -- Altere para o email correto

-- ================================================
-- 5. EXEMPLO COMPLETO: Criar usuário ADMIN
-- ================================================

-- Primeiro, crie o usuário no Supabase UI:
-- 1. Vá em Authentication → Users → Add user
-- 2. Email: admin@seedabit.com
-- 3. Password: SeedaBit2024!
-- 4. Marque "Auto Confirm User"
-- 5. Clique em Create user
-- 6. Copie o UUID do usuário criado

-- Depois, execute este SQL (substituindo o UUID):
-- INSERT INTO users (id, email, role, created_at)
-- VALUES (
--   'cole-aqui-o-uuid-do-usuario',
--   'admin@seedabit.com',
--   'ADMIN',
--   NOW()
-- );

-- ================================================
-- 6. VERIFICAR SE DEU CERTO
-- ================================================

SELECT 
  u.id,
  u.email,
  u.role,
  u.created_at,
  au.confirmed_at,
  au.last_sign_in_at
FROM users u
LEFT JOIN auth.users au ON u.id = au.id
ORDER BY u.created_at DESC;
