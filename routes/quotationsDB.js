const express = require('express');
const router = express.Router();
const { dbQuotations } = require('../database');

// Agregar nueva cotizacion
router.post('/save-quotation', (req, res) => {
    const { ClientID, Subtotal, Discount, IVA, Total, Products } = req.body;

    dbQuotations.run(
        `INSERT INTO Quotations (ClientID, Subtotal, Discount, IVA, Total, Products)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [ClientID, Subtotal, Discount, IVA, Total, Products],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json ({ id: this.lastID });
        }
    );
});

router.get('/get-quotation', (req, res) => {
    const param = req.query.q;

    if (!param) {
        return res.status(400).json({ error: 'Falta el parámetro de búsqueda.' });
    }

    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(param);
    const isID = /^\d+$/.test(param);

    let SQLStr = '';
    if (isID) {
        SQLStr = 'SELECT * FROM Quotations WHERE ID = ?';
    } else if (isDate) {
        SQLStr = 'SELECT * FROM Quotations WHERE DATE = ?';
    } else {
        return res.status(400).json({ error: 'Formato de parámetro no válido. Use ID numérico o fecha YYYY-MM-DD.' });
    }

    dbQuotations.all(SQLStr, [param], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
        res.json(rows || []);
    });
});


// Obtener siguiente ID
router.get('/find-nextQuotationID', (req, res) => {
    dbQuotations.get(`SELECT seq FROM sqlite_sequence WHERE name = 'Quotations'`, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        const nextID = row ? row.seq + 1 : 1;
        res.json({ nextID });
    });
});

module.exports = router;