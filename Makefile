# miniLab1 — Makefile
# Requer GNU Make. No Windows, use Git Bash ou WSL.
# Cada target delega para os scripts npm de backend e/ou frontend.

.PHONY: install run test format

## Instala dependências do backend e do frontend
install:
	cd backend && npm install
	cd frontend && npm install

## Inicia o backend em modo desenvolvimento (http://localhost:3001)
## Abra um segundo terminal e execute: cd frontend && npm run dev
run:
	cd backend && npm run dev

## Executa todos os testes com relatório de cobertura
test:
	cd backend && npm run test:coverage

## Formata o código-fonte (backend e frontend) com Prettier
format:
	cd backend && npx prettier --write src/ tests/
	cd frontend && npx prettier --write src/
