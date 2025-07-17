const express = require('express');
const router = express.Router();
const { dbProducts } = require('../database');

// Agregar nuevo producto
router.post('/save-products', (req, res) => {
    const { SKU, Category, Description, PriceExcludingIVA, PriceIncludingIVA, NetProfit, SalePrice, Stock, Image } = req.body;

    dbProducts.run(
        `INSERT INTO Products (SKU, Category, Description, PriceExcludingIVA, 
        PriceIncludingIVA, NetProfit, SalePrice, Stock, Image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [SKU, Category, Description, PriceExcludingIVA, PriceIncludingIVA, NetProfit, SalePrice, Stock, Image],
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