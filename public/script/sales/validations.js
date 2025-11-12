import { newAlert } from "../utils/alerts.js";

/**
 * Devuelve si la categoria buscada existe
 * @param {Object} data 
 * @param {String} param 
 * @returns {Boolean || false}
 */
export const validateData = (data, param) => {
    if (!Array.isArray(data) || data.length === 0) return false;

    const categoryParams = ['frames', 'accessories', 'services'];
    const paramLower = param.toLowerCase();

    return data.some(element => {
        if (categoryParams.includes(paramLower)) {
            return element.Category?.toLowerCase() === paramLower;
        } else {
            return element.Description?.toLowerCase().includes(paramLower);
        }
    });
};

export const checkInventory = async (stock, quantity) => {
    if (stock - quantity < 0) {
        const response = await newAlert({
            icon: 'question',
            title: "AVISO",
            text: "No quedan mas articulos en el inventario<br>¿Desea agregarlo de todas formas?"
        });
        return response;
    }
    return true;
};