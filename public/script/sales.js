import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import { getElement } from "./utils/getElement.js";
import { flushState } from "./sales/state.js";
import { setActiveModule } from "./utils/globalState.js";
import Class from "./sales/consts.js";
import * as handlers from './sales/handlers.js';

const sales = () => {
    flushState();
    
    getElement(Class.form.sales).addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    const onSalesActive = function(event) {
        if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
        if (event.type === 'click' && event.target.classList.contains('sku')) return;
        
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

    getElement(Class.form.sales).addEventListener('click', onSalesActive);
    getElement(Class.input.article).addEventListener('keydown', onSalesActive);

    function clearEvents() {
        getElement(Class.form.sales).removeEventListener('click', onSalesActive);
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

export default sales;