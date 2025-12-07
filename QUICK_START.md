# 🚀 Quick Start - Portal de Transparência Seed a Bit

Este é o guia RÁPIDO para colocar o projeto no ar. Se encontrar problemas, consulte o [README.md](./README.md) completo.

## ⚡ Setup em 5 Minutos

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Criar Projeto no Supabase
1. Acesse: https://supabase.com
2. Crie uma conta e um novo projeto
3. Aguarde o provisionamento (~2 minutos)

### 3️⃣ Executar SQL
1. No Supabase, vá em **SQL Editor**
2. Copie TODO o conteúdo de `supabase-setup.sql`
3. Cole e clique em **Run**

### 4️⃣ Configurar .env
1. No Supabase, vá em **Settings > API**
2. Copie a **Project URL** e a **anon public key**
3. Preencha o arquivo `.env`:

```env
VITE_SUPABASE_URL=sua-url-aqui
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

### 5️⃣ Criar Primeiro Usuário
1. No Supabase, vá em **Authentication > Users**
2. Clique em **Add user > Create new user**
3. Preencha email e senha
4. Marque **Auto Confirm User**
5. No **SQL Editor**, execute:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'seu@email.com';
```

### 6️⃣ Iniciar Projeto
```bash
npm run dev
```

Acesse: http://localhost:5173

---

## ✅ Verificação Rápida

Depois de iniciar, teste:

- [ ] Página inicial carrega
- [ ] Consegue fazer login
- [ ] Dashboard público aparece
- [ ] Dashboard privado acessível (se ADMIN/OPERAÇÕES)
- [ ] Consegue adicionar transação

---

## 🆘 Problemas Comuns

### "Invalid API key"
→ Reinicie o servidor após configurar `.env`

### "Cannot read properties"
→ Execute o script SQL completo no Supabase

### "Row violates RLS"
→ Certifique-se de que o usuário está na tabela `users` com role configurada

---

## 📚 Documentação Completa

Para mais detalhes, consulte:

- [README.md](./README.md) - Instalação completa
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Guia detalhado do Supabase
- [CHECKLIST.md](./CHECKLIST.md) - Checklist completo
- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) - Estrutura do projeto

---

## 🎯 Funcionalidades Principais

✅ Dashboard público com gráficos interativos
✅ Dashboard privado com dados sensíveis
✅ Sistema de autenticação com 3 roles
✅ Filtros avançados (tipo, categoria, período)
✅ Formulário de transações
✅ Tabela detalhada
✅ Identidade visual Seed a Bit

---

## 🎨 Identidade Visual

- **Azul Marinho**: #063472
- **Azul**: #0162b3
- **Verde Escuro**: #aebd24
- **Verde Limão**: #d8ea32
- **Branco Gelo**: #fbfafc

---

## 📊 Estrutura de Roles

| Role | Público | Privado | Adicionar | Editar | Deletar |
|------|---------|---------|-----------|--------|---------|
| PUBLICO | ✅ | ❌ | ❌ | ❌ | ❌ |
| OPERACOES | ✅ | ✅ | ✅ | ✅ | ❌ |
| ADMIN | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🧪 Dados de Teste (Opcional)

No SQL Editor do Supabase:

```sql
-- Substitua SEU-UUID-AQUI pelo ID do seu usuário
INSERT INTO transacoes (data, tipo, valor, descricao, categoria, beneficiario, created_by)
VALUES
  ('2025-01-15', 'ENTRADA', 5000.00, 'Projeto Web', 'Desenvolvimento', 'Cliente XYZ', 'SEU-UUID-AQUI'),
  ('2025-01-20', 'DESPESA', 1500.00, 'Hospedagem', 'Operacional', 'AWS', 'SEU-UUID-AQUI'),
  ('2025-02-01', 'ENTRADA', 8000.00, 'E-Commerce', 'E-Commerce', 'Loja ABC', 'SEU-UUID-AQUI'),
  ('2025-02-10', 'DESPESA', 500.00, 'Marketing', 'Marketing', 'Google Ads', 'SEU-UUID-AQUI');
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
vercel --prod
```

**⚠️ IMPORTANTE**: Configure as variáveis de ambiente no painel da Vercel!

### Outras Plataformas

```bash
npm run build
# Os arquivos estarão em dist/
```

---

## 💡 Dicas

- Use `Ctrl + P` no VS Code para buscar arquivos rapidamente
- Consulte `ROADMAP.md` para ver features futuras
- Mantenha o `.env` sempre no `.gitignore`
- Faça backups regulares do banco no Supabase

---

## 🎓 Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do React](https://react.dev)
- [Documentação do Recharts](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🆘 Suporte

Encontrou um problema?

1. Consulte o [README.md](./README.md)
2. Veja [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
3. Verifique o [CHECKLIST.md](./CHECKLIST.md)
4. Entre em contato com o time da Seed a Bit

---

**Pronto!** 🎉 Seu portal de transparência está funcionando!

Desenvolvido com ❤️ para a **Seed a Bit** 💚
