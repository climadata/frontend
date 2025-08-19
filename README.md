## Tecnologias
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface de usuário
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Ícones
- **Radix UI** - Componentes de interface

## Requisitos

### Serviços necessários
Para funcionamento completo da aplicação, você precisa dos seguintes serviços rodando:

1. **Backend (Weather Service)** - Porta 8081
2. **API Gateway** - Porta 8080

> **Nota**: Este frontend está configurado para trabalhar em uma arquitetura de microsserviços. Certifique-se de que os outros serviços estão rodando.

## Como rodar o projeto

### Opção 1: Setup Rápido (Recomendado)

```bash
# 1. Clone o repositório (se ainda não fez)
git clone <url-do-repositorio>
cd frontend

# 2. Configure as variáveis de ambiente
cp env.example .env.local

# 3. Use o script automático que instala dependências e inicia o projeto
./scripts/start-dev.sh
```

### Opção 2: Setup Manual

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp env.example .env.local

# 3. Inicie o projeto em modo desenvolvimento
npm run dev
```

### Opção 3: Rodar todos os serviços juntos

```bash
# Execute este comando para iniciar Frontend + API Gateway + Backend
npm run start-all
```

## Configuração

### Variáveis de Ambiente

O arquivo `.env.local` deve ser criado a partir do `env.example`:

```bash
# Obrigatórias
NEXT_PUBLIC_GATEWAY_URL=http://localhost:8080    # URL do API Gateway (NÃO do frontend!)
NEXT_PUBLIC_APP_ENV=development                  # Ambiente da aplicação

# Opcionais
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081   # URL direta do backend (fallback)
NEXT_PUBLIC_DEBUG=true                           # Habilitar logs de debug
NEXT_PUBLIC_LOG_LEVEL=debug                      # Nível de log
```

**IMPORTANTE:** A variável `NEXT_PUBLIC_GATEWAY_URL` deve apontar para o **API Gateway** (porta 8080), não para o frontend (porta 3000)!

**🏗️ Arquitetura:**
```
Frontend (3000) → API Gateway (8080) → Backend (8081)
```

### Scripts Disponíveis

```bash
npm run dev          # Inicia o desenvolvimento (porta 3000)
npm run build        # Build para produção
npm run start        # Inicia versão de produção
npm run lint         # Executa o linter
npm run check-services   # Verifica se todos os serviços estão rodando
npm run start-dev       # Script automático de desenvolvimento
npm run start-all      # Inicia todos os serviços (Frontend + Gateway + Backend)
```

## URLs dos Serviços

Após iniciar todos os serviços:

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080  
- **Backend**: http://localhost:8081

## Verificação

### Teste de Conectividade
1. Acesse http://localhost:3000
2. Verifique se a página carrega sem erros
3. Teste a busca por uma cidade

### Teste das APIs
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

### Problema: "Port 3000 already in use"
```bash
# Encontre o processo usando a porta
lsof -i :3000

# Mate o processo
kill -9 <PID>
```

### Problema: "Gateway error: 503" 
- Verifique se o API Gateway está rodando na porta 8080
- Verifique se o Backend está rodando na porta 8081
- Verifique o arquivo `.env.local`

### Problema: "Module not found"
```bash
# Delete node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Problema: "CORS error"
- Verifique se o API Gateway está configurado para aceitar requisições do frontend
- Certifique-se de que as URLs no `.env.local` estão corretas

### Problema: Serviços não conectam
```bash
# Use o script de verificação
npm run check-services

# Ou verifique manualmente cada serviço
curl http://localhost:8081/health  # Backend
curl http://localhost:8080/health  # API Gateway
```

## Estrutura do Projeto

```
frontend/
├── app/                    # App Router do Next.js
│   ├── api/               # API routes (proxy para gateway)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base de UI
│   ├── weather/          # Componentes específicos do clima
│   └── layout/           # Componentes de layout
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── types/                # Definições de tipos TypeScript
├── data/                 # Dados mock/estáticos
├── scripts/              # Scripts de automação
├── public/               # Arquivos estáticos
├── env.example           # Exemplo de variáveis de ambiente
└── README.md            # Este arquivo
```

## 📄 Documentação Adicional

- [Guia de Desenvolvimento](DEVELOPMENT.md) - Instruções detalhadas para desenvolvimento
- [Guia de Terminais](TERMINAL-GUIDE.md) - Como rodar cada serviço em terminais separados
