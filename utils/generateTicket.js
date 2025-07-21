const fs = require('fs');
const pdf = require('html-pdf');

async function generatePDFTicket(htmlPath, outputPath, callback) {
    const html = fs.readFileSync(htmlPath, 'utf8');

    const options = {
        format: 'A6', // Puedes usar 'Letter', 'A4', o [width, height]
        border: '5mm',
        type: 'pdf'
    };

    pdf.create(html, options).toFile(outputPath, (err, res) => {
        if (err) {
            console.error('❌ Error al generar el PDF:', err);
            if (callback) callback(err, null);
        } else {
            console.log('✅ PDF generado en:', res.filename);
            if (callback) callback(null, res.filename);
        }
    });
}

module.exports = { generatePDFTicket };