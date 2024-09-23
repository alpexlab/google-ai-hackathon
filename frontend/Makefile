DEV_DOCKER_COMPOSE := "docker/dev.docker-compose.yml"

run:
	docker compose -f $(DEV_DOCKER_COMPOSE) up --build -d

up:
	docker compose -f $(DEV_DOCKER_COMPOSE) up -d

down:
	docker compose -f $(DEV_DOCKER_COMPOSE) down

logs:
	docker logs -f alpexlab_frontend

shell:
	docker exec -it alpexlab_frontend sh

script:
	docker exec -it alpexlab_frontend $(cmd)

lint:
	docker exec -it alpexlab_frontend npm run lint

prettier:
	docker exec -it alpexlab_frontend npm run prettier
