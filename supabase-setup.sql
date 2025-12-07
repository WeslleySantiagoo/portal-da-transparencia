-- ================================================
-- SETUP COMPLETO DO SUPABASE
-- Portal de Transparência - Seed a Bit
-- ================================================

-- ================================================
-- 1. CRIAÇÃO DE TABELAS
-- ================================================

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'OPERACOES', 'PUBLICO')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de transações
CREATE TABLE IF NOT EXISTS transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data DATE NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('ENTRADA', 'DESPESA')),
  valor NUMERIC(10, 2) NOT NULL CHECK (valor > 0),
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  beneficiario TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_transacoes_data ON transacoes(data DESC);
CREATE INDEX IF NOT EXISTS idx_transacoes_tipo ON transacoes(tipo);
CREATE INDEX IF NOT EXISTS idx_transacoes_categoria ON transacoes(categoria);
CREATE INDEX IF NOT EXISTS idx_transacoes_created_by ON transacoes(created_by);

-- ================================================
-- 2. ROW LEVEL SECURITY (RLS)
-- ================================================

-- Habilitar RLS nas tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;

-- ================================================
-- 3. POLICIES PARA TABELA USERS
-- ================================================

-- Usuários podem ver seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Apenas ADMIN pode ver todos os usuários
CREATE POLICY "Admins can view all users"
  ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- Apenas ADMIN pode atualizar usuários
CREATE POLICY "Admins can update users"
  ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- ================================================
-- 4. POLICIES PARA TABELA TRANSACOES
-- ================================================

-- Todos podem visualizar transações (dashboard público)
CREATE POLICY "Anyone can view transactions"
  ON transacoes
  FOR SELECT
  USING (true);

-- Apenas ADMIN e OPERACOES podem inserir transações
CREATE POLICY "ADMIN and OPERACOES can insert transactions"
  ON transacoes
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('ADMIN', 'OPERACOES')
    )
  );

-- Apenas ADMIN e OPERACOES podem atualizar transações
CREATE POLICY "ADMIN and OPERACOES can update transactions"
  ON transacoes
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('ADMIN', 'OPERACOES')
    )
  );

-- Apenas ADMIN pode deletar transações
CREATE POLICY "Only ADMIN can delete transactions"
  ON transacoes
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- ================================================
-- 5. VIEWS PARA RESUMOS FINANCEIROS
-- ================================================

-- View: Resumo Financeiro Geral
CREATE OR REPLACE VIEW vw_resumo_financeiro AS
SELECT
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'ENTRADA') -
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'DESPESA') AS saldo_atual,
  
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'DESPESA' AND categoria = 'Reserva') AS reserva_emergencia,
  
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'DESPESA' AND categoria = 'Operacional') AS total_operacoes,
  
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'ENTRADA') AS total_projetos,
  
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'ENTRADA') AS total_negocios,
  
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'ENTRADA') AS total_entradas,
  
  (SELECT COALESCE(SUM(valor), 0) 
   FROM transacoes 
   WHERE tipo = 'DESPESA') AS total_despesas;

-- View: Resumo Mensal
CREATE OR REPLACE VIEW vw_resumo_mensal AS
SELECT
  EXTRACT(YEAR FROM data) AS ano,
  EXTRACT(MONTH FROM data) AS mes,
  SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE 0 END) AS total_entradas,
  SUM(CASE WHEN tipo = 'DESPESA' THEN valor ELSE 0 END) AS total_despesas,
  SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE -valor END) AS saldo
FROM transacoes
GROUP BY EXTRACT(YEAR FROM data), EXTRACT(MONTH FROM data)
ORDER BY ano DESC, mes DESC;

-- View: Entradas por Categoria
CREATE OR REPLACE VIEW vw_entradas_por_categoria AS
SELECT
  categoria,
  COUNT(*) AS quantidade,
  SUM(valor) AS total,
  AVG(valor) AS media
FROM transacoes
WHERE tipo = 'ENTRADA'
GROUP BY categoria
ORDER BY total DESC;

-- View: Despesas por Categoria
CREATE OR REPLACE VIEW vw_despesas_por_categoria AS
SELECT
  categoria,
  COUNT(*) AS quantidade,
  SUM(valor) AS total,
  AVG(valor) AS media
FROM transacoes
WHERE tipo = 'DESPESA'
GROUP BY categoria
ORDER BY total DESC;

-- ================================================
-- 6. FUNÇÃO PARA CRIAR USUÁRIO AUTOMATICAMENTE
-- ================================================

-- Função que cria automaticamente um registro na tabela users
-- quando um novo usuário é criado na auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'PUBLICO');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função acima
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ================================================
-- 7. DADOS DE EXEMPLO (OPCIONAL - REMOVER EM PRODUÇÃO)
-- ================================================

-- Criar usuário admin de exemplo
-- NOTA: Você precisa criar o usuário via Supabase Auth primeiro
-- Depois, execute este comando substituindo o UUID pelo ID real do usuário:

-- INSERT INTO users (id, email, role)
-- VALUES ('SEU-UUID-AQUI', 'admin@seedabit.com', 'ADMIN');

-- Exemplos de transações
-- INSERT INTO transacoes (data, tipo, valor, descricao, categoria, beneficiario, created_by)
-- VALUES
--   ('2025-01-15', 'ENTRADA', 5000.00, 'Projeto de Desenvolvimento Web', 'Desenvolvimento', 'Cliente XYZ', 'SEU-UUID-AQUI'),
--   ('2025-01-20', 'DESPESA', 1500.00, 'Hospedagem e Domínios', 'Operacional', 'AWS', 'SEU-UUID-AQUI'),
--   ('2025-02-01', 'ENTRADA', 8000.00, 'E-Commerce para loja virtual', 'E-Commerce', 'Loja ABC', 'SEU-UUID-AQUI'),
--   ('2025-02-10', 'DESPESA', 500.00, 'Marketing digital - Anúncios', 'Marketing', 'Google Ads', 'SEU-UUID-AQUI');

-- ================================================
-- 8. GRANTS E PERMISSÕES
-- ================================================

-- Permitir acesso público às views (para usuários autenticados)
GRANT SELECT ON vw_resumo_financeiro TO authenticated;
GRANT SELECT ON vw_resumo_mensal TO authenticated;
GRANT SELECT ON vw_entradas_por_categoria TO authenticated;
GRANT SELECT ON vw_despesas_por_categoria TO authenticated;

-- ================================================
-- FIM DO SETUP
-- ================================================

-- NOTA IMPORTANTE:
-- Após executar este script no SQL Editor do Supabase:
-- 1. Vá em Authentication > Users
-- 2. Crie usuários manualmente via painel ou API
-- 3. Depois de criar, execute no SQL Editor:
--    UPDATE users SET role = 'ADMIN' WHERE email = 'seuemail@exemplo.com';
-- 4. Configure as variáveis de ambiente no arquivo .env:
--    VITE_SUPABASE_URL=sua_url_do_projeto
--    VITE_SUPABASE_ANON_KEY=sua_chave_anonima
