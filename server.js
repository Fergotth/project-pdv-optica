const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const salesRoutes = require('./routes/salesDB');
const clientsRoutes = require('./routes/clientsDB');
const productsRoutes = require('./routes/productsDB');
const paramsRoutes = require('./routes/paramsDB');

const app = express();

app.use(bodyParser.json());

app.use(salesRoutes);
app.use(clientsRoutes);
app.use(productsRoutes);
app.use(paramsRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Servidor escuchando
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});