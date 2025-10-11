import { showErrorMessage } from './errorMessage.js';

/**
 * Devuelve el elemento HTML validado de que exista
 * @param {HTMLElement} element     // Elemento HTML
 * @returns {HTMLElement}           // Regresa el elemento validado
 */
export const getElement = (strClass) => {
    
    const element = strClass.includes('.') ? document.querySelector(strClass) : document.getElementById(strClass);

    if (!element || !(element instanceof HTMLElement)) {
        showErrorMessage(document.body, `Elemento (${strClass}) no existe en el DOM`);
        throw new Error(`Elemento (${strClass}) no existe en el DOM`);
    }

    return element;
};

/**
 * Devuelve el elemento HTML para insertarse en el DOM
 * @param {String} innerHTML    // Contenido html
 * @returns {HTMLElement}       // Nuevo elemento creado con el codigo HTML
 */
export const getParsedHTML = (innerHTML) => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(innerHTML, 'text/html');
    const parsedElement = parsed.body.firstChild;

    if (parsedElement) {
        return parsedElement;
    }
};