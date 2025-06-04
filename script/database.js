const sqlite3 = require('sqlite3').verbose();
const dbSales = new sqlite3.Database('./data/sales.db');
const dbClients = new sqlite3.Database('./data/clients.db');

// Crear la tabla Clientes
dbClients.run(`
CREATE TABLE IF NOT EXISTS Clients (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Phone TEXT,
        Birthdate TEXT,
        Email TEXT,
        Comments TEXT
    )
`);

// Crear tabla Notas
dbSales.run(`
    CREATE TABLE IF NOT EXISTS Sales (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ClientID INTEGER,
        Total REAL,
        Payment REAL,
        Balance REAL,
        PaymentMethod TEXT,
        Date TEXT,
        Status TEXT
    )
`);

// Crear tabla Articulos
dbSales.run(`
    CREATE TABLE IF NOT EXISTS SaleDetails (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NoTicket INTEGER,
        Quantity INTEGER,
        Article TEXT,
        SKU TEXT,
        Price REAL,
        Discount REAL,
        IVA REAL,
        FOREIGN KEY(NoTicket) REFERENCES Sales(ID)
    )
`);

module.exports = { dbSales, dbClients };