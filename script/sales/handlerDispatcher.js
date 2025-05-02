import { getState } from "./stateSales.js";
import products from "../../data/products.js";

export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: document.querySelector('.container--inputArticule'),
        products
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
        dom: document.querySelector('.formSales')
    }),

    handlerBtnCancel: (button) => ({
        button
    }),

    handlerBtnAccept: (button) => ({
        button,
        input: document.querySelector('.inputDiscount'),
        ivaSelected: document.getElementById('value-1'),
        index: parseInt(button.dataset.id, 10)
    }),

    handlerIva: () => ({
        dom: document.querySelector('.formSales')
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: parseInt(button.dataset.value, 10)
    })
};