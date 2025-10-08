import { 
    updateState,
    flushState
} from '../sales/state.js';
import { 
    getParsedHTML,
    getElement 
} from '../utils/getElement.js';
import { newAlert } from '../utils/alerts.js';
import { getBillPaymentSummaryHTML } from './paymentsDom.js';
import { getNewPaymentItemHTML } from '../sales/salesDom.js';
import { 
    calcuteNewPayment,
    createTicketPayment,
    renderData
} from './utils.js';
import { setData } from './setData.js';
import { getPaymentsData } from './getData.js';
import { 
    savePayments, 
    updateUnpaidNotes 
} from './saveData.js';
import summarySale from '../sales/summarySale.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { showErrorMessage } from '../utils/errorMessage.js';

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
        showErrorMessage(document.body, "Error al obtener los datos de la nota");
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
    const ID = safeNumber(getElement('.second__title div:nth-child(1) > span').textContent);
    const data = await getPaymentsData(elements);

    await savePayments(data) && await updateUnpaidNotes(data);
    await createTicketPayment(ID, data[data.length - 1].ReceiptID, data[data.length - 1].PaymentID); 
    handlerPaymentCloseIcon({ DOM });

    renderData("", true, "", "", "", "", "");
    newAlert({
        icon: 'success',
        text: "Abono registrado exitosamente."
    });

    await flushState();
};