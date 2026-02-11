import { postData } from "../utils/postDataToDB.js";

/**
 * Guardar los datos del formulario de registro de salida de materiales
 * @param {Object} data // Objeto contenedor de los datos del formulario a guardar
 * @returns {boolean}    // Retorna true si el guardado fue exitoso, o false si hubo un error al guardar los datos
 */
export const saveData = async (data) => {
    return await postData('/save-material-dispatched', data);
};