import { getDataProductDB } from './getData.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { newAlert } from '../utils/alerts.js';

/**
 * Verifica si un SKU existe en la base de datos.
 * @param {String} SKU - El SKU del producto a verificar.
 * @returns {Promise<boolean>} - true si el SKU existe, false en caso contrario.
 */
export const existSKU = async (SKU) => {
    const data = await getDataProductDB(SKU);
    
    if (data.length > 0)
        return true;

    return false;
};

/**
 * Verifica los datos obtenidos del formulario
 * @param {Object}
 * @returns {Object || New Error}
 */
export const validateDataform = (data) => {
    const validatedData = {
        IVA: safeNumber(data.IVA),
        SKU: /^\d+$/.test(data.SKU.trim()) ? data.SKU.trim() : false,
        Category: data.Category !== "" ? data.Category : false,
        Description: data.Description.trim() ? data.Description.trim() : false,
        PriceExcludingIVA: safeNumber(data.PriceExcludingIVA),
        PriceIncludingIVA: safeNumber(data.PriceIncludingIVA),
        NetProfit: safeNumber(data.NetProfit),
        SalePrice: safeNumber(data.SalePrice),
        Stock: safeNumber(data.Stock),
        Image: data.Image
    };

    const fieldNames = {
        IVA: "IVA",
        SKU: "Código SKU",
        Category: "Categoría",
        Description: "Descripción",
        PriceExcludingIVA: "Precio sin IVA",
        PriceIncludingIVA: "Precio con IVA",
        NetProfit: "Utilidad",
        SalePrice: "Precio de venta",
        Stock: "Unidades"
    };

    for (const key in validatedData) {
        if (validatedData[key] === false) {
            newAlert({
                icon: 'info',
                title: "AVISO",
                text: `El campo "${fieldNames[key]}" no debe estar vacío o es inválido.`
            });
            throw new Error(`Campo inválido: ${key}`);
        }
    }

    return validatedData;
};