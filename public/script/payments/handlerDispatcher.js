import { getElement } from "../utils/getElement.js";
import { getState } from "../sales/state.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerPaymentCloseIcon: () => ({
        DOM: getElement('.overlayPromptDiscount')
    })
};