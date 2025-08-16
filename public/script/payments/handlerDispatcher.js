import { getState } from "../sales/state.js";
import { getElement } from "../utils/getElement.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerPaymentCloseIcon: () => ({
        DOM: getElement('.overlayPromptDiscount')
    }),

    handlerBillPayment__search: () => ({
        note: getElement('.billPayment__input').value
    }),

    handlerThird__applyNewPayment: () => ({
        DOM: getElement('.billPaymentsContainer'),
        client: getElement('.second__title div:nth-child(2) > span').textContent,
        total: getElement('.summary__totalUnpaid + div').textContent.replace("$", ""),
        ID: getElement('.second__title div:nth-child(2) > span').dataset.id
    })
};