import { newAlert } from "../utils/alerts.js";

/**
 * Genera los valores del poder en el menu select de la receta 
 * @param {Number} sign 
 * @param {Number} minValue
 * @param {Number} maxValue 
 * @returns {Array<String>}    // Valores de poder generados
 */
const powerValues = (sign, minValue, maxValue) => {
    let values = [];
    for (let i = minValue; i <= maxValue; i += 0.25) {
        values.push(`${sign}${i.toFixed(2)}`);
    }

    if (sign === '-') {
        values.reverse();
        values.push('0.00');
    }

    return values;
};

/**
 * Genera los valores de eje en el menu select de la receta
 * @returns {Array<Number>}    // Valores de eje generados
 */
const axisValues = () => {
    let values = [];
    for (let i = 0; i <= 180; i++) {
        values.push(i);
    }
    return values;
}

/**
 * 
 * @param {HTMLSelectElement} DOM 
 * @param {Array<Number || String>} values 
 */
const addValues = (DOM, values) => {
    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        DOM.appendChild(option);
    });
};

/**
 * 
 * @param {Object} elements   // Objeto con los elementos select a los que se les agregaran los valores correspondientes
 */
export const setDataToSelects = (elements) => {
    Object.entries(elements).forEach(([key, element]) => {
        if (key.includes('sph'))
            addValues(element, [
            ...powerValues('-', 0.25, 6),
            ...powerValues('+', 0.25, 5)
            ]);
        else if (key.includes('cyl')) 
            addValues(element, powerValues('-', 0.25, 4));
        else if (key.includes('axis'))
            addValues(element, axisValues());
        else if (key.includes('add'))
            addValues(element, powerValues('+', 1.00, 3.00));
    });
};

/**
 * Activa o desactiva el campo de ADD dependiendo del tipo de material seleccionado
 * @param {HTMLSelectElement} element 
 * @param {Boolean} enableADD 
 */
export const toggleADDField = (element, enabled, COLORS) => {
    element.disabled = !enabled;
    element.style.backgroundColor = enabled ? COLORS.enabled : COLORS.disabled;
    if (!enabled) element.selectedIndex = 0;
};

/**
 * Activa o desactiva el campo de eje dependiendo del valor del cilindro
 * @param {*} axisElement 
 * @param {*} COLORS 
 */
export const toggleAxisField = (axisElement, disabled, COLORS) => {
    axisElement.disabled = disabled;
    axisElement.style.backgroundColor = disabled ? COLORS.disabled : COLORS.enabled;
    if (disabled) axisElement.selectedIndex = 0;
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

/**
 * Valida los datos de un material
 * @param {Object} data 
 * @returns {string|null}  // Retorna el nombre del campo que falló, o null si todo es válido
 */
export const validateMaterialData = (data) => {
    const requiredFields = ['SphOD', 'SphOS', 'CylOD', 'CylOS', 'Material', 'Note', 'Branch', 'DateRegistered'];
    const nameFieldMap = {
        SphOD: 'Esfera OD',
        SphOS: 'Esfera OI',
        CylOD: 'Cilindro OD',
        CylOS: 'Cilindro OI',
        Material: 'Material',
        Note: 'Nota',
        Branch: 'Sucursal',
        DateRegistered: 'Fecha'
    };

    for (const field of requiredFields) {
        if (!data[field] || data[field].toString().trim() === '')
            return nameFieldMap[field];
    }

    if (data.CylOD !== '0.00' && !data.AxisOD)
        return 'Eje OD';

    if (data.CylOS !== '0.00' && !data.AxisOS)
        return 'Eje OI';

    if (data.Material.includes('ft') || data.Material.includes('prg')) {
        if (!data.ADDOD)
            return 'ADD OD';
        if (!data.ADDOS)
            return 'ADD OI';
    }

    //? Todo válido
    return null;
};

/**
 * Funcion para cargar la fecha actual al abrir el modal en el input de fecha
 * @param {*HTMLInputElement} e // Elemento input de fecha al que se le asignara la fecha actual
 */
export const loadActualDateHandler = (e) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    e.value = `${yyyy}-${mm}-${dd}`;
};

/**
 * Muestra el mensaje de alerta con el mensaje especificado
 * @param {String} message 
 */
export const showAlert = (message, icon = 'info') => {
    newAlert({
        icon: icon,
        text: message,
        title: 'AVISO'
    });
};