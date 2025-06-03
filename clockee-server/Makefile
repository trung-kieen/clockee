run:
	mvn spring-boot:run -Dspring.profiles.active=dev,redis

build:
	mvn spring-boot:run -Dspring.profiles.active=prod,redis

build-window:
	mvn spring-boot:run -Dspring.datasource.url=jdbc:sqlserver://localhost:1434;encrypt=true;trustServerCertificate=true;databaseName=clockeedb;useUnicode=true;characterEncoding=UTF-8

# Require docker service to perform intergration test
test:
	mvn test
