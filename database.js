const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Crear la carpeta /data si no existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Crear la carpeta /routes si no existe
const routeDir = path.join(__dirname, 'routes');
if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir);
}

// Crear carpeta para los tickets
const ticketsDir = path.join(__dirname, 'data', 'tickets');
if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir);
}

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

const dbSales = new sqlite3.Database(path.join(dataDir, 'sales.db'));
dbSales.run('PRAGMA foreign_keys = ON');

// Adjuntar clients.db una sola vez aquí
dbSales.run(
    `ATTACH DATABASE '${path.join(dataDir, 'clients.db')}' AS clientsDB`,
    (err) => {
        if (err) {
            console.error("❌ Error al adjuntar clients.db:", err.message);
        } else {
            console.log("✅ clients.db adjuntada a dbSales correctamente");
        }
    }
)

// Crear tabla Sales (Ventas)
dbSales.run(`
    CREATE TABLE IF NOT EXISTS Sales (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ClientID INTEGER,
        Discount REAL,
        IVA REAL,
        Total REAL,
        Payment REAL,
        Balance REAL,
        PaymentMethod TEXT,
        PaymentDate TEXT DEFAULT (date('now','localtime')),
        Status TEXT
    )
`);

// Crea tabla UnpaidDetails (Notas pendintes por pagar)
dbSales.run(`
    CREATE TABLE IF NOT EXISTS UnpaidSales (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        SaleID INTEGER,
        Total REAL,
        Balance REAL,
        PaymentDate TEXT DEFAULT (date('now','localtime')),
        Status TEXT,
        FOREIGN KEY(SaleID) REFERENCES Sales(ID)
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
        FOREIGN KEY(SaleID) REFERENCES Sales(ID)
    )
`);

// Crea tabla SalePayments (Abonos o pagos)
dbSales.run(`
    CREATE TABLE IF NOT EXISTS SalePayments (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        SaleID INTEGER,
        ReceiptID INTEGER,
        PaymentID INTEGER,
        PaymentMethod TEXT,
        Paid REAL,
        PaymentDate TEXT DEFAULT (date('now','localtime')),
        FOREIGN KEY(SaleID) REFERENCES Sales(ID)
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
        IVA REAL,
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
            IVA REAL,
            PriceDolar REAL
        )
`);

// Crear tabla Quotations (Cotizaciones)
const dbQuotations = new sqlite3.Database(path.join(dataDir, 'quotations.db'));

dbQuotations.run(`
        CREATE TABLE IF NOT EXISTS Quotations (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            DATE TEXT DEFAULT (date('now','localtime')),
            ClientID INTEGER,
            Subtotal REAL,
            Discount REAL,
            IVA REAL,
            Total REAL,
            Products TEXT
        )
`);

// Crear tabla Materials (Registro de materiales)
const dbMaterialDispatch = new sqlite3.Database(path.join(dataDir, 'materialsDispatch.db'));

dbMaterialDispatch.run(`
    CREATE TABLE IF NOT EXISTS MaterialDispatched (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Date TEXT DEFAULT (date('now','localtime')),
        DateRegistered TEXT,
        Note INTEGER,
        Branch TEXT,
        Material TEXT,
        SphOD TEXT,
        SphOS TEXT,
        CylOD TEXT,
        CylOS TEXT,
        AxisOD INTEGER,
        AxisOS INTEGER,
        ADDOD TEXT,
        ADDOS TEXT,
        Observations TEXT
    )
`);

module.exports = { 
    dbSales, 
    dbClients, 
    dbProducts,
    dbParams,
    dbQuotations,
    dbMaterialDispatch
};