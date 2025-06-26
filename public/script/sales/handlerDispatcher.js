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
    })
};