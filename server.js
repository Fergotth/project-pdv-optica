const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { dbSales, dbClients, dbProducts, dbParams } = require('./database');
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
    
    dbSales.run(
        `INSERT INTO SaleDetails (SaleID, Quantity, Product, SKU, Price, Discount, IVA) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [SaleID, Quantity, Product, SKU, Price, Discount, IVA],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Buscar alguna venta por ID
app.get('/find-sale', (req, res) => {
    const ID = req.query.q;
    const SQLStr = 'SELECT * FROM Sales WHERE ID = ?';

    dbSales.all(SQLStr, [ID], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

// Busca el ultimo ID de la BD de sales para devolver el proximo
app.get('/find-nextSaleID', (req, res) => {
    const SQLStr = "SELECT seq FROM sqlite_sequence WHERE name = 'Sales'";

    dbSales.get(SQLStr, (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }

        const nextID = row ? row.seq + 1 : 1;
        res.json({ nextID });
    });
});

// Agregar nuevo producto
app.post('/save-products', (req, res) => {
    const { SKU, Category, Description, PriceExcludingIVA, PriceIncludingIVA, NetProfit, SalePrice, Stock, Image } = req.body;

    dbProducts.run(
        `INSERT INTO Products (SKU, Category, Description, PriceExcludingIVA, 
        PriceIncludingIVA, NetProfit, SalePrice, Stock, Image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [SKU, Category, Description, PriceExcludingIVA, PriceIncludingIVA, NetProfit, SalePrice, Stock, Image],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json ({ id: this.lastID });
        }
    );
});

// Obtener todos los productos
app.get('/get-products', (req, res) => {
    const SQLStr = 'SELECT * FROM Products';
    
    dbProducts.all(SQLStr, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

// Agregar los detalles del producto
app.post('/save-productsDetails', (req, res) => {
    const { SKU } = req.body;

    dbProducts.run(
        `INSERT INTO ProductDetails (SKU, Movement) VALUES (?, ?)`,
            [SKU, 'Alta'],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json ({ id: this.lastID });
            }
    );
});

// Obtener SKU del articulo a buscar
app.get('/find-article', (req, res) => {
    const SQLStr = 'SELECT * FROM Products WHERE SKU = ?';
    
    dbProducts.all(SQLStr, [req.query.q], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

// Agregar el porcentaje del IVA y valor del dolar
app.post('/save-params', (req, res) => {
    const { ID, IVA, PriceDolar } = req.body;

    dbParams.run(
        `INSERT INTO Params (ID, IVA, PriceDolar) VALUES (?, ?, ?)
        ON CONFLICT(ID) DO UPDATE SET 
        IVA = excluded.IVA, PriceDolar = excluded.PriceDolar`,
        [ID, IVA || 0, PriceDolar || 0],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Obtener todos los parametros
app.get('/get-params', (req, res) => {
    const SQLStr = 'SELECT * FROM Params';
    
    dbParams.all(SQLStr, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

// Servidor escuchando
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});