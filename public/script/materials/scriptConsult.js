import { getElement } from "../utils/getElement.js";
import { renderDispatchedMaterial } from "./utils.js";

const scriptConsultDispatchedMaterials = () => {
    //* Boton Consultar
    const btnSearch = getElement('.btnConsultMaterialDispatched');

    //? funciones para los eventos
    btnSearch.addEventListener('click', renderDispatchedMaterial);

    return {
        removeListeners: () => {
            btnSearch.removeEventListener('click', renderDispatchedMaterial);
        }
    };
};

export default scriptConsultDispatchedMaterials;