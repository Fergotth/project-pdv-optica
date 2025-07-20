const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function crearTicket(datos = {}) {
  return new Promise((resolve, reject) => {
    const ticketsDir = path.join(process.cwd(), 'data', 'tickets');
    const filePath = path.join(ticketsDir, 'ticket.pdf');

    fs.mkdir(ticketsDir, { recursive: true }, (err) => {
      if (err) return reject(err);

      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(25).text('Ticket generado en Node.js', 100, 100);
      doc.text(`Cliente: ${datos.cliente || 'No definido'}`, 100, 150);
      doc.text(`Total: $${datos.total || '0.00'}`, 100, 180);

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    });
  });
}

module.exports = crearTicket;