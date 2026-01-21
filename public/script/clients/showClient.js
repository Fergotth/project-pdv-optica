import { getDataClientDB } from "./getData.js";
import { newAlert } from "../utils/alerts.js";
import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * 
 * @param {String} param    // Nombre o ID del cliente a buscar 
 */
export const showClientHTML = async (param, remainingAttempts = 3) => {
    try {
        const clients = await getDataClientDB(param);

        if (clients.length > 0) {
            clients.forEach(client => {
                // procedimiento para insertar los datos en el div contenedeor
            });
        } else {
            newAlert({
                icon: "info",
                text: "No se encontraron clientes con ese nombre"
            });
        }
    } catch (error) {
        if (remainingAttempts > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
            await showClientHTML(param, remainingAttempts - 1);
        } else {
            showErrorMessage(document.body, `Error al buscar el cliente en la Base Datos: ${error}`);
            console.error('Error al buscar el cliente en la Base Datos: ', error);
        }
    }
};