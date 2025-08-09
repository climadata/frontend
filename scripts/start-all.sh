#!/bin/bash

# Script para iniciar todos os serviços: Frontend, API Gateway e Backend

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Diretórios dos serviços (relativos ao diretório pai)
FRONTEND_DIR="frontend"
GATEWAY_DIR="api-gateway"
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
echo "Verificando diretórios..."
check_directory $GATEWAY_DIR || exit 1
check_directory $BACKEND_DIR || exit 1

# Instalar dependências
install_deps $GATEWAY_DIR
install_deps $BACKEND_DIR
install_deps $FRONTEND_DIR

# Função para iniciar um serviço
start_service() {
    local service_name=$1
    local dir=$2
    local command=$3
    
    echo -e "${GREEN}Iniciando $service_name...${NC}"
    cd "../$dir" && $command &
    sleep 2 # Aguarda um pouco para o serviço iniciar
}

# Criar arquivo .env.local se não existir
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Criando arquivo .env.local...${NC}"
    cp env.example .env.local
fi

# Iniciar os serviços
echo "Iniciando todos os serviços..."

# Iniciar Backend primeiro
start_service "Backend (Weather Service)" $BACKEND_DIR "npm run dev"
echo -e "${GREEN}Aguardando Backend iniciar...${NC}"
sleep 5

# Iniciar API Gateway
start_service "API Gateway" $GATEWAY_DIR "npm run dev"
echo -e "${GREEN}Aguardando API Gateway iniciar...${NC}"
sleep 5

# Iniciar Frontend
echo -e "${GREEN}Iniciando Frontend...${NC}"
npm run dev

# Se o frontend for fechado, mata os outros processos
echo -e "${YELLOW}Encerrando todos os serviços...${NC}"
pkill -f "npm run dev"
