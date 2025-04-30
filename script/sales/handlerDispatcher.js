import { getState } from "./stateSales.js";
import products from "../../data/products.js";

export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: document.querySelector('.container--inputArticule'),
        products
    }),
    
    handlerMinus: (button) => ({
        button
    }),

    handlerPlus: (button) => ({
        button
    }),

    handlerDiscount: (button) => ({
        index: parseInt(button.dataset.id, 10)
    }),

    handlerBtnCancel: (button) => ({
        button,
        state: getState()
    }),

    handlerBtnAccept: (button) => ({
        button,
        state: getState()
    }),

    handlerIva: () => ({
        state: getState()
    }),

    handlerTypeOfIva: (button) => ({
        percentIva: parseInt(button.dataset.value, 10)
    })
};