/**
 * 
 * @param {HTMLElement} element     // Elemento HTML
 * @returns {HTMLElement}           // Regresa el elemento validado
 */
export const getElement = (strClass) => {
    
    const element = strClass.includes('.') ? document.querySelector(strClass) : document.getElementById(strClass);

    if (!element || !(element instanceof HTMLElement)) {
        throw new Error(`Elemento (${strClass}) no existe en el DOM`);
    }

    return element;
};

/**
 * 
 * @param {String} innerHTML    // Contenido html
 * @returns                     // Nuevo elemento creado con el codigo HTML
 */
export const getParsedHTML = (innerHTML) => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(innerHTML, 'text/html');
    const parsedElement = parsed.body.firstChild;

    if (parsedElement) {
        return parsedElement;
    }
};