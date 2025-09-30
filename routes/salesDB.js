// routes/sales.js
const express = require('express');
//const path = require('path')
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
    const { SaleID, PaymentMethod, Paid, ReceiptID } = req.body;
    dbSales.run(
        `INSERT INTO SalePayments (SaleID, PaymentMethod, Paid, ReceiptID) VALUES (?, ?, ?, ?)`,
        [SaleID, PaymentMethod, Paid, ReceiptID],
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

// Devuelve el ultimo ID para el siguiente recibo de algun abono
router.get('/find-paymentsNextReceipt', (req, res) => {
    const SaleID = req.query.q;

    const sql = `
        SELECT COALESCE(MAX(ReceiptID), 0) + 1 AS NextReceiptID
        FROM SalePayments
        WHERE SaleID = ?
    `;

    dbSales.get(sql, [SaleID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row); // { NextReceiptID: valor }
    });
});

// Obtener siguiente ID de venta
router.get('/find-nextPaymentID', (req, res) => {
    dbSales.get(`SELECT seq FROM sqlite_sequence WHERE name = 'SalePayments'`, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        const nextID = row ? row.seq + 1 : 1;
        res.json({ nextID });
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

// Obtener siguiente ID de venta
router.get('/find-nextSaleID', (req, res) => {
    dbSales.get(`SELECT seq FROM sqlite_sequence WHERE name = 'Sales'`, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        const nextID = row ? row.seq + 1 : 1;
        res.json({ nextID });
    });
});

// Obtener saldo pendiente de una nota por ID
router.get('/find-unpaidSale', (req, res) => {
    const ID = req.query.q;

    if (!ID) return res.status(400).json({ error: 'Falta el ID de la venta.' });

    dbSales.get(`
        SELECT 
            s.ID AS SaleID,
            s.ClientID,
            IFNULL(c.Name, 'Público General') AS ClientName,
            s.Total,
            IFNULL(u.Balance, 0) AS Balance,
            s.PaymentDate,
            s.Status
        FROM Sales s
        LEFT JOIN clientsDB.Clients c 
            ON s.ClientID = c.ID
        LEFT JOIN UnpaidSales u 
            ON s.ID = u.SaleID
        WHERE s.ID = ?
    `, [ID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
});

// Actualizar status de nota de venta
router.post('/update-statusSale', (req, res) => {
    const { SaleID, Status } = req.body;

    if (!SaleID) return res.status(400).json({ error: 'Falta el ID de la nota.' });
    if (Status === undefined) return res.status(400).json({ error: 'Falta el Status.' });

    dbSales.run(
        'UPDATE Sales SET Status = ? WHERE ID = ?',
        [Status, SaleID], function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Error al actualizar la venta' });
            }

            if (this.changes === 0) return res.status(404).json({ error: 'Venta no encontrada' });

            res.json({ success: true, updated: this.changes });
        }
    );
});

// Actualizar saldo de nota pendiente
router.post('/update-unpaidNote', (req, res) => {
    const { Balance, SaleID, Status } = req.body;

    if (!SaleID) return res.status(400).json({ error: 'Falta el ID de la nota' });
    if (Balance === undefined) return res.status(400).json({ error: 'Falta el valor del saldo' });
    if (!Status) return res.status(400).json({ error: 'Falta el valor del Status' });

    dbSales.run('UPDATE UnpaidSales SET Balance = ?, Status = ? WHERE SaleID = ?', 
        [Balance, Status, SaleID], function(err) {
            if (err) return console.error(err.message);
            
            // this.changes indica cuántas filas fueron afectadas
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Nota no encontrada' });
            }

            res.json({ success: true, updated: this.changes });
        }
    );
});

module.exports = router;