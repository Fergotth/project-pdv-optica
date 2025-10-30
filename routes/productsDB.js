const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { dbProducts } = require('../database');

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images')); // ruta a /public/images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Subir imagen de producto
router.post('/upload-image', upload.single('image'), (req, res) => {
    try {
        // req.file contiene la información del archivo
        const imagePath = `/images/${req.file.filename}`;
        res.json({ success: true, imagePath });
    } catch (err) {
        res.status(500).json({ error: 'Error al subir imagen', details: err.message });
    }
});

// Agregar nuevo producto
router.post('/save-products', (req, res) => {
    const { SKU, Category, Description, IVA, PriceExcludingIVA, PriceIncludingIVA, NetProfit, SalePrice, Stock, Image } = req.body;

    dbProducts.run(
        `INSERT INTO Products (SKU, Category, Description, IVA, PriceExcludingIVA, 
        PriceIncludingIVA, NetProfit, SalePrice, Stock, Image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [SKU, Category, Description, IVA, PriceExcludingIVA, PriceIncludingIVA, NetProfit, SalePrice, Stock, Image],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json ({ id: this.lastID });
        }
    );
});

// Obtener todos los productos
router.get('/get-products', (req, res) => {
    const SQLStr = 'SELECT * FROM Products';
    
    dbProducts.all(SQLStr, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

// Agregar los detalles del producto
router.post('/save-productsDetails', (req, res) => {
    const { SKU } = req.body;

    dbProducts.run(
        `INSERT INTO ProductDetails (SKU, Movement) VALUES (?, ?)`,
            [SKU, 'Alta'],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json ({ id: this.lastID });
            }
    );
});

// Obtener SKU del articulo a buscar
router.get('/find-article', (req, res) => {
    const SQLStr = 'SELECT * FROM Products WHERE SKU = ?';
    
    dbProducts.all(SQLStr, [req.query.q], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

module.exports = router;