import { getState } from "./state.js";
import { validateElement, validateValue } from "./utils.js";
import products from "../../data/products.js";
import Class from "./consts.js";

export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: validateElement(document.querySelector(Class.inputArticle)),
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
        dom: validateElement(document.querySelector(Class.form))
    }),

    handlerBtnCancel: (button) => ({
        button
    }),

    handlerBtnAccept: (button) => ({
        button,
        input: validateElement(document.querySelector(Class.inputDiscount)),
        typeOfDiscount: validateElement(document.getElementById(Class.typeOfDiscount)),
        index: validateValue(button)
    }),

    handlerIva: () => ({
        dom: validateElement(document.querySelector(Class.form))
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: validateValue(button)
    }),

    handlerBtnSearchClient: () => ({}),
    
    handlerBtnCancelClient: () => ({}),
    
    handlerSearchClient: () => ({
        dom: validateElement(document.querySelector(Class.form))
    })
};