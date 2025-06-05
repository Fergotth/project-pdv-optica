import { validateValue } from "./validations.js";

/**
 * 
 * @param {Object} item 
 * @param {Number} IVA 
 * @returns {Number}
 */
export const getIVA = (item, IVA) => {
    return Number((getSubTotal(item) - item.discount) * (validateValue(IVA) / 100));
};

/**
 * 
 * @param {Object} item 
 * @returns {Number}
 */
export const getTotal = (item) => {
    return getSubTotal(item) - item.discount + item.iva;
};

/**
 * 
 * @param {Object} item 
 * @returns {Number}
 */
export const getSubTotal = (item) => {
    return item.quantity * item.price;
}

/**
 * 
 * @param {HTMLElement} typeOfDiscount  // Elemento que contiene el tipo de descuento (si es porcentaje o no)
 * @param {float} discount              // Cantidad de descuento 
 * @param {float} amount                // Monto actual
 * @returns {float}                     // Cantidad final a descontar
 */
export const getDiscount = (typeOfDiscount, discount, amount) => {
    if (!typeOfDiscount && !(typeOfDiscount instanceof HTMLElement)) {
        throw new Error('No se puede aplicar el descuento');
    }

    return typeOfDiscount.checked ? discount : amount * (discount / 100);
};

/**
 * 
 * @param {HTMLElement} priceLabel  // Elemento que contiene el abono total
 * @param {Number} pay              // Cantidad a sumar (o restar)
 * @param {String}                  // Valor en string a devolver ya calculado
 */
export const getNewPrice = (priceLabel, pay) => {
    return `$${(Number(priceLabel.textContent.replace("$", "")) + pay).toFixed(2)}`;
};