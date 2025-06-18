
update:
	- git pull
	- docker pull trungkieen/clockee-web:1.3.0
	- docker pull trungkieen/clockee-server:1.3.0

build:
	- docker-compose -f compose.prod.yaml up --build --force-recreate

stop:
	- docker-compose stop
