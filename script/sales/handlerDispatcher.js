import { getState } from "./state.js";
import { validateValue } from "./validations.js";
import { getElement } from "../utils/getElement.js";
import products from "../../data/products.js";
import Class from "./consts.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: getElement(Class.input.article),
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
        dom: getElement(Class.form.sales)
    }),

    handlerBtnCancel: (button) => ({
        button
    }),

    handlerBtnAccept: (button) => ({
        button,
        input: getElement(Class.input.discount),
        typeOfDiscount: getElement(Class.input.typeOfDiscount),
        index: validateValue(button)
    }),

    handlerIva: () => ({
        dom: getElement(Class.form.sales)
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: validateValue(button)
    }),
    
    handlerSearchClient: () => ({
        dom: getElement(Class.form.sales)
    }),
    
    handlerBtnSearchClient: () => ({
        dom: getElement(Class.form.clients),
        name: getElement(Class.input.client).value
    }),
    
    handlerBtnCancelClient: () => ({}),

    handlerClientName: (button) => ({
        name: button.textContent,
        id: validateValue(button)
    }),

    handlerBtnPay: () => ({
        dom: getElement(Class.form.sales),
        data: getState().data,
        client: getElement(Class.input.name).value
    }),

    handlerPaymentBtnApply: () => ({
        pay: getElement(Class.input.payment),
        total: getElement(Class.label.totalTicket).textContent.replace(/[^0-9.-]+/g, "")
    }),

    handlerCheckoutBtnCancel: () => ({}),

    handlerButtonDeletePayment: (button) => ({
        id: validateValue(button)
    }),

    handlerBtnResetSale: () => ({
        formSales: getElement(Class.form.sales)
    })
};