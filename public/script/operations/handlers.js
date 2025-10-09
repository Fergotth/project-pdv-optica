import { getParsedHTML } from "../utils/getElement.js";
import { saveClient } from "../clients/addClient.js";
import { closeOverlay } from "../utils/removeOverlay.js";
import { getElement } from "../utils/getElement.js";
import { showErrorMessage } from "../utils/errorMessage.js";
import { saveProduct } from "../products/saveData.js";

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
};

/**
 * @param {void}    // Cierra el HTMLDivElement overlay
 */
export const handlerBtnProductsCancel = () => {
    closeOverlay(getElement('.overlay'));
};

/**
 * 
 * @param {Object} param0   // Objeto contenedor de los datos de los productos a guardar 
 */
export const handlerBtnProductsSave = ({ data }) => {
    saveProduct(data);
};