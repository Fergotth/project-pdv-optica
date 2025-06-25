import { getElement } from "../utils/getElement.js";
import Class from "./consts.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerSecondsection_item: () => ({
        itemSearched: getElement(Class.input.article),
        products,
    })
};