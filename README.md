# Dr. Ritchie — O Próximo Nível

Landing page em `/` e formulário de inscrição em `/inscricao`.

O formulário contém as perguntas de qualificação, WhatsApp com seletor de país (BR/+55 por padrão) e e-mail. As respostas são validadas no navegador e no servidor, persistidas no PostgreSQL/Neon e só então o visitante é encaminhado para o grupo de WhatsApp.

## Stack para Vercel

- Next.js 16 com App Router
- React 19
- Neon Serverless Postgres via `@neondatabase/serverless`
- Drizzle Kit para a migração do schema
- Node.js 22+

A versão original usava `vinext`, Cloudflare Workers e Cloudflare D1. Para rodar na Vercel, o build agora usa Next.js nativo e a API usa Neon/Postgres, porque o binding `cloudflare:workers` e o D1 não existem no runtime da Vercel. A migração D1 original foi preservada em `drizzle-d1/` apenas como referência.

## Desenvolvimento local

```bash
pnpm install
cp .env.example .env.local
# preencha DATABASE_URL em .env.local
pnpm db:migrate
pnpm dev
```

Comandos disponíveis:

- `pnpm dev`: desenvolvimento local
- `pnpm build`: build de produção
- `pnpm start`: inicia o build de produção
- `pnpm lint`: validação ESLint
- `pnpm db:generate`: gera uma nova migração Drizzle
- `pnpm db:migrate`: aplica migrações usando `DATABASE_URL`

## Deploy na Vercel

1. Crie um banco Neon pelo [Marketplace da Vercel](https://vercel.com/marketplace/neon) ou no painel da Neon.
2. Importe este repositório na Vercel. O projeto já contém `vercel.json`, `pnpm-lock.yaml` e os scripts nativos do Next.js.
3. Em **Settings → Environment Variables**, configure:
   - `DATABASE_URL`: connection string do Neon/Postgres;
   - `FORM_WEBHOOK_URL`: opcional, URL que recebe os dados após o salvamento;
   - `FORM_WEBHOOK_TOKEN`: opcional, token Bearer do webhook.
4. Antes do primeiro uso do formulário, aplique o schema no banco. Localmente, com a mesma `DATABASE_URL` de produção:

   ```bash
   pnpm db:migrate
   ```

5. Faça um redeploy e teste `/`, `/inscricao` e uma inscrição de ponta a ponta.

A Vercel fará `pnpm install --frozen-lockfile` e `pnpm build` automaticamente conforme `vercel.json`. Não coloque `DATABASE_URL` ou tokens no repositório.

## Dados

A tabela privada `registrations` guarda os contatos e respostas em `answers_json`. Não há rota pública de leitura. Nenhuma resposta pessoal vai na URL do WhatsApp.

`lib/questionnaire.ts` contém perguntas, regras de validação, identificador do evento e destino do grupo.

## Atenção ao banco existente

O D1 usado no ambiente original não é automaticamente convertido para Neon. Se já houver inscrições em produção, exporte/migre esses dados separadamente antes de apontar a Vercel para o novo `DATABASE_URL`.
