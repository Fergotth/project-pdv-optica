const express = require('express');
const path = require('path');
const router = express.Router();
const { generatePDFTicket } = require('../utils/generateTicket');

router.post('/generate-ticket', (req, res) => {
    const { NextID } = req.body;
    const htmlPath = path.resolve(__dirname, '..', 'public', 'templates', 'template-ticket.html');
    const outputPath = path.resolve(__dirname, '..', 'data', 'tickets', `ticket-${NextID}.pdf`); // usa resolve

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
        res.json({ message: 'PDF generado correctamente', file: `/tickets/ticket-${NextID}.pdf` });
    });
});

module.exports = router;