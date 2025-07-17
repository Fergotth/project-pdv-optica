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

// Obtener clientes por nombre o fecha de nacimiento
router.get('/get-clients', (req, res) => {
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

module.exports = router;