import { getElement } from "../utils/getElement.js";
import Class from "./consts.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerBtnFrames: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'frames'
    }),

    handlerBtnGlasses: () => ({
        DOM: getElement(Class.list.productsInDB),
    }),

    handlerBtnAccesories: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'accesories'
    }),

    handlerBtnServices: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'services'
    }),

    handlerBtnSinglevision: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        material: 'monofocal'
    }),

    handlerBtnBifocal: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        material: 'bifocal'
    }),

    handlerBtnProgresive: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        material: 'progresivo'
    }),

    handlerItemSelected: (button) => ({
        DOM: getElement(Class.list.itemsInCart),
        sku: button.dataset.sku
    }),

    handlerDeleteItem: (button) => ({
        DOM: button.parentElement
    }),

    handlerPlusButton: (button) => ({
        DOM: button.closest('.item-button')?.querySelector(Class.label.quantity),
        param: 'plus'
    }),

    handlerMinusButton: (button) => ({
        DOM: button.closest('.item-button')?.querySelector(Class.label.quantity),
        param: 'minus'
    }),

    handlerDeleteCart: () => ({
        DOM: getElement(Class.list.itemsInCart)
    })
};