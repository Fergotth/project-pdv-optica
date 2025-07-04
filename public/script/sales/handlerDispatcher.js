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
        category: 'accessories'
    }),

    handlerBtnServices: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'services'
    }),

    handlerBtnSinglevision: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'monofocal'
    }),

    handlerBtnBifocal: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'bifocal'
    }),

    handlerBtnProgresive: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: 'http://localhost:5500/get-products',
        category: 'progresivo'
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
    }),

    handlerSku: () => ({
        DOM: getElement(Class.list.itemsInCart),
        sku: getElement(Class.input.article).value
    }),

    handlerApplyDiscountBtn: () => ({
        DOM: getElement(Class.form.sales),
        items: Number(getElement(Class.label.cartTotalItems).textContent)
    }),

    handlerDeleteDiscountBtn: () => ({
        DOM: getElement(Class.label.discount)
    }),

    handlerCancelSetDiscountBtn: () => ({
        DOM: getElement('.overlayPromptDiscount')
    }),

    handlerSetDiscountBtn: () => ({
        discount: Number(getElement(Class.input.discount).value)
    })
};