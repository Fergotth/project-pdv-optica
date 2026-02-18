const ExcelJS = require('exceljs');
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
router.post('/export-to-excel', async (req, res) => {
    const { branch, rows } = req.body;

    if (!rows || !Array.isArray(rows)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Despacho");

    const branchName = branch || "Todas";
    const today = new Date().toLocaleDateString("es-MX");

    // TÍTULO
    worksheet.mergeCells('A1:M1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = "REPORTE DE DESPACHO DE MATERIAL";
    titleCell.font = { size: 14, bold: true };
    titleCell.alignment = { horizontal: 'center' };

    // SUBTÍTULOS
    worksheet.getCell('A3').value = `Sucursal: ${branchName}`;
    worksheet.getCell('A4').value = `Fecha de reporte: ${today}`;

    // ENCABEZADOS (fila 6)
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

    const headerRow = worksheet.getRow(6);
    headers.forEach((header, index) => {
        const cell = headerRow.getCell(index + 1);
        cell.value = header;
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center' };
    });

    // DATOS (desde fila 7)
    rows.forEach((row, index) => {
        const dataRow = worksheet.getRow(7 + index);

        dataRow.values = [
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
    });

    // 🟢 AJUSTAR ANCHO AUTOMÁTICO
    worksheet.columns.forEach(column => {
        let maxLength = 10;
        column.eachCell({ includeEmpty: true }, cell => {
            const length = cell.value ? cell.value.toString().length : 10;
            if (length > maxLength) {
                maxLength = length;
            }
        });
        column.width = maxLength + 2;
    });

    // GENERAR BUFFER
    const buffer = await workbook.xlsx.writeBuffer();

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
router.post('/update-stock', async (req, res) => {
    const { sph, cyl, sheet } = req.body;
    const filePath = path.join(__dirname, "micas.xlsx");

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[sheet.index];

    const updatedCell = updateStock(
        worksheet,
        sph,
        cyl,
        sph.includes("-") || sph === "0.00"
            ? sheet.minus
            : sheet.plus
    );

    if (!updatedCell) {
        return res.status(404).json({
            success: false,
            message: "No se encontró la combinación sph/cyl"
        });
    }

    await workbook.xlsx.writeFile(filePath);

    res.json({
        success: true,
        cell: updatedCell
    });
});

module.exports = router;