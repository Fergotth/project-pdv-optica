import { getParsedHTML } from "../utils/getElement.js";
import { saveClient } from "../clients/addClient.js";

/**
 * 
 * @param {HTMLDivElement} DOM  // Elemendo padre donde se insertara el nuevo elemento
 * @param {String} innerHTML    // Codigo HTML a insertar
 */
export const handlerRegisterClient = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};

export const handlerBtnSaveClient = ({ data }) => {
    const { Name, Phone, Birthdate } = data;

    if (!Name || !Phone || !Birthdate) {
        throw new Error("Todos los campos son obligatorios");
    }

    saveClient(data);
};