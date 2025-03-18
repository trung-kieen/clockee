IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'clockeedb')
BEGIN
    CREATE DATABASE clockeedb;
    PRINT 'clockeedb created';
END
ELSE
BEGIN
    PRINT 'clockeedb fail to create';
END
GO
