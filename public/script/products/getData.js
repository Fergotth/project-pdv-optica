import { getElement } from "../utils/getElement.js";
import { showErrorMessage } from "../utils/errorMessage.js";
import { validateDataform } from "./utils.js";

/**
 * Obtiene los datos del formulario de productos.
 * @returns {Object} // Devuelve un objeto con los datos del formulario de productos
 */
export const getDataProductForm = () => {
    const description = getElement('.input--description').value.trim();
    const category = getElement('.input--description-category').value;
    const excluded = ["Armazones", "Servicios", "Accesorios"];
    const fullDescription = (category && !excluded.includes(category)) ? `${category} ${description}` : description;
    
    const data = {
        IVA: getElement('.IVA--input').value,
        SKU: getElement('.input--skuCode').value,
        Category: getElement('.input--radiobutton input[name="radiobutton--value"]:checked')?.value || "",
        Description: fullDescription,
        PriceExcludingIVA: getElement('.priceWithoutIVA--input').value,
        PriceIncludingIVA: getElement('.priceWithIVA--input').value,
        NetProfit: getElement('.utility--input').value,
        SalePrice: getElement('.priceSale--input').value,
        Stock: getElement('.units--input').value,
        Image: getElement('.image--input').files[0]?.name || ""
    };

    return validateDataform(data);
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