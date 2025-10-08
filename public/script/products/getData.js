import { getElement } from "../utils/getElement.js";
import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * Obtiene los datos del formulario de productos.
 * @returns {Object} // Devuelve un objeto con los datos del formulario de productos
 */
export const getDataProductForm = () => {
    try {
        const data = {
            SKU: getElement('.sku--input').value,
            Category: getElement('.category--input').value,
            Description: getElement('.description--input').value,
            PriceExcludingIVA: getElement('.pricePurchaseExcludingIVA--input').value,
            PriceIncludingIVA: getElement('.pricePurchaseIncludingIVA--input').value,
            NetProfit: getElement('.netProfit--input').textContent,
            SalePrice: getElement('.salePrice--input').value,
            Stock: getElement('.quantity--input').value,
            Image: ""
        };
    
        return data;
    } catch (error) {
        showErrorMessage(document.body, `No se puedieron obtener los datos de los articulos: ${error}`);
        console.error("No se puedieron obtener los datos de los articulos", error);
    }
};

/**
 * @param {String} article // Nombre del articulo a buscar
 * @returns {Promise<Object> || []} // Devuelve un objeto con los datos encontrar o un array vacio si no
 */
export const getDataProductDB = async (article) => {
    try {
        const response = await fetch(`/find-article?q=${encodeURIComponent(article)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        showErrorMessage(document.body, `Error al obtener datos del articulo: ${error}`);
        console.error('Error al obtener datos del articulo:', error);
        return [];
    }
};