-- ================================================
-- FIX: Permitir que usuários criem seu próprio perfil
-- ================================================

-- Adicionar política para permitir que usuários insiram seu próprio perfil
CREATE POLICY IF NOT EXISTS "Users can insert own profile"
  ON users
  FOR INSERT
  WITH CHECK (
    auth.uid() = id
  );

-- Verificar políticas existentes
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;
