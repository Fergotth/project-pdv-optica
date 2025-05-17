import { getState } from "./state.js";
import { validateElement, validateValue } from "./utils.js";
import products from "../../data/products.js";
import Class from "./consts.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: validateElement(Class.input.article),
        products,
        percentIva: getState().percentIva
    }),
    
    handlerMinus: (button) => ({
        button,
        index: validateValue(button)
    }),

    handlerPlus: (button) => ({
        button,
        index: validateValue(button)
    }),

    handlerDiscount: (button) => ({
        index: validateValue(button),
        dom: validateElement(Class.form.sales)
    }),

    handlerBtnCancel: (button) => ({
        button
    }),

    handlerBtnAccept: (button) => ({
        button,
        input: validateElement(Class.input.discount),
        typeOfDiscount: validateElement(Class.input.typeOfDiscount),
        index: validateValue(button)
    }),

    handlerIva: () => ({
        dom: validateElement(Class.form.sales)
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: validateValue(button)
    }),
    
    handlerSearchClient: () => ({
        dom: validateElement(Class.form.sales)
    }),
    
    handlerBtnSearchClient: () => ({
        dom: validateElement(Class.form.clients),
        name: validateElement(Class.input.client).value
    }),
    
    handlerBtnCancelClient: () => ({}),

    handlerClientName: (button) => ({
        name: button.textContent,
        id: validateValue(button)
    }),

    handlerBtnPay: () => ({
        dom: validateElement(Class.form.sales),
        data: getState().data,
        client: validateElement(Class.input.name).value
    }),

    handlerPaymentBtnApply: () => ({
        pay: validateElement(Class.input.payment).value,
        total: validateElement(Class.label.payment).replaceChild(/[^0-9.-]+/g, "")
    }),

    handlerCheckoutBtnCancel: () => ({})
};