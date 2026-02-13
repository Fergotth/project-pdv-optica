import { postData } from "../utils/postDataToDB.js";
import { dispatch } from "./stateMaterials.js";

/**
 * Guardar los datos del formulario de registro de salida de materiales
 * @param {Object} data // Objeto contenedor de los datos del formulario a guardar
 * @returns {boolean}    // Retorna true si el guardado fue exitoso, o false si hubo un error al guardar los datos
 */
export const saveData = async (data) => {
    //* respuesta booleana 
    const response = await postData('/save-material-dispatched', data);

    //* si fue "true" guarda la data en state
    if (response)
        dispatch({
            type: "SET_DB_DATA",
            upload: data
        });

    return response;
};