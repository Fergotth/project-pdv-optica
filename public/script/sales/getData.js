import { getElement } from "../utils/getElement.js";
import { showErrorMessage } from "../utils/errorMessage.js";
import Class from "./consts.js";
import { updateState, getState } from "./state.js";

/**
 * Obtiene los datos de la base de datos
 * @param {String} url 
 * @returns {Promise<Object[]> || Promise<[]>} 
 */
export const getDataDB = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            showErrorMessage(document.body, `HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        showErrorMessage(document.body, `Error al obtener datos de la base de datos: ${error}`);
        console.error('Error al obtener datos de la base de datos:', error);
        return null; //ajuste a []
    }
};

/**
 * Obtiene los elementos del carrito de compras
 * @returns {Array}
 */
export const getCartItems = () => {
    const items = getElement(Class.list.itemsInCart).querySelectorAll('.item');
    
    // Creamos un array de objetos desde los ítems
    const newData = Array.from(items).map(item => ({
        SKU: item.querySelector('.product-image').dataset.sku,
        Product: item.querySelector('.details-description').textContent,
        Quantity: Number(item.querySelector(Class.label.quantity).textContent),
        Price: Number(item.querySelector(Class.label.unitprice).textContent.replace("$", "")),
        requirePrescription: item.dataset.ophthalmic === 'true' ? true : false
    }));

    // Actualizamos el estado de manera inmutable
    updateState(previusData => ({
        ...previusData,
        dataCart: [...previusData.dataCart, ...newData],
        requirePrescription: newData.some(product => product.requirePrescription)
    }));

    return getState().dataCart;
};

/**
 * Obtiene los pagos
 * @returns {Array}
 */
export const getPayments = () => {
    const items = getElement('.salePayments').querySelectorAll('.paymentItem');

    const newData = Array.from(items).map(item => {
        const paidText = item.querySelector('.paidValue').textContent.trim();
        const paid = paidText === "" ? null : (Number.isNaN(Number(paidText)) ? null : Number(paidText));
        
        return {
            PaymentMethod: item.querySelector('.typeOfPaymentValue').textContent.trim(),
            Paid: Number.isNaN(paid) ? null : paid
        };
    });

    if (!newData.every(item => !!item.Paid)) {
        newAlert({
            icon: 'info',
            title: "Dato invalido",
            text: "Algun pago es invalido, favor de corregir e intentar nuevamente."
        });
        
        throw new Error("Algun valor no es correcto en la cantidad de pago");
    } 

    updateState(previusData => ({
        ...previusData,
        dataPayment: [ ...previusData.dataPayment, ...newData]
    }));

    return getState().dataPayment;
};

/**
 * Obtiene los datos de la venta
 * @returns {Array}
 */
export const getSummarySale = () => {
    const newData = {
        subtotal: Number(getElement('.subtotal').textContent.replace("$", "")),
        discount: Number(getElement('.discount').textContent.replace("- $", "")),
        iva: Number(getElement('.iva').textContent.replace("$", "")),
        total: Number(getElement('.thirdsection-total').textContent.replace("$", "")),
        clientId: getElement('.input-client').dataset.id
    };

    updateState(previusData => ({
        ...previusData,
        dataSummary: newData
    }));

    return getState().dataSummary;
};

/**
 * Obtiene los datos de la cotizacion
 * @returns {Promise<Array>}
 */
export const getDataQuotation = async () => {
    const data = {
        products: [
            ...getCartItems()
        ],
        ...getSummarySale(),
        percentIVA: getState().percentIVA,
        nextID: await getNextIDQuotation()
    };

    return data;
};

/**
 * Obtiene la cotizacion de la base de datos
 * @param {String} type 
 * @returns {Promise<Object> || Promise<null>}
 */
export const getQuoationDB = async (type) => {
    try {
        const response = await fetch(`/get-quotation?q=${encodeURIComponent(type)}`);
        const data = await response.json();
        return data;
    } catch (err) {
        showErrorMessage(document.body, `Error al obtener los datos de la cotiacion: ${err}`);
        console.error("Error al obtener los datos de la cotizacion: ", err);
        return null;
    }
};

/**
 * Obtiene el siguiente ID de venta
 * @returns {Promise<Integer>}
 */
export const getNextIDSale = async () => {
    const nextIDSale = await getDataDB('/find-nextSaleID');

    return nextIDSale?.nextID || 1;
};

/**
 * Obtiene el siguiente ID de cotizacion
 * @returns {Promise<Integer>}
 */
export const getNextIDQuotation = async () => {
    const nextIDQuotation = await getDataDB('/find-nextQuotationID');

    return nextIDQuotation?.nextID || 1;
};