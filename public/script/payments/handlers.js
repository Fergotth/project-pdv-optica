import { 
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
import { getPaymentsData } from './getData.js';
import { 
    savePayments, 
    updateUnpaidNotes 
} from './saveData.js';
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
    if (!Boolean(total)) {
        newAlert({
            icon: 'info',
            text: "Nota no cuenta con saldo pendiente."
        });
        return;
    }

    DOM.appendChild(getParsedHTML(getBillPaymentSummaryHTML(client, total, id)));
    summarySale();
};

export const handlerApplyPayment = async ({ DOM, value, typeOfPayment }) => {
    if (!calcuteNewPayment(value, typeOfPayment)) {
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

export const handlerBtnApplyPayments = async ({ elements, DOM }) => {
    await savePayments(getPaymentsData(elements)) && await updateUnpaidNotes(); // falta esta funcion para guardar los datos de las notas con saldo

    handlerPaymentCloseIcon({ DOM });
};