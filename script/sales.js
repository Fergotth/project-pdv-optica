import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import * as handlers from './sales/salesHandlers.js';

const sales = () => {
    document.querySelector('.formSales').addEventListener('click', (event) => {
        event.stopPropagation();
        const button = event.target;
        button.classList.forEach(name => {
            const handlerName = `handler${name.charAt(0).toUpperCase() + name.slice(1)}`;

            if (typeof handlers[handlerName] === 'function') {
                const args = getHandlerArgs[handlerName]?.(button) || { button, state: getState() };
                handlers[handlerName](args);
            }
        });
    });

    Object.entries(handlers).forEach(([name, handler]) => {
        globalThis[name] = handler;
    });
};

export default sales;