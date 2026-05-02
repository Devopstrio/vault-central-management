.PHONY: help build up down seed test

help:
	@echo "Vault Central Management - Management Commands"
	@echo "---------------------------------------------"
	@echo "build : Build all containers"
	@echo "up    : Start all services"
	@echo "down  : Stop all services"
	@echo "seed  : Seed initial secrets and policies"
	@echo "test  : Run security validation tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

seed:
	python scripts/create/seed_vault.py

test:
	pytest tests/
