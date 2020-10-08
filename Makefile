start: dev

stop:
	docker-compose stop

kill:
	docker-compose kill

build:
	NODE_ENV=development docker-compose build

rebuild:
	NODE_ENV=development docker-compose build --no-cache

dev:
	make kill && NODE_ENV=development docker-compose up -d && make logs

prod:
	NODE_ENV=production docker-compose up -d --build && make logs

logs-db:
	docker logs wap-db -f

logs-back:
	docker logs wap-backend -f

logs-front:
	docker logs wap-frontend -f

logs:
	make logs-db & make logs-back & make logs-front

db-dump:
	db/scripts/dump.sh

db-restore:
	db/scripts/restore.sh

test-frontend:
	docker run -it wap-2_wap-frontend npm run jest

test-backend:
	docker run -it wap-2_wap-backend npm run jest

test:
	make kill && NODE_ENV=test docker-compose up -d && docker-compose exec wap-frontend npm run jest && docker-compose exec wap-backend npm run jest && make kill
