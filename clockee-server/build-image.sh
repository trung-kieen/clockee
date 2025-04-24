#!/bin/bash

mvn clean package

docker build -t clockee-server:latest . && docker run -p 8080:8080 clockee-server
