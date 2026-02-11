const express = require('express');
const router = express.Router();
const { dbMaterialDispatch } = require('../database');

// Ruta para obtener los datos de despacho de materiales
router.get('/get-materials-dispatched', (req, res) => {
    dbMaterialDispatch.all(`SELECT * FROM MaterialDispatch`, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener despachos:', err.message);
            return res.status(500).json({ error: 'Error al obtener los despachos de materiales' });
        }
        res.json(rows);
    });
});

// Ruta para guardar un nuevo despacho de material
router.post('/save-material-dispatched', (req, res) => {
    const { SphOD, SphOS, CylOD, CylOS, AxisOD, AxisOS, ADDOD, ADDOS, DateRegistered, Branch, Material, Observations, Note } = req.body;
    const query = `
        INSERT INTO MaterialDispatched (SphOD, SphOS, CylOD, CylOS, AxisOD, AxisOS, ADDOD, ADDOS, DateRegistered, Branch, Material, Observations, Note)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [SphOD, SphOS, CylOD, CylOS, AxisOD, AxisOS, ADDOD, ADDOS, DateRegistered, Branch, Material, Observations, Note];
    dbMaterialDispatch.run(query, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

module.exports = router;