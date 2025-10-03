const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();
const { generatePDFTicket } = require('../utils/generateTicket');

router.post('/generate-ticketPDF', (req, res) => {
    const { NextID, type, ReceiptID, SaleID } = req.body;
    const htmlPath = path.resolve(__dirname, '..', 'public', 'templates', 'template-ticket.html');
    const fileReceipt = type === 'sale' ?
        `${type}-${NextID}` : `${type}-${NextID}-${ReceiptID}-${SaleID}`;
    const outputPath = path.resolve(__dirname, '..', 'data', 'tickets', `${fileReceipt}.pdf`); // usa resolve

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
        res.json({ message: 'PDF generado correctamente', file: `/tickets/${fileReceipt}.pdf` });
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

router.get('/get-ticketPDF', (req, res) => {
    const { id } = req.query;
    console.log("Consulta recibida:", { id });

    if (!id) {
        return res.status(400).json({ message: 'Faltan parámetros: id.' });
    }

    const filePatternSale = `sale-${id}`;
    const filePatternPayment = `-${id}`;
    const ticketsDir = path.resolve(__dirname, '..', 'data', 'tickets');

    try {
        const files = fs.readdirSync(ticketsDir);

        // Busca el archivo de venta (único)
        const matchedFileSale = files.find(file => file.startsWith(filePatternSale) && file.endsWith('.pdf'));

        // Busca TODOS los archivos de pago relacionados con el ID
        const matchedFilesPayment = files.filter(file => file.startsWith('payment') && file.endsWith(`${filePatternPayment}.pdf`));

        //console.log("Archivo de venta:", matchedFileSale);
        //console.log("Archivos de pago:", matchedFilesPayment);

        if (matchedFileSale || matchedFilesPayment.length > 0) {
            const urls = [];

            if (matchedFileSale) {
                urls.push(`/tickets/${matchedFileSale}`);
            }

            if (matchedFilesPayment.length > 0) {
                urls.push(...matchedFilesPayment.map(file => `/tickets/${file}`));
            }

            return res.json({ 
                message: 'Archivos encontrados.', 
                urls 
            });
        } else {
            return res.status(404).json({ message: 'Archivos PDF no encontrados.' });
        }
    } catch (err) {
        console.error("Error leyendo carpeta de tickets:", err);
        return res.status(500).json({ message: 'Error interno al buscar archivo PDF' });
    }
});

module.exports = router;