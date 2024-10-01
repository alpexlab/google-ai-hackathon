DEV_DOCKER_COMPOSE := "docker/dev.docker-compose.yml"
PROD_DOCKER_COMPOSE := "docker/prod.docker-compose.yml"

run:
	docker compose -f $(DEV_DOCKER_COMPOSE) up --build -d

up:
	docker compose -f $(DEV_DOCKER_COMPOSE) up -d

down:
	docker compose -f $(DEV_DOCKER_COMPOSE) down

logs:
	docker logs -f frontend

shell:
	docker exec -it frontend sh

script:
	docker exec -it frontend $(cmd)

lint:
	docker exec -it frontend npm run lint

prettier:
	docker exec -it frontend npm run prettier

prod-up:
	docker compose -f $(PROD_DOCKER_COMPOSE) up --build -d
