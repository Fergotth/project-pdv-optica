import { getDataProductDB } from "./getData.js";

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