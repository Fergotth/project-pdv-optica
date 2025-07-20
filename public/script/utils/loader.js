import { getParsedHTML, getElement } from './getElement.js';
import { getLoaderHTML } from '../sales/salesDom.js';
import { updateState } from '../sales/state.js';

export const loader = (param) => {
    updateState(() => ({
        procesing: param
    }));

    const DOM = document.body;

    if (param) {
        // Mostrar loader
        DOM.appendChild(getParsedHTML(getLoaderHTML()));
    } else {
        // Ocultar loader si existe
        const overlay = getElement('.overlayLoader');
        if (overlay) {
            overlay.remove();
        }
    }
};