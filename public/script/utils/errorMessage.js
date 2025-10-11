import { getParsedHTML } from './getElement.js';

/**
 * Devuelve el innerHTML de mensaje de error
 * @param {String} message 
 * @returns {String}
 */
const getErrorMessageHTML = (message) => {
    return `
    <div class="alert-container-error">
        <div class="error-alert-error">
            <div class="alert-content-error">
                <div class="alert-icon-error">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor"
                        class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <div class="alert-text-error">
                    <p class="alert-title-error">Hubo un error</p>
                    <p class="alert-description-error">${message}</p>
                </div>
            </div>
            <button class="alert-close-error">
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor"
                    class="icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
    `;
};

/**
 * Muestra el mensaje de error
 * @param {HTMLDivElement} DOM 
 * @param {String} message 
 */
export const showErrorMessage = (DOM, message) => {
    const existAlert = DOM.querySelector('.alert-container-error');
    
    if (existAlert) existAlert.remove();

    DOM.appendChild(getParsedHTML(getErrorMessageHTML(message)));
    const alertContainer = DOM.querySelector('.alert-container-error');
    const closeButton = DOM.querySelector('.alert-close-error');

    setTimeout(() => {
        alertContainer.classList.add('alert-error-show');
    }, 10);

    if (closeButton) 
        closeButton.addEventListener('click', () => {
            alertContainer.classList.add('alert-error-hide');
        });
};