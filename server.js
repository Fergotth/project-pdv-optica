const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { dbSales, dbClients, dbProducts, dbSalesDetails } = require('./database');
const app = express();

app.use(bodyParser.json());

// Agregar un cliente
app.post('/save-clients', (req, res) => {
    const { Name, Phone, Birthdate, Email, Comments } = req.body;
    dbClients.run(
        `INSERT INTO Clients (Name, Phone, Birthdate, Email, Comments) VALUES (?, ?, ?, ?, ?)`,
        [Name, Phone, Birthdate, Email, Comments],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Obtener clientes por nombre o fecha de nacimiento
app.get('/get-clients', (req, res) => {
    const typeOfParam = req.query.q; // Por ejemplo, ?q=Pedro o ?q=2023-12-01

    if (!typeOfParam) {
        return res.status(400).json({ error: 'Falta el parámetro de búsqueda.' });
    }

    const SQLStr = isNaN(Date.parse(typeOfParam))
        ? 'SELECT * FROM Clients WHERE LOWER(Name) LIKE LOWER(?)'
        : 'SELECT * FROM Clients WHERE Birthdate = ?';

    const param = isNaN(Date.parse(typeOfParam))
        ? `%${typeOfParam}%`
        : `${typeOfParam}`;

    dbClients.all(SQLStr, [param], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

// Agregar un producto
app.post('/save-products', (req, res) => {
    const { SKU, Category, Description, Price, Stock, Image } = req.body;
    dbProducts.run(
        `INSERT INTO Products (SKU, Category, Description, Price, Stock, Image) VALUES (?, ?, ?, ?, ?, ?)`,
        [SKU, Category, Description, Price, Stock, Image],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Agregar una venta
app.post('/save-sales', (req, res) => {
    const { ClientID, Total, Payment, Balance, PaymentMethod, Status } = req.body;
    dbSales.run(
        `INSERT INTO Sales (ClientID, Total, Payment, Balance, PaymentMethod, Status) VALUES (?, ?, ?, ?, ?, ?)`,
        [ClientID, Total, Payment, Balance, PaymentMethod, Status],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Agregar detalle de venta
app.post('/save-saledetails', (req, res) => {
    const { SaleID, Quantity, Product, SKU, Price, Discount, IVA } = req.body;
    
    dbSalesDetails.run(
        `INSERT INTO SaleDetails (SaleID, Quantity, Product, SKU, Price, Discount, IVA) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [SaleID, Quantity, Product, SKU, Price, Discount, IVA],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Agregar nuevo producto
app.post('/save-products', (req, res) => {
    const { SKU, Category, Description, PriceExcludingIVA, PriceIncludingIVA, NetProfit, Stock, Status, Image } = req.body;

    dbProducts.run(
        `INSERT INTO Products (Date, SKU, Category, Description, PriceExcludingIVA, 
        PriceIncludingIVA, NetProfit, Stock, Status, Image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json ({ id: this.lastID });
        }
    );
});

app.use(express.static(path.join(__dirname, 'public')));

// Servidor escuchando
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});