const XLSX = require("xlsx-js-style");
const path = require("path");
const express = require('express');
const router = express.Router();
const { dbMaterialDispatch } = require('../database');
const { updateStock } = require("./services/excel.services.js");

// Ruta para obtener los datos de despacho de materiales
router.get('/get-materials-dispatched', (req, res) => {
    const { branch } = req.query;
    let query = `SELECT * FROM MaterialDispatched`;
    const params = [];

    if (branch !== 'all') {
        query += ` WHERE Branch = ?`;
        params.push(branch);
    }

    dbMaterialDispatch.all(query, params, (err, rows) => {
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

// Ruta para exportar a excel los datos consultados
router.post('/export-to-excel', (req, res) => {
    const { branch, rows } = req.body;

    if (!rows || !Array.isArray(rows)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    const branchName = branch || "Todas";
    const today = new Date().toLocaleDateString("es-MX");

    // Título
    XLSX.utils.sheet_add_aoa(worksheet, [
        ["REPORTE DE DESPACHO DE MATERIAL"]
    ], { origin: "A1" });

    worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } }
    ];

    // Subtítulos
    XLSX.utils.sheet_add_aoa(worksheet, [
        [`Sucursal: ${branchName}`],
        [`Fecha de reporte: ${today}`],
        []
    ], { origin: "A3" });

    // Encabezados
    const headers = [
        "Fecha",
        "Sucursal",
        "No. Nota",
        "Material",
        "Esfera OD",
        "Cilindro OD",
        "Eje OD",
        "ADD OD",
        "Esfera OI",
        "Cilindro OI",
        "Eje OI",
        "ADD OI",
        "Observaciones"
    ];

    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A6" });

    // Datos (YA NO CONSULTAMOS BD)
    const dataStartRow = 6;

    rows.forEach((row, index) => {
        const rowData = [
            row.DateRegistered,
            row.Branch,
            row.Note,
            row.Material,
            row.SphOD,
            row.CylOD,
            row.AxisOD,
            row.ADDOD,
            row.SphOS,
            row.CylOS,
            row.AxisOS,
            row.ADDOS,
            row.Observations
        ];

        XLSX.utils.sheet_add_aoa(worksheet, [rowData], {
            origin: { r: dataStartRow + index, c: 0 }
        });
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Despacho");

    // GENERAR BUFFER EN MEMORIA
    const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx"
    });

    // Enviar como archivo sin guardarlo
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=ReporteMateriales_${today.replace(/\//g, "-")}.xlsx`
    );

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
});

//* Ruta para modificar en el excel el materiar surtido
router.post('/update-stock', (req, res) => {
    const { sph, cyl, sheet } = req.body;
    const filePath = path.join(__dirname, "micas.xlsx");

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[sheet.index]];

    const updatedCell = updateStock(worksheet, sph, cyl, { 
        row: sheet.row, 
        col: sph.includes("-") ? sheet.minus.col : sheet.plus.col
    });

    if (!updatedCell) {
        return res.status(404).json({
            success: false,
            message: "No se encontró la combinación sph/cyl"
        });
    }

    XLSX.writeFile(workbook, filePath);

    res.json({
        success: true,
        cell: updatedCell
    });
});

module.exports = router;