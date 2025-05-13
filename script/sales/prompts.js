import { getDiscountContainerHTML, getContainerIVAHTML, getSearchClientContainerHTML } from "./salesDom.js";
import { insertNewHTML, searchClient, addClientToList } from "./utils.js";
import { newAlert } from "../utils/alerts.js";
import clients from "../../data/clients.js";

export const showPromptIVA = (element) => {
    element.appendChild(insertNewHTML(getContainerIVAHTML()));
};

export const showPromptDiscount = (index, element) => {
    element.appendChild(insertNewHTML(getDiscountContainerHTML(index)));
};

export const showPromptSearchClient = (element) => {
    element.appendChild(insertNewHTML(getSearchClientContainerHTML()));
};

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