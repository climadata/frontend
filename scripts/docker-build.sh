#!/bin/bash

# Script para build e execução do Docker

set -e

echo "Iniciando build do Docker"

echo "Construindo imagem Docker"
docker build -t clima-data-frontend .

echo "Build concluído"

read -p "Deseja executar o container agora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Executando container..."
    docker run -p 3000:3000 --name clima-data-frontend clima-data-frontend
fi

echo "Processo finalizado!"
