/**
 * 
 * @param {HTMLElement} element     // Elemento HTML
 * @returns {HTMLElement}           // Regresa el elemento validado
 */
export const getElement = (strClass) => {
    
    const element = strClass.includes('.') ? document.querySelector(strClass) : document.getElementById(strClass);

    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Elemento no existe en el DOM");
    }

    return element;
};