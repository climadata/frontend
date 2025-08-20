# Makefile para o projeto clima-data frontend

# Variáveis
DOCKER_IMAGE = clima-data-frontend
CONTAINER_NAME = clima-data-frontend
PORT = 3000
DOCKER_TAG = latest

# Cores para output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

# Comandos padrão
.PHONY: help build run stop clean restart logs shell test dev install lint

# Comando padrão
help: ## Mostra esta ajuda
	@echo "$(GREEN)Comandos disponíveis:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

# Comandos de desenvolvimento
dev: ## Inicia o servidor de desenvolvimento
	@echo "$(GREEN) Iniciando servidor de desenvolvimento$(NC)"
	npm run dev

install: ## Instala as dependências
	@echo "$(GREEN)Instalando dependências$(NC)"
	npm install

lint: ## Executa o linter
	@echo "$(GREEN)Executando linter$(NC)"
	npm run lint

# Comandos Docker
build: ## Constrói a imagem Docker
	@echo "$(GREEN) Construindo imagem Docker$(NC)"
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .
	@echo "$(GREEN) Build concluído!$(NC)"

run: ## Executa o container
	@echo "$(GREEN) Iniciando container$(NC)"
	@if [ $$(docker ps -q -f name=$(CONTAINER_NAME)) ]; then \
		echo "$(YELLOW)  Container já está rodando!$(NC)"; \
		make logs; \
	else \
		docker run -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(DOCKER_IMAGE):$(DOCKER_TAG); \
		echo "$(GREEN) Container iniciado na porta $(PORT)$(NC)"; \
		echo "$(GREEN) Acesse: http://localhost:$(PORT)$(NC)"; \
	fi

stop: ## Para o container
	@echo "$(YELLOW) Parando container$(NC)"
	@if [ $$(docker ps -q -f name=$(CONTAINER_NAME)) ]; then \
		docker stop $(CONTAINER_NAME); \
		echo "$(GREEN) Container parado!$(NC)"; \
	else \
		echo "$(YELLOW) Container não está rodando$(NC)"; \
	fi

restart: stop run ## Reinicia o container

clean: ## Remove container e imagem
	@echo "$(RED) Limpando containers e imagens$(NC)"
	@if [ $$(docker ps -aq -f name=$(CONTAINER_NAME)) ]; then \
		docker stop $(CONTAINER_NAME) 2>/dev/null || true; \
		docker rm $(CONTAINER_NAME); \
	fi
	@if [ $$(docker images -q $(DOCKER_IMAGE):$(DOCKER_TAG)) ]; then \
		docker rmi $(DOCKER_IMAGE):$(DOCKER_TAG); \
	fi
	@echo "$(GREEN) Limpeza concluída!$(NC)"

logs: ## Mostra os logs do container
	@echo "$(GREEN) Logs do container:$(NC)"
	@if [ $$(docker ps -q -f name=$(CONTAINER_NAME)) ]; then \
		docker logs -f $(CONTAINER_NAME); \
	else \
		echo "$(RED) Container não está rodando$(NC)"; \
	fi

shell: ## Acessa o shell do container
	@echo "$(GREEN) Acessando shell do container$(NC)"
	@if [ $$(docker ps -q -f name=$(CONTAINER_NAME)) ]; then \
		docker exec -it $(CONTAINER_NAME) /bin/sh; \
	else \
		echo "$(RED) Container não está rodando$(NC)"; \
	fi

status: ## Mostra o status do container
	@echo "$(GREEN) Status do container:$(NC)"
	@if [ $$(docker ps -q -f name=$(CONTAINER_NAME)) ]; then \
		echo "$(GREEN) Container está rodando$(NC)"; \
		docker ps -f name=$(CONTAINER_NAME); \
		echo "$(GREEN) URL: http://localhost:$(PORT)$(NC)"; \
	else \
		echo "$(YELLOW) Container não está rodando$(NC)"; \
	fi

# Comandos combinados
build-run: build run ## Constrói e executa o container

rebuild: clean build run ## Reconstrói tudo do zero

test-build: build ## Testa o build sem executar
	@echo "$(GREEN) Testando build$(NC)"
	docker run --rm -p $(PORT):$(PORT) $(DOCKER_IMAGE):$(DOCKER_TAG) &
	@sleep 5
	@if curl -f http://localhost:$(PORT) > /dev/null 2>&1; then \
		echo "$(GREEN) Teste passou! Aplicação está respondendo$(NC)"; \
	else \
		echo "$(RED) Teste falhou! Aplicação não está respondendo$(NC)"; \
	fi
	@docker stop $$(docker ps -q --filter ancestor=$(DOCKER_IMAGE):$(DOCKER_TAG)) 2>/dev/null || true

# Comandos de produção
deploy-build: ## Build otimizado para produção
	@echo "$(GREEN) Build para produção$(NC)"
	docker build --target runner -t $(DOCKER_IMAGE):production .
	@echo "$(GREEN) Build de produção concluído!$(NC)"

# Comandos de limpeza
clean-all: ## Remove todos os containers e imagens do Docker
	@echo "$(RED) Limpeza completa do Docker $(NC)"
	docker system prune -af --volumes
	@echo "$(GREEN) Limpeza completa concluída!$(NC)"

# Comandos de informação
size: ## Mostra o tamanho da imagem
	@echo "$(GREEN) Tamanho da imagem:$(NC)"
	@if [ $$(docker images -q $(DOCKER_IMAGE):$(DOCKER_TAG)) ]; then \
		docker images $(DOCKER_IMAGE):$(DOCKER_TAG); \
	else \
		echo "$(YELLOW) Imagem não encontrada. Execute 'make build' primeiro$(NC)"; \
	fi

inspect: ## Inspeciona a imagem Docker
	@echo "$(GREEN)Inspecionando imagem$(NC)"
	@if [ $$(docker images -q $(DOCKER_IMAGE):$(DOCKER_TAG)) ]; then \
		docker inspect $(DOCKER_IMAGE):$(DOCKER_TAG); \
	else \
		echo "$(YELLOW) Imagem não encontrada. Execute 'make build' primeiro$(NC)"; \
	fi
