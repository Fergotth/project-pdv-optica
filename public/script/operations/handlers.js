import { 
    getParsedHTML,
    getElement 
} from "../utils/getElement.js";
import { newAlert } from "../utils/alerts.js";
import { saveClient } from "../clients/addClient.js";
import { closeOverlay } from "../utils/removeOverlay.js";
import { showErrorMessage } from "../utils/errorMessage.js";
import { saveProduct } from "../products/saveData.js";
import { renderArticlesFounded } from "../products/utils.js"
import productSctipt from "../products/loadScript.js";

let producsInstanceEvents = null;

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
        showErrorMessage(document.body, "Todos los campos son obligatorios");
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
 * 
 * @param {Object<HTMLDivElement, String} param0 
 */
export const handlerConsultArticles = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};

/**
 * Cierra el contenedor de consulta de articulos
 */
export const handlerCloseProductContainer = ({}) => {
    closeOverlay(getElement('.overlay'));
};

/**
 * Busca los articulos en la base de datos 
 * @param {Object} param0 // Objeto contenedor de los datos encontrados de la DB 
 */
export const handlerBtnSearchArticles = ({ data }) => {
    if (data.length > 0) {
        renderArticlesFounded(data);
    } else {
        newAlert({
            icon: 'info',
            text: "No se encontro ningun articulo."
        });
    }
};