import { getElement } from "../utils/getElement.js";
import { getClientHTML, getProductsHTML } from "./operationsDOMs.js";
import { getDataClientForm } from "../clients/getData.js";

export const getHandlerArgs = {
    handlerRegisterClient: () => ({
        DOM: getElement('.containerOperations'),
        innerHTML: getClientHTML()
    }),

    handlerBtnSaveClient: () => ({
        data: getDataClientForm()
    }),

    handlerCloseFormClient: () => ({}),

    handlerRegisterArticles: () => ({
        DOM: getElement('.containerOperations'),
        innerHTML: getProductsHTML()
    }),

    handlerBtnProductsCancel: () => ({})
};