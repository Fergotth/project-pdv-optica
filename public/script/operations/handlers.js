import { getParsedHTML } from "../utils/getElement.js";
import { saveClient } from "../clients/addClient.js";
import { closeOverlay } from "../utils/removeOverlay.js";
import { getElement } from "../utils/getElement.js";
import { saveProduct } from "../products/saveData.js";

/**
 * 
 * @param {HTMLDivElement} DOM  // Elemendo padre donde se insertara el nuevo elemento
 * @param {String} innerHTML    // Codigo HTML a insertar
 */
export const handlerRegisterClient = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};

export const handlerBtnSaveClient = async ({ data }) => {
    const { Name, Phone, Birthdate } = data;

    if (!Name || !Phone || !Birthdate) {
        throw new Error("Todos los campos son obligatorios");
    }

    saveClient(data);
    closeOverlay(getElement('.overlay'));
};

export const handlerCloseFormClient = () => {
    closeOverlay(getElement('.overlay'));
};

export const handlerRegisterArticles = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};

export const handlerBtnProductsCancel = () => {
    closeOverlay(getElement('.overlay'));
};

export const handlerBtnProductsSave = ({ data }) => {
    saveProduct(data);
}