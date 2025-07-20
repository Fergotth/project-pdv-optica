const express = require('express');
const crearTicket = require('../public/script/utils/ticket');
const router = express.Router();

router.post('/generate-ticket', async (req, res) => {
  try {
    const filePath = await crearTicket(req.body); // recibe datos desde el cliente
    res.download(filePath); // envía el archivo al cliente
  } catch (error) {
    console.error('Error al generar el ticket:', error);
    res.status(500).send('Error al generar el ticket');
  }
});

module.exports = router;