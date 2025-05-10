import { getState } from "./stateSales.js";
import products from "../../data/products.js";
import Class from "./salesConsts.js";
import { validateElement, validateValue } from "./salesUtils.js";

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
        input: validateElement(document.querySelector('.inputDiscount')),
        typeOfDiscount: validateElement(document.getElementById('value-1')),
        index: validateValue(button)
    }),

    handlerIva: () => ({
        dom: validateElement(document.querySelector('.formSales'))
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: validateValue(button)
    }),

    handlerBtnSearchClient: () => ({}),
    
    handlerBtnCancelClient: () => ({}),
    
    handlerSearchClient: () => ({
        dom: validateElement(document.querySelector('.formSales'))
    })
};