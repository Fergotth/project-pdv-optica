import { getElement } from "../utils/getElement.js";
import { getDataDB } from "./getData.js";
import Class from "./consts.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerBtnFrames: () => ({
        DOM: getElement(Class.list.productsInDB),
        products: getDataDB('/get-products')
    })
};