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

// Obtener cotizacion por id o fecha
router.get('/get-quotation', (req, res) => {
    const typeOfParam = req.query.q; // Por ejemplo, ?q=123 o ?q=2023-12-01

    if (!typeOfParam) {
        return res.status(400).json({ error: 'Falta el parámetro de búsqueda.' });
    }

    const SQLStr = isNaN(Date.parse(typeOfParam))
        ? 'SELECT * FROM Quotations WHERE ID = ?'
        : 'SELECT * FROM Quotations WHERE DATE = ?';

    dbQuotations.all(SQLStr, [typeOfParam], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
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