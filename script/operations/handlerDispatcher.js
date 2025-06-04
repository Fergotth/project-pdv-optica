import { getElement } from "../utils/getElement.js";
import { getClientHTML } from "./operationsDOMs.js";
import { getDataClientForm } from "../clients/getData.js";

export const getHandlerArgs = {
    handlerRegisterClient: () => ({
        DOM: getElement('.containerOperations'),
        innerHTML: getClientHTML()
    }),

    handlerBtnSaveClient: () => ({
        data: getDataClientForm()
    })
};