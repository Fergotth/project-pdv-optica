import { 
    getState, 
    updateState 
} from '../sales/state.js';
import { 
    getParsedHTML,
    getElement 
} from '../utils/getElement.js';
import { newAlert } from '../utils/alerts.js';
import { getBillPaymentSummaryHTML } from './paymentsDom.js';
import { getNewPaymentItemHTML } from '../sales/salesDom.js';
import { calcuteNewPayment } from './utils.js';
import { setData } from './setData.js';
import summarySale from '../sales/summarySale.js';

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
    summarySale();
};

export const handlerApplyPayment = async ({ DOM, value, typeOfPayment }) => {
    if (!calcuteNewPayment(value)) {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "El monto ingresado es mayor al total"
        });
        return;
    }

    getElement('.paymentValue').value = '';
    DOM.appendChild(getParsedHTML(getNewPaymentItemHTML(value, typeOfPayment)));
};

export const handlerItemDeletePayment = ({ DOM, value }) => {
    calcuteNewPayment(-value);
    DOM.remove();
};