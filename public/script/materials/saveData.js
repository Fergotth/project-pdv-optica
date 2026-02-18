import { postData } from "../utils/postDataToDB.js";
import { store } from "./stateMaterials.js";
import { updateStockInExcel } from "./utils.js";

/**
 * Guardar los datos del formulario de registro de salida de materiales
 * @param {Object} data // Objeto contenedor de los datos del formulario a guardar
 * @returns {boolean}    // Retorna true si el guardado fue exitoso, o false si hubo un error al guardar los datos
 */
export const saveData = async (data) => {
    //! ----------
    const { sheet } = store.getState();
    await updateStockInExcel(data.SphOD, data.CylOD, sheet[data.Material]);
    await updateStockInExcel(data.SphOS, data.CylOS, sheet[data.Material]);
    //! ----------

    // //* respuesta booleana 
    // const response = await postData('/save-material-dispatched', data);

    // //* si fue "true" guarda la data en state
    // if (response)
    //     store.dispatch({
    //         type: "SET_DB_DATA",
    //         upload: data
    //     });

    // return response;
    return false;
};