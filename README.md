
# Getting started

There are 2 way to run this project 
1. Run in local 
Setup docker and docker compose then run to start mssql and mail server service and utility services. 
```
docker compose up -d 
```
Project can be manually setup with mssql database `clockeedb` with password for `sa` is `example_123`


Running Clockee server Spring Boot with unix 
```
cd clockee-server 
make build
```
Running Clockee server Spring Boot with window 
```
cd clockee-server 
make build-window 
```

Running Clockee client Next.js with npm 
``` 
cd clockee-ui
npm install 
npm run dev 
```
# For demo 
Seed account for test environment 
- User: `user@clockee.com`/`clockee123`
- Product admin: `admin@clockee.com`/`clockee123`
- Inventory manager: `quanlykho@clockee.com`/`clockee123`
