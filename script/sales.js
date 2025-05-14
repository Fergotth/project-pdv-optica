import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import Class from "./sales/consts.js";
import * as handlers from './sales/handlers.js';

const sales = () => {
    document.querySelector(Class.form.sales).addEventListener('click', (event) => {
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