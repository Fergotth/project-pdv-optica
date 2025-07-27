import { getElement} from "../utils/getElement.js";

/**
 * 
 * @returns {Object}    // Regresa el objeto con los datos obtenidos del formulario
 */
export const getDataClientForm = () => {
    const data = {
        Name: getElement('name').value,
        Email: getElement('email').value,
        Phone: getElement('phone').value,
        Birthdate: getElement('date').value,
        Comments: getElement('comments').value
    };

    return data;
};

/**
 * 
 * @param {String} name // Nombre del cliente a buscar 
 * @returns             // Devuelve un objeto con los datos encontrar o un array vacio si no
 */
export const getDataClientDB = async (typeOfParam) => {
    try {
        const response = await fetch(`/get-clients?q=${encodeURIComponent(typeOfParam)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos del cliente:', error);
        return [];
    }
};