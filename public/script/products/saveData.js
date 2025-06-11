import { getDataProductForm } from "./getData.js";
import { newAlert } from "../utils/alerts.js";

/**
 * Envía los datos del producto a la URL especificada.
 * @param {string} url - Endpoint al que se enviarán los datos.
 * @param {object} data - Datos del producto.
 * @returns {Promise<boolean>} - true si la petición fue exitosa, false en caso contrario.
 */
const sendProductData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.ok;
    } catch (error) {
        console.error('Error al guardar los datos del producto: ', error);
        return false;
    }
};

export const saveProduct = async () => {
    const data = getDataProductForm();

    if (!data || !data.SKU || !data.Category) {
        newAlert({
            icon: "error",
            title: "Datos incompletos",
            text: "Por favor, completa todos los campos obligatorios."
        });
        return;
    }

    const results = await Promise.all([
        sendProductData('http://localhost:5500/save-products', data),
        sendProductData('http://localhost:5500/save-productsDetails', data)
    ]);
    
    if (results.every(success => success)) {
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
};