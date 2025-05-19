/**
 * 
 * @param {HTMLElement} element     // Elemento HTML
 * @returns {HTMLElement}           // Regresa el elemento validado
 */
export const validateElement = (strClass) => {
    
    const element = strClass.includes('.') ? document.querySelector(strClass) : document.getElementById(strClass);

    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Elemento no existe en el DOM");
    }

    return element;
};

/**
 * 
 * @param {HTMLElement | Number} element    // Elemento HTML o dato numerico
 * @returns                                 // Valor numerico
 */
export const validateValue = (element) => {
    try {
        let value = 0;
        if (element && element instanceof HTMLElement && typeof element !== 'undefined') {
            if ('id' in element.dataset) {
                value = Number(element.dataset.id);
            }

            if ('value' in element.dataset) {
                value = Number(element.dataset.value);
            }
        } else if (element && !isNaN(element) && element !== '') {
            value = Number(element);
        }

        return value;
    } catch (error) {
        throw new Error('Valor incorrecto o tipo de dato incorrecto');
    }
};

/**
 * 
 * @param {String} discount 
 * @returns {boolean} 
 */
export const validateRegex = (discount) => {
    return (/^(?:\d+)(?:\.\d{1,2})?$/.test(discount) && discount !== "" && !isNaN(Number(discount)));
}

/**
 * 
 * @param {Number} payment 
 * @param {Number} total 
 * @returns {boolean}
 */
export const validatePayment = (payment, total) => {
    return Number(total) >= Number(payment);
};