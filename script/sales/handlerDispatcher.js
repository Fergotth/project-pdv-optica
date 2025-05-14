import { getState } from "./state.js";
import { validateElement, validateValue } from "./utils.js";
import products from "../../data/products.js";
import Class from "./consts.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: validateElement(document.querySelector(Class.input.article)),
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
        dom: validateElement(document.querySelector(Class.form.sales))
    }),

    handlerBtnCancel: (button) => ({
        button
    }),

    handlerBtnAccept: (button) => ({
        button,
        input: validateElement(document.querySelector(Class.input.discount)),
        typeOfDiscount: validateElement(document.getElementById(Class.input.typeOfDiscount)),
        index: validateValue(button)
    }),

    handlerIva: () => ({
        dom: validateElement(document.querySelector(Class.form.sales))
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: validateValue(button)
    }),
    
    handlerSearchClient: () => ({
        dom: validateElement(document.querySelector(Class.form.sales))
    }),
    
    handlerBtnSearchClient: () => ({
        dom: validateElement(document.querySelector(Class.form.clients)),
        name: validateElement(document.querySelector(Class.input.client)).value
    }),
    
    handlerBtnCancelClient: () => ({}),

    handlerClientName: (button) => ({
        name: button.textContent,
        id: validateValue(button)
    })
};