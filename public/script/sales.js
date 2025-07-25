import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import { getElement } from "./utils/getElement.js";
import { flushState, updateState } from "./sales/state.js";
import { loader } from "./utils/loader.js";
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

    const [dataParams] = await getDataParams('/get-params');

    updateState(() => {
        return {
            percentIVA: dataParams.IVA,
            dolar: dataParams.PriceDolar
        };
    });

    getElement(Class.form.sales).addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    const onSalesActive = async function(event) {
        if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
        if (event.type === 'click' && event.target.classList.contains('sku')) return;
    
        event.stopPropagation();
        const button = event.target;
    
        button.classList.forEach(async name => {
            const handlerName = `handler${name.charAt(0).toUpperCase() + name.slice(1)}`;
    
            if (typeof handlers[handlerName] === 'function') {
                const args = getHandlerArgs[handlerName]?.(button) || { button };
                try {
                    loader(true);
                    await handlers[handlerName](args); // Esperamos al handler si es async
                } catch (error) {
                    console.error(`Error en ${handlerName}:`, error);
                } finally {
                    loader(false);
                }
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