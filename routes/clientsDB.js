const express = require('express');
const router = express.Router();
const { dbClients } = require('../database');

// Agregar un cliente
router.post('/save-clients', (req, res) => {
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

// Obtener clientes por nombre, fecha de nacimiento o ID
router.get('/get-clients', (req, res) => {
    const q = req.query.q;

    if (!q) {
        return res.status(400).json({ error: 'Falta el parámetro de búsqueda.' });
    }

    let SQLStr = '';
    let param = '';

    const isDate = !isNaN(Date.parse(q));
    const isNumeric = /^\d+$/.test(q); // solo dígitos

    if (isNumeric) {
        SQLStr = 'SELECT * FROM Clients WHERE ID = ?';
        param = q;
    } else if (isDate) {
        SQLStr = 'SELECT * FROM Clients WHERE Birthdate = ?';
        param = q;
    } else {
        SQLStr = 'SELECT * FROM Clients WHERE LOWER(Name) LIKE LOWER(?)';
        param = `%${q}%`;
    }

    dbClients.all(SQLStr, [param], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

module.exports = router;