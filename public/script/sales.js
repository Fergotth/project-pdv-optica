import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import { getElement } from "./utils/getElement.js";
import { flushState, updateState } from "./sales/state.js";
import { loader } from "./sales/utils.js";
import Class from "./sales/consts.js";
import * as handlers from './sales/handlers.js';

const sales = async () => {
    globalThis.loader = loader;

    await flushState();
    
    const getDataParams = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            return [];
        }
    };

    const [dataParams] = await getDataParams('http://localhost:5500/get-params');

    updateState(() => {
        return {
            percentIVA: dataParams.IVA,
            dolar: dataParams.PriceDolar
        };
    });

    getElement(Class.form.sales).addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const executeHandler = async (handlerFn, args) => {
        if (getState().procesing) return;
    
        try {
            loader(true);
            await handlerFn(args);
        } catch (error) {
            console.error("Error en handler:", error);
        } finally {
            loader(false);
        }
    };
    
    const onSalesActive = function(event) {
        if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
        if (event.type === 'click' && event.target.classList.contains('sku')) return;
        
        event.stopPropagation();
        const button = event.target;

        button.classList.forEach(name => {
            const handlerName = `handler${name.charAt(0).toUpperCase() + name.slice(1)}`;

            if (typeof handlers[handlerName] === 'function') {
                const args = getHandlerArgs[handlerName]?.(button) || { button };
                executeHandler(handlers[handlerName](args));
            }
        });
    };

    getElement(Class.form.sales).addEventListener('click', onSalesActive);
    getElement(Class.input.article).addEventListener('keydown', onSalesActive);

    function clearEvents() {
        getElement(Class.form.sales).removeEventListener('click', onSalesActive);
        getElement(Class.input.article).removeEventListener('keydown', onSalesActive);
        unregisterGlobals();
    }

    function unregisterGlobals() {
        Object.keys(handlers).forEach(name => {
            delete globalThis[name];
        });

        delete globalThis.loader;
    }

    Object.entries(handlers).forEach(([name, handler]) => {
        globalThis[name] = handler;
    });

    return {
        clearEvents
    }
};

export default sales;