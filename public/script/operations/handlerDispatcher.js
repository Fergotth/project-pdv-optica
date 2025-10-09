import { getElement } from "../utils/getElement.js";
import { getClientHTML, getProductsHTML } from "./operationsDOMs.js";
import { getDataClientForm } from "../clients/getData.js";
import { getDataProductForm } from "../products/getData.js";

/**
 * Objeto con los manejadores de funciones
 */
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

    handlerBtnProductsCancel: () => ({}),

    handlerBtnProductsSave: () => ({
        data: getDataProductForm()
    })
};