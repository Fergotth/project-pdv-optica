const express = require('express');
const router = express.Router();
const { dbParams } = require('../database');

// Agregar el porcentaje del IVA y valor del dolar
router.post('/save-params', (req, res) => {
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
router.get('/get-params', (req, res) => {
    const SQLStr = 'SELECT * FROM Params';
    
    dbParams.all(SQLStr, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

module.exports = router;