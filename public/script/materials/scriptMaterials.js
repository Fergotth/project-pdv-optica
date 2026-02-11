import { getElement } from "../utils/getElement.js";
import { 
    setDataToSelects,
    toggleADDField,
    toggleAxisField,
    loadActualDateHandler
} from "./utils.js";

const scriptMaterials = () => {
    const COLORS = {
        'enabled': '#fff',
        'disabled': '#cecece'
    };

    const elements = {
        modal: getElement('.popupRegisterMaterial'),
        sphOD: getElement('.popupRegisterMaterial #SphOD'),
        sphOS: getElement('.popupRegisterMaterial #SphOS'),
        cylOD: getElement('.popupRegisterMaterial #CylOD'),
        cylOS: getElement('.popupRegisterMaterial #CylOS'),
        axisOD: getElement('.popupRegisterMaterial #AxisOD'),
        axisOS: getElement('.popupRegisterMaterial #AxisOS'),
        addOD: getElement('.popupRegisterMaterial #ADDOD'),
        addOS: getElement('.popupRegisterMaterial #ADDOS'),
        date: getElement('.popupRegisterMaterial #date'),
        note: getElement('.popupRegisterMaterial #note'),
        branch: getElement('.popupRegisterMaterial #branch'),
        material: getElement('.popupRegisterMaterial #material'),
        observations: getElement('.popupRegisterMaterial #observations')
    };

    //* evento para agregar los valores a los selects
    setDataToSelects(elements);

    //* evento para cargar la fecha actual al abrir el modal en el input de fecha
    loadActualDateHandler(elements.date);

    //? funciones para los eventos
    const materialChangeHandler = (e) => {
        const material = e.target.value;
        const enableAdd = material.includes('ft') || material.includes('prg');
        toggleADDField(elements.addOD, enableAdd, COLORS);
        toggleADDField(elements.addOS, enableAdd, COLORS);
    };

    const cylChangeHandler = (axisElement) => (e) => {
        const cylValue = e.target.value;
        toggleAxisField(axisElement, cylValue === '0.00', COLORS);
    };

    const cylODHandler = cylChangeHandler(elements.axisOD); //* Se crea el manejador para el cambio del cilindro OD
    const cylOSHandler = cylChangeHandler(elements.axisOS); //* Se crea el manejador para el cambio del cilindro OI
    //? fin de bloque de eventos
    
    //* evento para determinar que tipo de material se va a registrar y mostrar los campos correspondientes
    elements.material.addEventListener('change', materialChangeHandler);

    //* evento para activar o desactivar el campo de eje dependiendo del valor del cilindro
    elements.cylOD.addEventListener('change', cylODHandler);
    elements.cylOS.addEventListener('change', cylOSHandler);
    
    return {
        elements,
        removeListeners: () => {
            elements.material.removeEventListener('change', materialChangeHandler);
            elements.cylOD.removeEventListener('change', cylODHandler);
            elements.cylOS.removeEventListener('change', cylOSHandler);
        }
    };
};

export default scriptMaterials;