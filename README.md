
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
🚧 This project is currently in progress. Video walkthrough: [YouTube Demo](https://www.youtube.com/watch?v=4C7IJjjg0o0&list=PL6XbmwursK7Zlu8Vv41GYQTuETwrh30zr&index=1)

Seed account for test environment 
- User: `user@clockee.com`/`clockee123`
- Product admin: `admin@clockee.com`/`clockee123`
- Inventory manager: `inventory@clockee.com`/`clockee123`
- Sys admin: `sys@clockee.com`/`clockee123`
