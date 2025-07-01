const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Crear la carpeta /data si no existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbSales = new sqlite3.Database(path.join(dataDir, 'sales.db'));
dbSales.run('PRAGMA foreign_keys = ON');

// Crear tabla Sales (Ventas)
dbSales.run(`
    CREATE TABLE IF NOT EXISTS Sales (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ClientID INTEGER,
        Total REAL,
        Payment REAL,
        Balance REAL,
        PaymentMethod TEXT,
        Date TEXT DEFAULT (date('now','localtime')),
        Status TEXT
    )
`);

// Crear tabla SaleDetails (Detalles de Venta)
dbSales.run(`
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

const dbClients = new sqlite3.Database(path.join(dataDir, 'clients.db'));

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

const dbProducts = new sqlite3.Database(path.join(dataDir, 'products.db'));
dbClients.run('PRAGMA foreign_keys = ON');

// Crear tabla Products (Productos)
dbProducts.run(`
    CREATE TABLE IF NOT EXISTS Products (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        DATE TEXT DEFAULT (date('now','localtime')),
        SKU TEXT,
        Category TEXT,
        Description TEXT,
        PriceExcludingIVA REAL,
        PriceIncludingIVA REAL,
        NetProfit REAL,
        SalePrice REAL,
        Stock INTEGER,
        Image TEXT
    )
`);

// Crear tabla ProductsDetails (Detalles del producto)
dbProducts.run(`
    CREATE TABLE IF NOT EXISTS ProductDetails (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        SKU TEXT,
        Movement TEXT,
        DATE TEXT DEFAULT (date('now','localtime')),
        FOREIGN KEY(SKU) REFERENCES Products(SKU)
    )
`);

// Crear tabla params (Configuraciones del sistema, datos basicos)
const dbParams = new sqlite3.Database(path.join(dataDir, 'params.db'));

dbParams.run(`
        CREATE TABLE IF NOT EXISTS Params (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            IVA REAL
            PriceDolar REAL
        )
`);

module.exports = { 
    dbSales, 
    dbClients, 
    dbProducts,
    dbParams
};