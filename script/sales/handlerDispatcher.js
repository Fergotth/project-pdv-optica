import { getState } from "./stateSales.js";
import products from "../../data/products.js";
import { validateElement } from "./salesUtils.js";

export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: validateElement(document.querySelector('.container--inputArticule')),
        products,
        percentIva: getState().percentIva
    }),
    
    handlerMinus: (button) => ({
        button,
        index: parseInt(button.dataset.id, 10)
    }),

    handlerPlus: (button) => ({
        button,
        index: parseInt(button.dataset.id, 10)
    }),

    handlerDiscount: (button) => ({
        index: parseInt(button.dataset.id, 10),
        dom: validateElement(document.querySelector('.formSales'))
    }),

    handlerBtnCancel: (button) => ({
        button
    }),

    handlerBtnAccept: (button) => ({
        button,
        input: validateElement(document.querySelector('.inputDiscount')),
        typeOfDiscount: validateElement(document.getElementById('value-1')),
        index: parseInt(button.dataset.id, 10)
    }),

    handlerIva: () => ({
        dom: validateElement(document.querySelector('.formSales'))
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: parseInt(button.dataset.value, 10)
    }),

    handlerBtnSearchClient: () => ({}),
    
    handlerBtnCancelClient: () => ({}),
    
    handlerSearchClient: () => ({
        dom: validateElement(document.querySelector('.formSales'))
    })
};