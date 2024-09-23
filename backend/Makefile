include .env

build:
	docker compose up --build -d

up:
	docker compose up -d

shell:
	docker exec -it backend bash

migrate:
	docker exec -it backend python3 manage.py migrate

createsuperuser:
	docker exec -it backend python3 manage.py createsuperuser

db-shell:
	docker exec -it db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

logs:
	docker logs -f backend

db-logs:
	docker logs -f db

down:
	docker compose down
