const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();
const { generatePDFTicket } = require('../utils/generateTicket');

router.post('/generate-ticketPDF', (req, res) => {
    const { NextID, type } = req.body;
    const htmlPath = path.resolve(__dirname, '..', 'public', 'templates', 'template-ticket.html');
    const outputPath = path.resolve(__dirname, '..', 'data', 'tickets', `${type}-${NextID}.pdf`); // usa resolve

    // Verifica que el archivo HTML existe antes de continuar
    const fs = require('fs');
    if (!fs.existsSync(htmlPath)) {
        return res.status(404).json({ message: 'Archivo de plantilla no encontrado.' });
    }

    generatePDFTicket(htmlPath, outputPath, (err, filePath) => {
        if (err) {
            console.error('Error al generar el PDF:', err);
            return res.status(500).json({ message: 'Error al generar el PDF' });
        }

        // Ruta accesible desde el navegador gracias a express.static('/tickets')
        res.json({ message: 'PDF generado correctamente', file: `/tickets/${type}-${NextID}.pdf` });
    });
});

router.post('/generate-ticketHTML', (req, res) => {
    const { html } = req.body;

    if (!html) {
        return res.status(400).json({ message: 'Faltan datos para crear el archivo HTML.' });
    }

    const htmlPath = path.resolve(__dirname, '..', 'public', 'templates', 'template-ticket.html');

    fs.writeFile(htmlPath, html, 'utf8', (err) => {
        if (err) {
            console.error('Error al guardar el archivo HTML:', err);
            return res.status(500).json({ message: 'No se pudo guardar el archivo HTML.' });
        }

        res.status(200).json({ message: 'Archivo HTML guardado correctamente.' });
    });
});

module.exports = router;