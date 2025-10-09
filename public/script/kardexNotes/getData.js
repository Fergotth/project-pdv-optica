import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * 
 * @param {Integer} value               // ID de la nota a buscar
 * @returns {Promise<Object> || null}   // Retorno del objeto con los datos o null si hay un error
 */
export const getDataNoteDB = async (value) => {
    try {
        const response = await fetch(`/find-sale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        showErrorMessage(document.body, `Error al obtener los datos de la nota: ${error}`);
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};

/**
 * 
 * @param {Integer} value               // ID de la nota a buscar
 * @returns {Promise<Object> || null}   // OBjeto con los datos encontrados o null si fue un error en la consulta
 */
export const getDataNotePaymentsDB = async (value) => {
    try {
        const response = await fetch(`/find-paymentsSale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        showErrorMessage(document.body, `Error al obtener los datos de la nota: ${error}`);
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};

/**
 * 
 * @param {Integer} value               // Id de la nota a buscar
 * @returns {Promise<Object> || null}   // Objeto con los datos encontrados o null
 */
export const getDataNoteArticlesDB = async (value) => {
    try {
        const response = await fetch(`/find-articlesSale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};

/**
 * 
 * @param {Integer} ID                  // ID del ticket a buscar 
 * @returns {Promise<Object> || null}   // Objeto con los datos encontrados o null
 */
export const getTicketsFile = async (ID) => {
    try {
        const response = await fetch(`/get-ticketPDF?id=${ID}`);
        
        if (!response.ok) {
            showErrorMessage(document.body, `Respuesta inesperada del servidor: ${response.status}`);
            console.warn("Respuesta inesperada del servidor:", response.status);
            return null;
        }

        const data = await response.json();

        if (!data.urls || data.urls.length === 0) {
            showErrorMessage(document.body, `No se encontraron URLs de tickets en la respuesta`);
            console.warn("No se encontraron URLs de tickets en la respuesta.");
            return null;
        }

        return data.urls;

    } catch (error) {
        showErrorMessage(document.body, `Error al obtener los datos: ${error}`);
        console.error("Error al obtener los datos: ", error);
        return null;
    }
};