#!/bin/bash

# create database first
echo "===================== Init database from script =================="
cat /scripts/init.sql
ls /opt/
# /opt/mssql-tools/bin/sqlcmd -S clockee-db -U sa -P "$1" -d master -i /scripts/init.sql -C
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$1" -Q "SELECT 1" -C -t 30 || exit 1
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "${SA_PASSWORD:-example_123}" -i /scripts/init.sql -C -t 30 || echo "not availabel mssql-tools18"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "${SA_PASSWORD:-example_123}" -i /scripts/init.sql -C -t 30 || echo "not availabel mssql-tools"

/opt/mssql-tools18/bin/sqlcmd -S 127.0.0.1 -U sa -P "${SA_PASSWORD:-example_123}" -i /scripts/init.sql -C -t 30 || echo "not availabel mssql-tools18 on ip loopback"
/opt/mssql-tools/bin/sqlcmd -S 127.0.0.1 -U sa -P "${SA_PASSWORD:-example_123}" -i /scripts/init.sql -C -t 30 || echo "not availabel mssql-tools  on ip loopback"
exit 1
