import { newAlert } from "../utils/alerts.js";
import { existSKU } from "./utils.js";
import { postData } from "../utils/postDataToDB.js";
import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * Guarda los datos del producto.
 * @param {Object} data - Los datos del producto a guardar.
 * @returns {Promise<void>}
 */
export const saveProduct = async (data) => {
    if (!await existSKU(data.SKU)) {
        const results = await Promise.all([
            postData('/save-products', data),
            postData('/save-productsDetails', data)
        ]);

        const fileInput = document.querySelector('.image--input').files[0];
        if (data.Image && fileInput) {
            results.push(await saveImageProduct(fileInput));
        }
        
        if (results.every(Boolean)) {
            newAlert({
                icon: "success",
                title: "Alta de Artículos",
                text: "Artículo agregado correctamente."
            });

            return true;
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
    
    return false;
};

export const saveImageProduct = async (img) => {
    const formData = new FormData();
    formData.append('image', img);

    try {
        const response = await fetch('/upload-image', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            showErrorMessage(`Error HTTP al guardar la imagen: ${response.status}`);
            throw new Error(`Error HTTP al guardar la imagen: ${response.status}`);
        }

        const data = await response.json();
        
        return response.ok;
    } catch (error) {
        showErrorMessage(`Error al subir la imagen: ${error}`);
        console.error('Error al subir la imagen:', error);
        
        return false;
    }
};