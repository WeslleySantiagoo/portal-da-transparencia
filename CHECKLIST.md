# ✅ Checklist de Setup - Portal de Transparência

Use este checklist para garantir que tudo foi configurado corretamente.

## 📦 1. Instalação Local

- [ ] Repositório clonado
- [ ] Node.js instalado (versão 18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` criado (copiar de `.env.example`)

## 🗄️ 2. Configuração do Supabase

### Criação do Projeto
- [ ] Conta criada no [Supabase](https://supabase.com)
- [ ] Novo projeto criado
- [ ] Região selecionada
- [ ] Senha do banco anotada em local seguro

### Banco de Dados
- [ ] Script `supabase-setup.sql` copiado
- [ ] Script executado no SQL Editor
- [ ] Sem erros na execução
- [ ] Tabelas criadas verificadas (`users`, `transacoes`)
- [ ] Views criadas verificadas (4 views)
- [ ] Policies criadas verificadas

### Verificações SQL
Execute cada query abaixo e confirme os resultados:

**Verificar tabelas:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```
- [ ] Retorna: `users`, `transacoes`

**Verificar views:**
```sql
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';
```
- [ ] Retorna 4 views (`vw_resumo_financeiro`, etc)

**Verificar policies:**
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```
- [ ] Retorna várias policies

### Autenticação
- [ ] Email provider habilitado
- [ ] Email confirmations configurado (desabilitado para testes)
- [ ] URLs de redirect configuradas (opcional)

### API Keys
- [ ] Project URL copiada
- [ ] anon/public key copiada
- [ ] Variáveis adicionadas ao `.env`:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`

## 👤 3. Primeiro Usuário

- [ ] Usuário criado via Authentication > Users
- [ ] Email e senha definidos
- [ ] Auto Confirm User marcado
- [ ] UUID do usuário copiado
- [ ] Role configurada via SQL:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'seu@email.com';
```
- [ ] Role verificada:
```sql
SELECT id, email, role FROM users WHERE email = 'seu@email.com';
```

## 🧪 4. Dados de Teste (Opcional)

- [ ] UUID do usuário substituído no script
- [ ] Transações de exemplo inseridas
- [ ] Dados visíveis no Table Editor do Supabase

## 🚀 5. Executar Projeto

- [ ] Servidor iniciado (`npm run dev`)
- [ ] Nenhum erro no console
- [ ] Aplicação acessível em `http://localhost:5173`

## ✨ 6. Testes Funcionais

### Landing Page
- [ ] Página inicial carrega corretamente
- [ ] Botões "Acessar Dashboard Público" e "Login" funcionam
- [ ] Design com cores da Seed a Bit
- [ ] Responsiva em mobile

### Login
- [ ] Formulário de login aparece
- [ ] Login com credenciais corretas funciona
- [ ] Erro mostrado para credenciais inválidas
- [ ] Redirecionamento após login funciona

### Dashboard Público
- [ ] Dashboard carrega sem erros
- [ ] Filtros aparecem e funcionam:
  - [ ] Filtro por ano
  - [ ] Filtro por mês
  - [ ] Filtro por tipo
  - [ ] Filtro por categoria
- [ ] Cards de resumo mostram valores corretos:
  - [ ] Total de Entradas
  - [ ] Total de Despesas
  - [ ] Saldo
- [ ] Gráficos renderizam:
  - [ ] Gráfico de pizza (Entradas)
  - [ ] Gráfico de pizza (Despesas)
  - [ ] Gráfico de barras mensal
- [ ] Botão "Ver Tabela Completa" funciona
- [ ] Tabela mostra transações corretamente

### Dashboard Privado (ADMIN/OPERAÇÕES)
- [ ] Link "Dashboard Privado" aparece no header
- [ ] Dashboard privado carrega
- [ ] Cards de informações sensíveis aparecem:
  - [ ] Saldo Atual
  - [ ] Reserva de Emergência
  - [ ] Total Entradas
  - [ ] Total Despesas
- [ ] Tudo do dashboard público também funciona

### Adicionar Transação
- [ ] Botão "Nova Transação" aparece (ADMIN/OPERAÇÕES)
- [ ] Modal abre ao clicar
- [ ] Formulário tem todos os campos:
  - [ ] Data
  - [ ] Tipo (Entrada/Despesa)
  - [ ] Valor
  - [ ] Categoria
  - [ ] Descrição
  - [ ] Beneficiário
- [ ] Categorias mudam ao trocar tipo
- [ ] Validação de campos obrigatórios funciona
- [ ] Transação é salva com sucesso
- [ ] Dashboard atualiza automaticamente
- [ ] Nova transação aparece na tabela e gráficos

### Header e Navegação
- [ ] Header aparece em todas as páginas
- [ ] Logo "Seed a Bit" clicável
- [ ] Links de navegação funcionam
- [ ] Email e role do usuário aparecem
- [ ] Botão "Sair" funciona
- [ ] Após sair, redireciona para home

### Proteção de Rotas
- [ ] Usuário não logado é redirecionado para login
- [ ] Usuário PUBLICO não acessa dashboard privado
- [ ] Usuário OPERAÇÕES acessa dashboard privado
- [ ] Usuário ADMIN acessa tudo

## 🔒 7. Segurança

- [ ] RLS habilitado nas tabelas
- [ ] Policies impedem acesso não autorizado
- [ ] Teste: criar usuário PUBLICO e verificar que não vê dashboard privado
- [ ] Teste: verificar que PUBLICO não consegue adicionar transações
- [ ] Variáveis de ambiente não estão no Git (`.env` no `.gitignore`)

## 📱 8. Responsividade

- [ ] Layout responsivo em mobile (< 768px)
- [ ] Gráficos adaptam em telas pequenas
- [ ] Tabelas scrollam horizontalmente se necessário
- [ ] Formulários são usáveis em mobile
- [ ] Menu/navegação funciona em mobile

## 🎨 9. Design

- [ ] Cores da Seed a Bit aplicadas corretamente:
  - [ ] Azul Marinho (#063472)
  - [ ] Azul (#0162b3)
  - [ ] Verde Escuro (#aebd24)
  - [ ] Verde Limão (#d8ea32)
  - [ ] Branco Gelo (#fbfafc)
- [ ] Tipografia legível
- [ ] Espaçamentos consistentes
- [ ] Botões com hover states
- [ ] Ícones aparecem corretamente

## 🐛 10. Troubleshooting

Se algo não funcionar, verifique:

### Erro de API Key
- [ ] Variáveis do `.env` corretas
- [ ] Servidor reiniciado após alterar `.env`
- [ ] URL do Supabase sem barra no final

### Erro de RLS
- [ ] Script SQL executado completamente
- [ ] Policies criadas corretamente
- [ ] Usuário existe na tabela `users` (não só em `auth.users`)

### Gráficos vazios
- [ ] Há transações no banco
- [ ] Filtros não muito restritivos
- [ ] Console do navegador sem erros

### Login não funciona
- [ ] Usuário criado via Authentication
- [ ] Role configurada na tabela `users`
- [ ] Email confirmado (ou auto-confirm habilitado)

## 📚 11. Documentação

- [ ] README.md lido e compreendido
- [ ] SUPABASE_SETUP_GUIDE.md consultado
- [ ] Documentação do Supabase acessível

## 🚀 12. Deploy (Quando for para produção)

- [ ] Build funciona sem erros (`npm run build`)
- [ ] Variáveis de ambiente configuradas no serviço de hospedagem
- [ ] URL de produção adicionada no Supabase (Redirect URLs)
- [ ] Backup do banco configurado
- [ ] Domínio personalizado configurado (opcional)
- [ ] HTTPS habilitado

## ✅ Conclusão

Quando todos os itens estiverem marcados:

🎉 **PARABÉNS!** O Portal de Transparência da Seed a Bit está 100% funcional!

---

**Problemas?** Consulte:
- [README.md](./README.md) - Instruções gerais
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Guia detalhado do Supabase
- [Documentação do Supabase](https://supabase.com/docs)

---

Desenvolvido com ❤️ para a **Seed a Bit**
