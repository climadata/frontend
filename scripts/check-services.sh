#!/bin/bash

# Script para verificar se todos os serviços estão rodando

echo "🔍 Verificando status dos serviços..."

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    local service=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "$service está rodando na porta $port"
        return 0
    else
        echo "$service NÃO está rodando na porta $port"
        return 1
    fi
}

# Verificar cada serviço
frontend_ok=false
gateway_ok=false
backend_ok=false

check_port 3000 "Frontend" && frontend_ok=true
check_port 8080 "API Gateway" && gateway_ok=true
check_port 8081 "Backend" && backend_ok=true

echo ""
echo "Resumo:"

if [ "$frontend_ok" = true ] && [ "$gateway_ok" = true ] && [ "$backend_ok" = true ]; then
    echo "Todos os serviços estão rodando!"
    echo "Acesse: http://localhost:3000"
else
    echo "Alguns serviços não estão rodando:"
    [ "$frontend_ok" = false ] && echo "   - Frontend (porta 3000)"
    [ "$gateway_ok" = false ] && echo "   - API Gateway (porta 8080)"
    [ "$backend_ok" = false ] && echo "   - Backend (porta 8081)"
    echo ""
    echo "Para iniciar os serviços:"
    echo "   - Frontend: npm run dev"
    echo "   - API Gateway: (no diretório do gateway) npm run dev"
    echo "   - Backend: (no diretório do backend) npm run dev"
fi
