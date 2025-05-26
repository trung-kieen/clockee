
update:
	- git pull

build:
	- docker-compose -f compose.prod.yaml up --build

stop:
	- docker-compose stop
