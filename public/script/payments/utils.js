import { getElement } from '../utils/getElement.js';
import { 
    updateState, 
    getState 
} from '../sales/state.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { createTicketPaymentHTML } from '../utils/ticket.js';
import { generateTicket } from '../sales/utils.js';
import { postData } from '../utils/postDataToDB.js';
import { 
    getNextReceiptId,
    getNextPaymentID,
    getDataTicket 
} from './getData.js';

export const renderData = (total, unpaid, totalPaid, client, idClient, status, id) => {
    getElement('.second__title div:nth-child(1) > span').textContent = id;
    getElement('.second__title div:nth-child(2) > span').textContent = client;
    getElement('.second__title div:nth-child(2) > span').dataset.id = idClient;
    getElement('.summary__total + div').textContent = `$${total.toFixed(2)}`;
    getElement('.summary__totalPaid + div').textContent = `$${totalPaid.toFixed(2)}`;
    getElement('.summary__totalUnpaid + div').textContent = `$${unpaid.toFixed(2)}`;
    getElement('.billPayment__input').value = '';
    
    const statusNote = getElement('.summary__status > span');
    const btnApplyPaidment = getElement('.third__applyNewPayment');
    
    if (!!unpaid) {
        statusNote.style.color = status === "Cancelada" ? 'red' : 'green';
        statusNote.textContent = status;
        btnApplyPaidment.classList.remove('unabled__button');
    }
    else {
        statusNote.style.color = 'black';
        statusNote.textContent = "Pagada";
        btnApplyPaidment.classList.add('unabled__button');
    }
};

export const calcuteNewPayment = (value, typeOfPayment = undefined) => {
    const dataState = getState();
    const actualPaid = Number(dataState.paymentsApplicated.toFixed(2));
    const newPayment = typeOfPayment === 'Dolar' ? 
        Number((dataState.dolar * Number(value)).toFixed(2)) : Number(value);
    const totalPaid = getElement('.detailTotal span');
    const totalValue = safeNumber(getElement('.summaryClientSaleDetails span:nth-child(2)').textContent);

    if (actualPaid + newPayment > totalValue) {
        return false;
    }

    updateState(previusData => {
        return {
            paymentsApplicated: previusData.paymentsApplicated + newPayment
        };
    });

    totalPaid.textContent = getState().paymentsApplicated.toFixed(2);
    return true;
};

export const createTicketPayment = async (ID, nextIDReceipt, nextIDPayment) => {
    const { cartItems, payments, summarySale } = await getDataTicket(ID);
    const ticketSaved = await postData('/generate-ticketHTML', {
        html: createTicketPaymentHTML(nextIDPayment, cartItems, payments, summarySale, getState().dolar)
    });

    if (ticketSaved) {
        generateTicket(nextIDPayment, "payment", nextIDReceipt, ID);
    } else {
        newAlert({
            icon: 'error',
            text: `No se pudo guardar el HTML del ticket ${nextIDPayment}`
        });

        console.warn('No se pudo guardar el HTML del ticket');
        throw new Error('Error al guardar el ticket HTML');
    }
};

export const cleanPreviusDataScreen = () => {

};