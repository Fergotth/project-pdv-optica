import { getState } from "./stateSales.js";
import products from "../../data/products.js";

export const getHandlerArgs = {
    handlerAddItem: () => ({
        itemSearched: document.querySelector('.container--inputArticule'),
        products,
        state: getState()
    }),
    
    handlerMinus: (button) => ({
        button,
        state: getState()
    }),

    handlerPlus: (button) => ({
        button,
        state: getState()
    }),

    handlerDiscount: (button) => ({
        button,
        index: button.dataset.id,
        state: getState()
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
        button,
        state: getState()
    })
};