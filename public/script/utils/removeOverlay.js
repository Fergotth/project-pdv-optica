/**
 * 
 * @param {HTMLDivElement} element 
 */

export const closeOverlay = (element) => {
    if (element) {
        element.remove();
    }
};