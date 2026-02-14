import { newAlert } from "../utils/alerts.js";
import { getElement } from "../utils/getElement.js";
import { getDataDispatchedMaterials } from "./getData.js";
import { 
    dispatch, 
    getState
} from "./stateMaterials.js";

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
 * Valida los datos de un material
 * @param {Object} data 
 * @returns {string|null}  // Retorna el nombre del campo que falló, o null si todo es válido
 */
export const validateMaterialData = (data) => {
    const  { requiredFields, nameFieldMap } = getState();

    for (const field of requiredFields) {
        if (!data[field] || data[field].toString().trim() === '')
            return nameFieldMap[field];
    }

    if (data.CylOD !== '0.00' && !data.AxisOD)
        return nameFieldMap.AxisOD;
    
    if (data.CylOS !== '0.00' && !data.AxisOS)
        return nameFieldMap.AxisOS;
    
    if (data.Material.includes('ft') || data.Material.includes('prg')) {
        if (!data.ADDOD)
            return nameFieldMap.ADDOD;
        if (!data.ADDOS)
            return nameFieldMap.ADDOS;
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

/**
 * Renderiza los datos de los materiales despachados en la interfaz
 * @param {Object} data // Datos de los materiales despachados obtenidos de la Base de Datos
 */
export const renderDispatchedMaterial = async () => {
    const { branchs, materials } = getState();

    //* Sucursal seleccionada para la busqueda
    const selectedBranch = getElement('#selectSucursal').value || 'all';

    //* Obtiene los datos de la base de datos
    const data = await getDataDispatchedMaterials({ branch: selectedBranch });

    //* Contenedor donde se renderizaran los materiales despachados
    const container = getElement('.popupConsultMaterialDispatched tbody');
    
    //* Limpiar el contenedor antes de renderizar los nuevos datos
    container.replaceChildren();

    //* Renderizar cada material despachado en una fila de la tabla
    data.forEach(field => {
        //* elemento nuevo a crear
        const e = document.createElement('tr');

        e.innerHTML = `
            <td>${field.DateRegistered}</td>
            <td>${branchs[field.Branch]}</td>
            <td>${field.Note}</td>
            <td>${materials[field.Material]}</td>
            <td>${field.SphOD}</td>
            <td>${field.CylOD !== '0.00' ? field.CylOD : "-----"}</td>
            <td>${field.AxisOD !== "" ? field.AxisOD : "---"}</td>
            <td>${!field.Material.includes('sv') ? field.ADDOD : "-----"}</td>
            <td>${field.SphOS}</td>
            <td>${field.CylOS !== '0.00' ? field.CylOS : "-----"}</td>
            <td>${field.AxisOS !== "" ? field.AxisOS : "---"}</td>
            <td>${!field.Material.includes('sv') ? field.ADDOS : "-----"}</td>
            <td>${field.Observations}</td>
        `;

        //* Agregar la fila al contenedor
        container.appendChild(e);
    });
};

/**
 * Exportar los datos consultados a excel
 * @returns 
 */
export const exportToExcel = async () => {
    //* Sucursal seleccionada para la busqueda
    const selectedBranch = getElement('.popupConsultMaterialDispatched #selectSucursal').value;
    const existData = getElement('.popupConsultMaterialDispatched tbody');

    //* Si no ha selecionado ninguna sucursal termina la ejecucion
    if (!selectedBranch && existData.rows.length === 0) {
        newAlert({
            icon: 'info',
            title: "AVISO",
            text: "No se ha seleccionado ninguna sucursal"
        });
        return;
    }

    //* Si no he realizado ninguna busqueda
    if (existData.row.length === 0) {
        newAlert({
            icon: 'info',
            title: "AVISO",
            text: "No se ha realizado ninguna busqueda"
        });
        return;
    }

    //* Obtiene los datos de la base de datos
    const data = await getDataDispatchedMaterials({ branch: selectedBranch });
    
    //* guarda el objeto obtenido de la BD en el state
    if (data.length > 0) {
        dispatch({ type: "CLEAR_TEMP_DATA" });
        dispatch({ 
            type: "SET_DB_DATA",
            upload: data
        });
    } else {
        newAlert({
            icon: 'info',
            title: "AVISO",
            text: "No se encontro ningun registro con esa sucursal"
        });
        return;
    }

    const state = getState();
    const branch = state.branchs[selectedBranch];

    if (!state.dataFromDB || state.dataFromDB.length === 0) {
        alert("No hay datos para exportar");
        return;
    }

    try {
        const response = await fetch('/export-to-excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branch: branch,
                rows: state.dataFromDB
            })
        });

        if (!response.ok) {
            throw new Error("Error al generar el archivo");
        }

        // Manejo correcto del archivo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "ReporteMateriales.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error exportando:", error);
        alert("Error al exportar el archivo");
    }
};

//! probar esto !!!
/**
 * Actualizar la hoja de excel del inventario de materiales
 * @param {String} sph 
 * @param {String} cyl 
 * @param {Object} sheet
 */
export const updateStockInExcel = async (sph, cyl, sheet) => {
    const res = await fetch('/update-stock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        sph: sph,
        cyl: cyl,
        sheet: sheet
        })
    });

    const data = await res.json();
    return data.success;
};

//* Limpia el formulario
export const cleanForm = (elements) => {
    Object.values(elements).forEach(e => {
        if (e && "value" in e) {
            e.value = "";
        }
    });
};