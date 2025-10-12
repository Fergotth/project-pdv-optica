import { getElement } from "./utils/getElement.js";
import { getHandlerArgs } from "./operations/handlerDispatcher.js";
import * as handlers from "./operations/handlers.js";

/**
 * Carga el menu de operaciones en la app principal
 */
const operations = () => {    
    getElement('.containerOperations').addEventListener('submit', (event) => { debugger
        event.preventDefault();
    });
    
    const onOperationsActive = function(event) {
        event.stopPropagation();
        const button = event.target;

        button.classList.forEach(name => {
            const handlerName = `handler${name.charAt(0).toUpperCase() + name.slice(1)}`;

            if (typeof handlers[handlerName] === 'function') {
                const args = getHandlerArgs[handlerName]?.(button) || { button };
                handlers[handlerName](args);
            }
        });
    };

    getElement('.containerOperations').addEventListener('click', onOperationsActive);

    function clearEvents() {
        getElement('.containerOperations').removeEventListener('click', onOperationsActive);
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