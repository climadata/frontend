#!/bin/bash

# Script para iniciar todos os serviços: Frontend, API Gateway, Auth Service e Weather Service

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Diretórios dos serviços (relativos ao diretório pai)
FRONTEND_DIR="frontend"
GATEWAY_DIR="api-gateway"
AUTH_DIR="auth-service"
BACKEND_DIR="weather-service"

# Função para verificar se um diretório existe
check_directory() {
    if [ ! -d "../$1" ]; then
        echo -e "${RED}Diretório $1 não encontrado!${NC}"
        return 1
    fi
    return 0
}

# Função para instalar dependências se necessário
install_deps() {
    local dir=$1
    if [ ! -d "../$dir/node_modules" ]; then
        echo -e "${YELLOW}Instalando dependências em $dir...${NC}"
        (cd "../$dir" && npm install)
    fi
}

# Verificar diretórios
echo -e "${BLUE}🔍 Verificando diretórios...${NC}"
check_directory $GATEWAY_DIR || exit 1
check_directory $BACKEND_DIR || exit 1
check_directory $AUTH_DIR || exit 1

# Instalar dependências
echo -e "${BLUE}📦 Instalando dependências...${NC}"
install_deps $GATEWAY_DIR
install_deps $BACKEND_DIR
install_deps $AUTH_DIR
install_deps $FRONTEND_DIR

# Função para iniciar um serviço
start_service() {
    local service_name=$1
    local dir=$2
    local command=$3
    local port=$4
    
    echo -e "${GREEN}🚀 Iniciando $service_name na porta $port...${NC}"
    cd "../$dir" && $command &
    sleep 3 # Aguarda um pouco para o serviço iniciar
}

# Criar arquivo .env.local se não existir
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Criando arquivo .env.local...${NC}"
    cp env.example .env.local
fi

# Iniciar os serviços
echo -e "${BLUE}🎯 Iniciando todos os serviços...${NC}"

# Iniciar Auth Service primeiro (porta 3000)
start_service "Auth Service" $AUTH_DIR "npm start" "3000"
echo -e "${GREEN}⏳ Aguardando Auth Service iniciar...${NC}"
sleep 5

# Iniciar Backend (Weather Service) - porta 3001
start_service "Weather Service" $BACKEND_DIR "npm run dev" "3001"
echo -e "${GREEN}⏳ Aguardando Weather Service iniciar...${NC}"
sleep 5

# Iniciar API Gateway - porta 3002
start_service "API Gateway" $GATEWAY_DIR "npm run dev" "3002"
echo -e "${GREEN}⏳ Aguardando API Gateway iniciar...${NC}"
sleep 5

# Iniciar Frontend - porta 3002 (Next.js)
echo -e "${GREEN}🚀 Iniciando Frontend...${NC}"
npm run dev

# Se o frontend for fechado, mata os outros processos
echo -e "${YELLOW}🛑 Encerrando todos os serviços...${NC}"
pkill -f "npm run dev"
pkill -f "npm start"
