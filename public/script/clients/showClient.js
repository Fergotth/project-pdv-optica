import { getDataClientDB } from "./getData.js";
import { newAlert } from "../utils/alerts.js";

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
        newAlert({
            icon: "error",
            title: "Error",
            text: `Error al buscar el cliente en la Base Datos: ${error}`
        });
    }
};