# Guia de Desenvolvimento

Este guia explica como rodar o frontend integrado com o API Gateway e backend.

## Pré-requisitos

- Node.js 18+ instalado
- API Gateway rodando na porta 8080
- Backend rodando na porta 8081

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# API Gateway Configuration
NEXT_PUBLIC_GATEWAY_URL=http://localhost:8080

# Development Configuration
NEXT_PUBLIC_APP_ENV=development
```

### 2. Instalar Dependências

```bash
npm install
```

## Como Executar

### Opção 1: Script automático (recomendado)

```bash
./scripts/start-dev.sh
```

### Opção 2: manual

1. **Certifique-se de que o API Gateway está rodando:**
   ```bash
   # No diretório do API Gateway
   npm run dev
   # ou
   yarn dev
   ```

2. **Certifique-se de que o Backend está rodando:**
   ```bash
   # No diretório do Backend
   npm run dev
   # ou
   yarn dev
   ```

3. **Inicie o frontend:**
   ```bash
   npm run dev
   ```

## URLs dos Serviços

- **Frontend:** http://localhost:3000
- **API Gateway:** http://localhost:8080
- **Backend:** http://localhost:8081

## Verificação de Integração

### 1. Teste de Conectividade

Acesse: http://localhost:3000

### 2. Teste das APIs

Você pode testar as APIs diretamente:

```bash
# Teste do Weather API
curl "http://localhost:3000/api/weather?city=São Paulo"

# Teste do Auth API
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Teste do Alerts API
curl "http://localhost:3000/api/alerts?userId=123"
```

## Troubleshooting

### Problema: "Gateway error: 503"
- Verifique se o API Gateway está rodando na porta 8080
- Verifique se o backend está rodando na porta 8081

### Problema: "CORS error"
- Verifique se o API Gateway está configurado para aceitar requisições do frontend

### Problema: "Module not found"
- Execute `npm install` para instalar as dependências

## 📁 Estrutura de Arquivos

```
frontend/
├── app/api/           # API Routes (proxies para o Gateway)
├── lib/api-config.ts  # Configuração do API Gateway
├── .env.local         # Variáveis de ambiente (criar)
├── env.example        # Exemplo de configuração
└── scripts/           # Scripts de desenvolvimento
```

## Fluxo de Dados

1. **Frontend** (porta 3000) → **API Routes** → **API Gateway** (porta 8080) → **Backend** (porta 8081)

2. O frontend faz requisições para suas próprias API routes
3. As API routes fazem proxy para o API Gateway
4. O API Gateway roteia para o backend apropriado
