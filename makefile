build:
	- git pull
	- docker-compose -f compose.prod.yaml up --build

stop:
	- docker-compose stop
