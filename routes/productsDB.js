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

// Obtener los articulos para consultar
router.get('/consult-articles', (req, res) => {
    const q = req.query.q?.trim() || "";
    let SQLStr;
    let params = [];

    if (q === "") {
        SQLStr = 'SELECT * FROM Products';
    } else {
        SQLStr = `
            SELECT * FROM Products 
                WHERE LOWER(SKU) = LOWER(?) 
                OR LOWER(SKU) LIKE LOWER(?) 
                OR LOWER(Description) LIKE LOWER(?)
            `;
        params = [q, `%${q}%`, `%${q}%`];
    }

    dbProducts.all(SQLStr, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows || []);
    });
});

// Actualizar o modificar algun valor de la DB de productos
router.post('/update-stocks', (req, res) => {
    const updates = req.body;

    if (typeof updates !== 'object' || Array.isArray(updates)) {
        return res.status(400).json({ error: 'Formato inválido de datos.' });
    }

    dbProducts.serialize(() => {
        dbProducts.run('BEGIN TRANSACTION');

        const stmt = dbProducts.prepare('UPDATE Products SET Stock = Stock - ? WHERE SKU = ?');
        let errorDetected = false;

        for (const [sku, quantityChange] of Object.entries(updates)) {
            stmt.run([quantityChange, sku], (err) => {
                if (err && !errorDetected) {
                    errorDetected = true;
                    console.error(`Error actualizando SKU ${sku}:`, err.message);
                    dbProducts.run('ROLLBACK');
                    res.status(500).json({ error: `Error actualizando SKU ${sku}` });
                }
            });
        }

        stmt.finalize((err) => {
            if (errorDetected) return; // Ya se envió respuesta con error
            if (err) {
                dbProducts.run('ROLLBACK');
                console.error('Error al finalizar statement:', err.message);
                return res.status(500).json({ error: 'Error al finalizar la actualización.' });
            }

            dbProducts.run('COMMIT', (commitErr) => {
                if (commitErr) {
                    console.error('Error al confirmar la transacción:', commitErr.message);
                    return res.status(500).json({ error: 'Error al confirmar la transacción.' });
                }

                res.json({ success: true, message: 'Stocks actualizados correctamente.' });
            });
        });
    });
});

module.exports = router;