import { showErrorMessage } from "../utils/errorMessage.js";

/**
 * Obtiene de la base de datos de materiales despachados
 * @param {Object<String>} param0 
 * @returns 
 */
export const getDataDispatchedMaterials = async ({ branch = 'all', remainingAttempts = 3 } = {}) => {
    const query = `/get-materials-dispatched?branch=${encodeURIComponent(branch)}`;

    try {
        const response = await fetch(query);
        if (!response.ok) {
            showErrorMessage(document.body, `HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        if (remainingAttempts > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return await getDataDispatchedMaterials({ branch: branch, remainingAttempts: remainingAttempts - 1 });
        } else {
            showErrorMessage(document.body, `Error al obtener datos de la base de datos: ${error}`);
            console.error('Error al obtener datos de la base de datos:', error);
            return null; //ajuste a []
        }
    }
};

/**
 * Obtiene los datos del material a partir de los valores de los elementos select e inputs
 * @param {Object} elements   // Objeto con los elementos select a los que se les agregaran los valores correspondientes
 * @returns {Object}          // Objeto con los datos del material
 */
export const getDataFormMaterial = (elements) => {
    return {
        SphOD: elements.sphOD.value,
        SphOS: elements.sphOS.value,
        CylOD: elements.cylOD.value,
        CylOS: elements.cylOS.value,
        AxisOD: elements.axisOD.value,
        AxisOS: elements.axisOS.value,
        ADDOD: elements.addOD.value,
        ADDOS: elements.addOS.value,
        DateRegistered: elements.date.value,
        Branch: elements.branch.value,
        Material: elements.material.value,
        Observations: elements.observations.value,
        Note: elements.note.value
    };
};