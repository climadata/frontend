#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento completo
# Frontend + API Gateway + Backend

echo "Iniciando ambiente de desenvolvimento..."

# Verificar se as variáveis de ambiente estão configuradas
if [ ! -f .env.local ]; then
    echo "Arquivo .env.local não encontrado!"
    echo "Criando arquivo .env.local baseado no env.example..."
    cp env.example .env.local
    echo "Arquivo .env.local criado!"
fi

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo " Node.js não está instalado!"
    exit 1
fi

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi

echo "Iniciando o frontend..."
echo "URLs dos serviços:"
echo "   - Frontend: http://localhost:3000"
echo "   - API Gateway: http://localhost:8080"
echo "   - Backend: http://localhost:8081"
echo ""
echo "Certifique-se de que o API Gateway e Backend estão rodando!"
echo ""

# Iniciar o frontend
npm run dev
