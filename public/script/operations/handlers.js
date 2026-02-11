import { 
    getParsedHTML,
    getElement 
} from "../utils/getElement.js";
import { newAlert } from "../utils/alerts.js";
import { saveClient } from "../clients/addClient.js";
import { closeOverlay } from "../utils/removeOverlay.js";
import { saveProduct } from "../products/saveData.js";
import { renderArticlesFounded } from "../products/utils.js"
import { getDataProductsDB } from "../products/getData.js";
import { 
    getDataFormMaterial,
    validateMaterialData,
    showAlert
} from "../materials/utils.js";
import { saveData } from "../materials/saveData.js";
import productSctipt from "../products/addProductScript.js";
import scriptMaterials from "../materials/scriptMaterials.js";

let producsInstanceEvents = null;
let materialsInstanceEvents = null;

/**
 * 
 * @param {HTMLDivElement} DOM  // Elemendo padre donde se insertara el nuevo elemento
 * @param {String} innerHTML    // Codigo HTML a insertar
 */
export const handlerRegisterClient = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};

/**
 * 
 * @param {Object<String, String, Date>} param0     // Objeto con los datos a guardar
 */
export const handlerBtnSaveClient = async ({ data }) => {
    const { Name, Phone, Birthdate } = data;

    if (!Name || !Phone || !Birthdate) {
        showAlert("Todos los campos son obligatorios");
        throw new Error("Todos los campos son obligatorios");
    }

    saveClient(data);
    closeOverlay(getElement('.overlay'));
};

/**
 * @param {void}    // Cierra el HTMLDivElement overlay
 */
export const handlerCloseFormClient = () => {
    closeOverlay(getElement('.overlay'));
};

/**
 * 
 * @param {Object<HTMLElement, String>} param0  // HTMLElement donde se insertara el nuevo elemento contenido innerHTML  
 */
export const handlerRegisterArticles = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML)); 
    producsInstanceEvents = productSctipt();
};

/**
 * Cierra el formulario de registro de nuevos articulos
 * @param {void}    // Cierra el HTMLDivElement overlay
 */
export const handlerBtnProductsCancel = ({}) => {
    if (producsInstanceEvents) {
        producsInstanceEvents.removeListeners();
        producsInstanceEvents = null;
    }
    closeOverlay(getElement('.overlay'));
};

/**
 * Guarda los nuevos productos y cierra el formulario si se guardan exitosamente
 * @param {Object} param0   // Objeto contenedor de los datos de los productos a guardar 
 */
export const handlerBtnProductsSave = async ({ data }) => {
    if (await saveProduct(data)) handlerBtnProductsCancel({});
};

/**
 * Abre la ventana para ver el listado de articulos
 * @param {Object<HTMLDivElement, String} param0 
 */
export const handlerConsultArticles = async ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
    await handlerBtnSearchArticles({ value: "" });
};

/**
 * Cierra el contenedor de consulta de articulos
 */
export const handlerBtnCloseProductContainer = ({}) => {
    closeOverlay(getElement('.overlay'));
};

/**
 * Busca los articulos en la base de datos 
 * @param {Object} param0 // Objeto contenedor de los datos encontrados de la DB 
 */
export const handlerBtnSearchArticles = async ({ value }) => {
    const data = await getDataProductsDB(value);
    
    if (data.length > 0) {
        renderArticlesFounded(data);
    } else {
        newAlert({
            icon: 'info',
            text: "No se encontro ningun articulo."
        });
    }
};

/**
 * 
 * @param {*Object<HTMLDivElement, String>} param0 // Objeto contenedor del HTMLDivElement donde se insertara el nuevo elemento y el codigo HTML a insertar
 */
export const handlerRegisterNote = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
    materialsInstanceEvents = scriptMaterials();
};

/**
 * @param {void}    // Cierra el HTMLDivElement overlay de registro de materiales
 */
export const handlerBtnSaveDataMaterials = async () => {
    const data = getDataFormMaterial(materialsInstanceEvents.elements);
    const response = validateMaterialData(data);
    
    //* Si los datos no son válidos, se muestra un mensaje de error y se detiene la ejecución
    if (response !== null) {
        showAlert(`Los datos del material no son válidos: Falta el campo ${response}`);
        return;
    }

    //* Si los datos son válidos, se procede a guardarlos o devolver un error si falla el guardado y detener el cierre del modal
    if (!await saveData(data)) return;

    //* Se cierra el modal y se eliminan los listeners para evitar fugas de memoria
    if (materialsInstanceEvents) {
        materialsInstanceEvents.removeListeners();
        materialsInstanceEvents = null;
    }

    //* Se cierra el overlay del modal
    closeOverlay(getElement('.overlayPromptDiscount'));
};

/**
 * Cierra el formulario de registro de materiales
 * @param {void}    // Cierra el HTMLDivElement overlay de registro de materiales
 */
export const handlerBtnCloseRegisterMaterial = () => {
    //* Se eliminan los listeners para evitar fugas de memoria 
    if (materialsInstanceEvents) {
        materialsInstanceEvents.removeListeners();
        materialsInstanceEvents = null;
    }

    //* Se muestra mensaje de cancelacion de registro de material
    showAlert("Registro de material cancelado", "info");
    
    //* Se cierra el overlay del modal
    closeOverlay(getElement('.overlayPromptDiscount'));
};

/**
 * Abre la ventana para consultar los materiales despachados en las notas de venta
 * @param {Object<HTMLDivElement, String>} param0 // Objeto contenedor del HTMLDivElement donde se insertara el nuevo elemento y el codigo HTML a insertar
 */
export const handlerConsultGeneralMaterialDispatched = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};