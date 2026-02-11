const express = require('express');
const path = require('path');

// Importar las bases de datos
const salesRoutes = require('./routes/salesDB');
const clientsRoutes = require('./routes/clientsDB');
const productsRoutes = require('./routes/productsDB');
const paramsRoutes = require('./routes/paramsDB');
const ticketRoute = require('./routes/ticketRoute');
const quotationRoute = require('./routes/quotationsDB');
const materialDispatch = require('./routes/materialDispatchDB');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tickets', express.static(path.join(__dirname, 'data/tickets')));

// Rutas de la API
app.use(ticketRoute);
app.use(salesRoutes);
app.use(clientsRoutes);
app.use(productsRoutes);
app.use(paramsRoutes);
app.use(quotationRoute);
app.use(materialDispatch);

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT} o en: http://app.pdv.local:${PORT}`);
});