import { getHandlerArgs } from "./payments/handlerDispatcher.js";
import { getElement } from "./utils/getElement.js";
import { 
    updateState, 
    flushState 
} from "./sales/state.js";
import { loader } from "./utils/loader.js";
import { showErrorMessage } from "./utils/errorMessage.js";
import * as handlers from './payments/handlers.js';

const payments = async () => {
    await flushState();
    
    const billPaymentContainer = getElement('.billPaymentsContainer');
    const btnApplyPaidment = getElement('.third__applyNewPayment');
    
    billPaymentContainer.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    btnApplyPaidment.classList.add('unabled__button');

    globalThis.loader = loader;

    const getDataParams = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            showErrorMessage(document.body, `Error al obtener datos de la base de datos: ${error}`);
            console.error('Error al obtener datos de la base de datos:', error);
            return [];
        }
    };

    const [dataParams] = await getDataParams('/get-params');

    updateState(() => {
        return {
            dolar: dataParams.PriceDolar
        };
    });
    
    const onPaymentsActive = async function(event) {
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
                    showErrorMessage(document.body, `Error en ${handlerName}: ${error}`);
                    console.error(`Error en ${handlerName}:`, error);
                } finally {
                    loader(false);
                }
            }
        });
    };

    billPaymentContainer.addEventListener('click', onPaymentsActive);

    function clearEvents() {
        billPaymentContainer.removeEventListener('click', onPaymentsActive);
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

export default payments;