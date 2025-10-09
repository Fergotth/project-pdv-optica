import { getDataClientDB } from "./getData.js";
import { newAlert } from "../utils/alerts.js";
import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * 
 * @param {String} param    // Nombre o ID del cliente a buscar 
 */
export const showClientHTML = async (param) => {
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
    } catch {
        showErrorMessage(document.body, `Error al buscar el cliente en la Base Datos: ${error}`);
    }
};