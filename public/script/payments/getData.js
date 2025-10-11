import { 
    updateState, 
    getState
} from '../sales/state.js';
import { getElement } from '../utils/getElement.js';
import { newAlert } from '../utils/alerts.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { showErrorMessage } from '../utils/errorMessage.js';
import { getDataNoteArticlesDB } from '../kardexNotes/getData.js';

/**
 * 
 * @param {Integer} value       // ID de la nota a buscar
 * @returns {Promise<Object>}   // Objeto con los datos de la nota
 */
export const getData = async (value) => {
    try {
        const response = await fetch(`/find-unpaidSale?q=${encodeURIComponent(value)}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Validar que venga con datos
        if (!data || !data.SaleID) return null;

        return {
            total: data.Total ?? 0,
            unpaid: data.Balance ?? 0,
            totalPaid: (data.Total ?? 0) - (data.Balance ?? 0),
            client: data.ClientName || "Público General",
            idClient: data.ClientID,
            status: data.Status
        };

    } catch (error) {
        showErrorMessage(document.body, `Error en getData: ${error.message}`);
        throw error;
    }
};

/**
 * 
 * @param {Object<NodeList>} items  // Coleccion de DivElements para extraer los datos para el Array de pagos
 * @returns {Array}                 // Array con los datos de los pagos
 */
export const getPaymentsData = async (items) => {
    const saleID = safeNumber(getElement('.second__title div:nth-child(1) > span').textContent);
    const nextReceiptID = await getNextReceiptId(saleID);
    const nextPaymentID = await getNextPaymentID();
    const newData = Array.from(items).map(item => {
        const paid = safeNumber(item.querySelector('.paidValue').textContent);

        return {
            PaymentMethod: item.querySelector('.typeOfPaymentValue').textContent.trim(),
            Paid: paid,
            SaleID: saleID,
            ReceiptID: nextReceiptID,
            PaymentID: nextPaymentID
        };
    });

    if (!newData.every(item => !!item.Paid)) {
        newAlert({
            icon: 'info',
            title: "Dato invalido",
            text: "Algun pago es invalido, favor de corregir e intentar nuevamente."
        });
        return;
    } 

    updateState(previusData => ({
        dataPayment: [ ...previusData.dataPayment, ...newData ]
    }));

    return getState().dataPayment;
};

/**
 * 
 * @param {Integer} IDSale              // ID de la nota a buscar
 * @returns {Promise<Integer> || null}  // ID siguiente de recibo
 */
export const getNextReceiptId = async (IDSale) => {
    try {
        const response = await fetch(`/find-paymentsNextReceipt?q=${encodeURIComponent(IDSale)}`);
        
        if (!response.ok) {
            showErrorMessage(document.body, `Error HTTP en getNextReceiptID: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.NextReceiptID ?? null;

    } catch (error) {
        showErrorMessage(document.body, `Error en getNextReceiptID: ${error}`);
        console.error("Error en getNextId:", error);
        return null;
    }
};

/**
 * 
 * @param {void}
 * @returns {Promise<Integer> || null}  // ID siguiente de pago
 */
export const getNextPaymentID = async () => {
    try {
        const response = await fetch(`/find-nextPaymentID`);
        
        if (!response.ok) {
            showErrorMessage(document.body, `Error HTTP en getNextPaymentID: ${response.status}`);
            return null;
        }

        const nextID = await response.json();
        return nextID?.NextPaymentID || 1;

    } catch (error) {
        showErrorMessage(document.body, `Error en getNextPaymentID: ${error}`);
        console.error("Error en getNextId:", error);
        return null;
    }
};

/**
 * 
 * @param {Integer} ID                      // ID de la nota a buscar
 * @returns {Object<Array, Array, Number>}  // Objetos con los datos para el nuevo ticket
 */
export const getDataTicket = async (ID) => {
    const summarySale = safeNumber(getElement('.summaryClientSaleDetails span:nth-child(2)').textContent);
    
    const cartItems = (await getDataNoteArticlesDB(ID)).map(item => ({
        Quantity: item.Quantity,
        Product: item.Product
    }));

    const payments = Array.from(document.querySelectorAll('.paymentItem')).map(e => ({
        PaymentMethod: e.querySelector('.typeOfPaymentValue').textContent.trim(),
        Paid: safeNumber(e.querySelector('.paidValue').textContent.trim())
    }));

    return { cartItems, payments, summarySale };
};