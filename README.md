
# Getting started

Setup docker and docker compose then run to start mssql and mail server service 
```
docker compose up -d 
```
Project can be manually setup with mssql database `clockeedb` with password for `sa` is `example_123`


Running Clockee server Spring Boot with maven 
```
mvn spring-boot:run
```

Running Clockee client Next.js with npm 
``` 
npm install 
npm run dev 
```
# Test 
Account for test environment 
- User: `user@clockee.com`/`clockee123`
- Product admin: `admin@clockee.com`/`clockee123`
- Inventory manager: `quanlykho@clockee.com`/`clockee123`
