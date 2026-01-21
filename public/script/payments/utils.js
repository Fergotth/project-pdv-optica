import { getElement } from '../utils/getElement.js';
import { 
    updateState, 
    getState 
} from '../sales/state.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { createTicketPaymentHTML } from '../utils/ticket.js';
import { generateTicket } from '../sales/utils.js';
import { postData } from '../utils/postDataToDB.js';
import { showErrorMessage } from '../utils/errorMessage.js';
import { getDataTicket } from './getData.js';

/**
 * 
 * @param {Number} total        // Total
 * @param {Number} unpaid       // Saldo pendiente
 * @param {Number} totalPaid    // Cantidad pagada
 * @param {String} client       // Cliente
 * @param {Integer} idClient    // ID de cliente
 * @param {String} status       // Estatus de la venta
 * @param {Integer} id          // ID de la nota
 */
export const renderData = (total, unpaid, totalPaid, client, idClient, status, id) => {
    getElement('.second__title div:nth-child(1) > span').textContent = id;
    getElement('.second__title div:nth-child(2) > span').textContent = client;
    getElement('.second__title div:nth-child(2) > span').dataset.id = idClient;
    getElement('.summary__total + div').textContent = total !== "" ? `$${total.toFixed(2)}` : "";
    getElement('.summary__totalPaid + div').textContent = totalPaid !== "" ? `$${totalPaid.toFixed(2)}` : "";
    getElement('.summary__totalUnpaid + div').textContent = unpaid !== true ? `$${unpaid.toFixed(2)}` : "";
    getElement('.billPayment__input').value = '';
    
    const statusNote = getElement('.summary__status > span');
    const btnApplyPaidment = getElement('.third__applyNewPayment');
    
    if (!!unpaid) {
        if (unpaid === true) 
            btnApplyPaidment.classList.add('unabled__button');
        else {
            btnApplyPaidment.classList.remove('unabled__button');
            statusNote.style.color = status === "Cancelada" ? 'red' : 'green';
        }
        statusNote.textContent = status;
    }
    else {
        statusNote.style.color = 'black';
        statusNote.textContent = "Pagada";
        btnApplyPaidment.classList.add('unabled__button');
    }
};

/**
 * 
 * @param {Number} value                        // Cantidad pagada
 * @param {String || undefined} typeOfPayment   // Tipo de pago
 * @returns {Boolean}                           // Resultado del proceso
 */
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

/**
 * 
 * @param {Integer} ID              // ID de la nota 
 * @param {Integer} nextIDReceipt   // ID del siguiente recibo
 * @param {Integer} nextIDPayment   // ID del siguiente pago
 */
export const createTicketPayment = async (ID, nextIDReceipt, nextIDPayment) => {
    const { cartItems, payments, summarySale } = await getDataTicket(ID);
    const ticketSaved = await postData('/generate-ticketHTML', {
        html: createTicketPaymentHTML(nextIDPayment, cartItems, payments, summarySale, getState().dolar)
    });

    if (ticketSaved) {
        await generateTicket({ NextID: nextIDPayment, type: "payment", ReceiptID: nextIDReceipt, SaleID: ID });
    } else {
        showErrorMessage(document.body, `No se pudo guardar el HTML del ticket ${nextIDPayment}`);
        console.warn('No se pudo guardar el HTML del ticket');
        throw new Error('Error al guardar el ticket HTML');
    }
};