import { getElement } from './utils/getElement.js';
import { getHandlerArgs } from './operations/handlerDispatcher.js';
import { loader } from './utils/loader.js';
import { showErrorMessage } from './utils/errorMessage.js';
import * as handlers from './operations/handlers.js';

/**
 * Carga el menu de operaciones en la app principal
 */
const operations = () => {    
    const containerOperations = getElement('.containerOperations');
    
    containerOperations.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    const onOperationsActive = async function(event) {
        event.stopPropagation();
        const button = event.target;

        button.classList.forEach(async name => {
            const handlerName = `handler${name.charAt(0).toUpperCase() + name.slice(1)}`;

            if (typeof handlers[handlerName] === 'function') {
                const args = getHandlerArgs[handlerName]?.(button) || { button };
                try {
                    loader(true);
                    await handlers[handlerName](args);
                } catch (error) {
                    showErrorMessage(document.body, `Error en ${handlerName}: ${error}`);
                    console.error(`Error en ${handlerName}:`, error);
                } finally {
                    loader(false);
                }
            }
        });
    };

    containerOperations.addEventListener('click', onOperationsActive);

    function clearEvents() {
        containerOperations.removeEventListener('click', onOperationsActive);
        unregisterGlobals();
    }

    function unregisterGlobals() {
        Object.keys(handlers).forEach(name => {
            delete globalThis[name];
        });
    }

    Object.entries(handlers).forEach(([name, handler]) => {
        globalThis[name] = handler;
    });

    return {
        clearEvents
    }
};

export default operations;