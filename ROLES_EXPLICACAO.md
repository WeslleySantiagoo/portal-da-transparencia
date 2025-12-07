# 🔐 Sistema de Roles - Explicação

## ⚠️ Problema Identificado e Resolvido

O Supabase Auth tem um sistema próprio de roles que é usado para autenticação básica:
- `authenticated` - usuário logado
- `anon` - usuário anônimo
- `service_role` - role de serviço

**IMPORTANTE**: Essas roles do Supabase Auth **NÃO SÃO** as nossas roles de negócio!

## ✅ Solução Implementada

Criamos nossa **própria tabela `users`** com uma coluna `role` personalizada que define as permissões no Portal de Transparência:

### Nossas Roles (da tabela `users`):
- **ADMIN** - Acesso total ao sistema
- **OPERACOES** - Acesso operacional
- **PUBLICO** - Acesso apenas público

## 🔍 Como Funciona Agora

### 1. Tabela Separadas:
```
auth.users (Supabase)          public.users (Nossa tabela)
├─ id (UUID)                   ├─ id (UUID) ← referência ao auth.users
├─ email                       ├─ email
├─ encrypted_password          ├─ role ← NOSSA ROLE PERSONALIZADA!
└─ role: "authenticated"       └─ created_at
```

### 2. Fluxo de Autenticação:
```
1. Login com email/senha
   ↓
2. Supabase Auth verifica credenciais
   ↓
3. Retorna auth.users (role: "authenticated")
   ↓
4. 🎯 AuthContext busca na tabela users
   ↓
5. Retorna user.role da tabela users ("ADMIN", "OPERACOES", ou "PUBLICO")
   ↓
6. Essa é a role usada no sistema!
```

### 3. No Código:
```typescript
// ❌ ERRADO - Usar role do Supabase Auth
const role = supabaseUser.role; // "authenticated" (inútil para nós)

// ✅ CORRETO - Usar role da tabela users
const role = user.role; // "ADMIN", "OPERACOES" ou "PUBLICO"
```

## 📋 Verificação no Console

Agora todos os logs deixam claro de onde vem a role:

```
🔍 Fetching user profile from users table for ID: abc123...
✅ User profile fetched from users table: 
   { email: "admin@seedabit.com", role: "ADMIN", id: "..." }
🔑 hasRole check: User "admin@seedabit.com" has role "ADMIN". 
   Required: [ADMIN, OPERACOES]. Result: true
```

## 🐛 Painel de Debug

O painel no canto inferior direito agora mostra:

```
🐛 DEBUG - User Info
━━━━━━━━━━━━━━━━━━━━━━
Supabase Auth User ID: abc-123...
Supabase Auth Email: admin@seedabit.com

⚠️ NOTA IMPORTANTE:
Supabase Auth tem uma role padrão "authenticated".
NÓS USAMOS A ROLE DA TABELA "users" (abaixo) ⬇️

📊 USER FROM DATABASE TABLE "users":
┌─────────────────────────────────
│ ID: abc-123...
│ Email: admin@seedabit.com
│ 
│ Role (da tabela users):
│ ┏━━━━━━━━━━━━━━┓
│ ┃   ADMIN   ┃  ← Esta é a role usada!
│ ┗━━━━━━━━━━━━━━┛
│ 
│ Created: 06/12/2025, 23:45:12
└─────────────────────────────────
```

## 🎯 Como Garantir que a Role Está Correta

### 1. Verificar no Supabase SQL Editor:
```sql
-- Ver sua role atual
SELECT id, email, role, created_at 
FROM users 
WHERE email = 'seu@email.com';
```

### 2. Se não aparecer nada ou estiver errado:
```sql
-- Primeiro, pegue seu UUID do auth.users
SELECT id FROM auth.users WHERE email = 'seu@email.com';

-- Depois, insira/atualize na tabela users
INSERT INTO users (id, email, role, created_at)
VALUES ('SEU_UUID_AQUI', 'seu@email.com', 'ADMIN', NOW())
ON CONFLICT (id) DO UPDATE SET role = 'ADMIN';
```

### 3. Fazer logout e login novamente
Para recarregar a role do banco de dados.

## 🔒 Políticas RLS (Row Level Security)

As policies no Supabase usam nossa role personalizada:

```sql
-- Exemplo de policy que verifica nossa role
CREATE POLICY "Only ADMIN and OPERACOES can insert"
ON transacoes FOR INSERT
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role IN ('ADMIN', 'OPERACOES')
  )
);
```

## ✅ Resumo

| Aspecto | Supabase Auth Role | Nossa Role (tabela users) |
|---------|-------------------|---------------------------|
| Tabela | `auth.users` | `public.users` |
| Valor | `"authenticated"` | `"ADMIN"`, `"OPERACOES"`, `"PUBLICO"` |
| Uso | Apenas autenticação | **Controle de acesso no app** |
| Onde buscar | `supabaseUser.role` | **`user.role`** ← Use este! |

---

**🎉 Agora o sistema está correto!** A role do sistema Supabase Auth não interfere mais com nossas roles personalizadas.
