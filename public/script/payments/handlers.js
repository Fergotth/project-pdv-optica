import { 
    getState, 
    updateState 
} from '../sales/state.js';
import { 
    getParsedHTML,
    getElement 
} from '../utils/getElement.js';
import { getBillPaymentSummaryHTML } from './paymentsDom.js';
import { setData } from './setData.js';

export const handlerPaymentCloseIcon = ({ DOM }) => {
    updateState(() => {
        return {
            dataPayment: [],
        };
    });

    if (DOM) DOM.remove();
};

export const handlerBillPayment__search = async ({ note }) => {
    try {
        await setData(note);
    } catch (error) {
        console.error("Error al obtener los datos de la nota");
    }
};

export const handlerThird__applyNewPayment = ({ DOM, client, total, id }) => {
    DOM.appendChild(getParsedHTML(getBillPaymentSummaryHTML(client, total, id)));
};