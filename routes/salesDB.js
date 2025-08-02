// routes/sales.js
const express = require('express');
const router = express.Router();
const { dbSales } = require('../database');

// Guardar venta
router.post('/save-sales', (req, res) => {
    const { ClientID, Discount, IVA, Total, Payment, Balance, PaymentMethod, Status } = req.body;
    dbSales.run(
        `INSERT INTO Sales (ClientID, Discount, IVA, Total, Payment, Balance, PaymentMethod, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [ClientID, Discount, IVA, Total, Payment, Balance, PaymentMethod, Status],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Guardar detalles
router.post('/save-saledetails', (req, res) => {
    const { SaleID, Quantity, Product, SKU, Price } = req.body;
    dbSales.run(
        `INSERT INTO SaleDetails (SaleID, Quantity, Product, SKU, Price) VALUES (?, ?, ?, ?, ?)`,
        [SaleID, Quantity, Product, SKU, Price],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Guardar pagos
router.post('/save-salepayments', (req, res) => {
    const { SaleID, PaymentMethod, Paid } = req.body;
    dbSales.run(
        `INSERT INTO SalePayments (SaleID, PaymentMethod, Paid) VALUES (?, ?, ?)`,
        [SaleID, PaymentMethod, Paid],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Guardar notas con saldo pendiente
router.post('/save-unpaidnotes', (req, res) => {
    const { SaleID, Total, Balance, Status } = req.body;
    dbSales.run(
        `INSERT INTO UnpaidSales (SaleID, Total, Balance, Status) VALUES (?, ?, ?, ?)`,
        [SaleID, Total, Balance, Status],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Buscar venta por ID
router.get('/find-sale', (req, res) => {
    const ID = req.query.q;
    dbSales.all(`SELECT * FROM Sales WHERE ID = ?`, [ID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

// Buscar abonos o pagos de la venta
router.get('/find-paymentsSale', (req, res) => {
    const SaleID = req.query.q;
    dbSales.all('SELECT * FROM SalePayments WHERE SaleID = ?', [SaleID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

// Buscar articulos de la venta
router.get('/find-articlesSale', (req, res) => {
    const SaleID = req.query.q;
    dbSales.all('SELECT * FROM SaleDetails WHERE SaleID = ?', [SaleID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

// Obtener siguiente ID
router.get('/find-nextSaleID', (req, res) => {
    dbSales.get(`SELECT seq FROM sqlite_sequence WHERE name = 'Sales'`, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        const nextID = row ? row.seq + 1 : 1;
        res.json({ nextID });
    });
});

module.exports = router;