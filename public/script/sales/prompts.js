import { getParsedHTML } from "../utils/getElement.js";
import { newAlert } from "../utils/alerts.js";

/**
 * 
 * @param {HTMLElement} element // Elemento padre donde se insertara el nuevo elemento 
 */
export const showPromptIVA = (element) => {
    element.appendChild(getParsedHTML(getContainerIVAHTML()));
};