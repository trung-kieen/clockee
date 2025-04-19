# Package excutable jar file
# mvn clean package

# Usage: docker build --tag=clockee-server:latest .
# docker run -p8080:8080 clockee-server:latest
FROM openjdk:17-jdk-slim
LABEL maintainer = "trung-kieen"

WORKDIR app
COPY  target/clockee-server-*.jar clockee-server-SNAPSHOT.jar
COPY  upload upload
EXPOSE 8080:8080
ENTRYPOINT ["java", "-jar", "clockee-server-SNAPSHOT.jar"]
