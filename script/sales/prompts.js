import { getDiscountContainerHTML, getContainerIVAHTML, getSearchClientContainerHTML, getTicketContainerHTML } from "./salesDom.js";
import { searchClient, addClientToList } from "./utils.js";
import { getParsedHTML } from "../utils/getElement.js";
import { newAlert } from "../utils/alerts.js";
import clients from "../../data/clients.js";

/**
 * 
 * @param {HTMLElement} element // Elemento padre donde se insertara el nuevo elemento 
 */
export const showPromptIVA = (element) => {
    element.appendChild(getParsedHTML(getContainerIVAHTML()));
};

/**
 * 
 * @param {Number} index        // Indice que se agregara dentro del nuevo elemento
 * @param {HTMLElement} element // Elemento padre donde se insertara el nuevo elemento 
 */
export const showPromptDiscount = (index, element) => {
    element.appendChild(getParsedHTML(getDiscountContainerHTML(index)));
};

/**
 * 
 * @param {HTMLElement} element // Elemento padre donde se insertara el nuevo elemento 
 */
export const showPromptSearchClient = (element) => {
    element.appendChild(getParsedHTML(getSearchClientContainerHTML()));
};

/**
 * 
 * @param {HTMLElement} dom // Elemento donde se insertaran los clientes encontrados
 * @param {String} name     // Nombre del cliente a buscar
 */
export const showPromptClients = (dom, name) => {
    try {
        if (name && name !== "") {
            const client = searchClient(clients, name);

            if (!!client.length) { 
                addClientToList(dom, client);
            } else {
                newAlert({
                    icon: "info",
                    title: "Busqueda",
                    text: "No se encontro ningun cliente"
                });
            }
        } else {
            newAlert({
                icon: "info",
                title: "Busqueda",
                text: "Escribe el nombre del cliente a buscar"
            })
        }
        
    } catch (error) {
        throw new Error('Se encontro un error en el DOM Clients');
    }
};

export const showSaleResume = (dom) => {
    dom.appendChild(getParsedHTML(getTicketContainerHTML()));
};