import { getElement } from "../utils/getElement.js";
import { getClientHTML } from "./operationsDOMs.js";

export const getHandlerArgs = {
    handlerRegisterClient: () => ({
        DOM: getElement('.containerOperations'),
        innerHTML: getClientHTML()
    })
};