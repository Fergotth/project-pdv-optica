import { getElement } from "../utils/getElement.js";
import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * Obtiene los datos del formulario de productos.
 * @returns {Object} // Devuelve un objeto con los datos del formulario de productos
 */
export const getDataProductForm = () => {
    try {
        const imgSrc = getElement('.image--input');
        const data = {
            SKU: getElement('.input--skuCode').value,
            Category: getElement('.input--radiobutton input[name="radiobutton--value"]:checked').value,
            Description: getElement('.input--description').value,
            PriceExcludingIVA: getElement('.priceWithoutIVA--input').value,
            PriceIncludingIVA: getElement('.priceWithIVA--input').value,
            NetProfit: getElement('.utility--input').value,
            SalePrice: getElement('.priceSale--input').value,
            Stock: getElement('.units--input').value,
            Image: imgSrc.files.length > 0 ? imgSrc.files[0].name : "" 
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