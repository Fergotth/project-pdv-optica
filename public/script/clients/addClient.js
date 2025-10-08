import { newAlert } from "../utils/alerts.js";
import { showErrorMessage } from "../utils/errorMessage.js";
import { postData } from "../utils/postDataToDB.js";

/**
 * @param {Object}  // Datos del cliente a guardar
 */
export const saveClient = async (data) => {
    try {
        const res = await postData('/save-clients', data);

        if (res) {
            newAlert({
                icon: "success",
                title: "Alta de Cliente",
                text: "Cliente agregado correctamente"
            });
        } else {
            newAlert({
                icon: "error",
                title: "Alta de Cliente",
                text: "Error al agregar al cliente a la DB"
            });

            throw new Error("Error al agregar al cliente a la DB");
        }
    } catch (error) {
        showErrorMessage(document.body, `Ha ocurrido un error: ${error}`);
    }
};