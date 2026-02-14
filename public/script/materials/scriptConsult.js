import { getElement } from "../utils/getElement.js";
import { 
    renderDispatchedMaterial, 
    exportToExcel
} from "./utils.js";

const scriptConsultDispatchedMaterials = () => {
    //* Boton Consultar
    const btnSearch = getElement('.btnConsultMaterialDispatched');
    const btnExportToExcel = getElement('.btnExportMaterialDispatchedToExcel')

    //? funciones para los eventos
    btnSearch.addEventListener('click', renderDispatchedMaterial);
    btnExportToExcel.addEventListener('click', exportToExcel);

    return {
        removeListeners: () => {
            btnSearch.removeEventListener('click', renderDispatchedMaterial);
            btnExportToExcel.addEventListener('click', exportToExcel);
        }
    };
};

export default scriptConsultDispatchedMaterials;