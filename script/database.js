const sqlite3 = require('sqlite3').verbose();
const dbSales = new sqlite3.Database('./data/sales.db');
const dbSalesDetails = new sqlite3.Database('./data/saleDetails.db');
const dbClients = new sqlite3.Database('./data/clients.db');
const dbProducts = new sqlite3.Database('./data/products.db');

dbSales.run('PRAGMA foreign_keys = ON');
dbSalesDetails.run('PRAGMA foreign_keys = ON');
dbClients.run('PRAGMA foreign_keys = ON');

// Crear tabla Sales (Ventas)
dbSales.run(`
    CREATE TABLE IF NOT EXISTS Sales (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ClientID INTEGER,
        Total REAL,
        Payment REAL,
        Balance REAL,
        PaymentMethod TEXT,
        Date TEXT DEFAULT (datetime('now','localtime')),
        Status TEXT,
        FOREIGN KEY(ClientID) REFERENCES Clients(ID)
    )
`);

// Crear tabla SaleDetails (Detalles de Venta)
dbSalesDetails.run(`
    CREATE TABLE IF NOT EXISTS SaleDetails (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        SaleID INTEGER,
        Quantity INTEGER,
        Product TEXT,
        SKU TEXT,
        Price REAL,
        Discount REAL,
        IVA REAL,
        FOREIGN KEY(SaleID) REFERENCES Sales(ID)
    )
`);

// Crear la tabla Clients (Clientes)
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

// Crear tabla Products (Productos)
dbProducts.run(`
    CREATE TABLE IF NOT EXISTS Products (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        SKU TEXT,
        Category TEXT,
        Description TEXT,
        Price REAL,
        Stock INTEGER,
        Image TEXT
    )
`);

module.exports = { dbSales, dbClients, dbProducts, dbSalesDetails };