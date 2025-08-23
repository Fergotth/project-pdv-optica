import { newAlert } from "../utils/alerts.js";
import { existSKU } from "./utils.js";
import { postData } from "../utils/postDataToDB.js";

/**
 * Guarda los datos del producto.
 * @param {Object} data - Los datos del producto a guardar.
 * @returns {Promise<void>}
 */
export const saveProduct = async (data) => {
    const requiredFields = [
        "SKU", "Category", "Description", "PriceExcludingIVA", "PriceIncludingIVA", "Stock"
    ];

    const hasMissingFields = requiredFields.some(field => !data[field]);

    // Verifica si hay campos obligatorios que no están completos
    if (hasMissingFields) {
        newAlert({
            icon: "error",
            title: "Datos incompletos",
            text: "Por favor, completa todos los campos obligatorios."
        });

        return;
    }

    if (!await existSKU(data.SKU)) {
        const results = await Promise.all([
            postData('/save-products', data),
            postData('/save-productsDetails', data)
        ]);
        
        if (results.every(Boolean)) {
            newAlert({
                icon: "success",
                title: "Alta de Artículos",
                text: "Artículo agregado correctamente."
            });
        } else {
            newAlert({
                icon: "error",
                title: "Alta de Artículo",
                text: "El artículo no se pudo agregar en ninguno de los registros."
            });
        }
    } else {
        newAlert({
            icon: "error",
            title: "ALTA",
            text: "SKU ya existe, favor de corregirlo."
        });
    }
};