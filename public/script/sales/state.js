import { getNextIDSale } from "./getData.js";

let state = {
    dataCart: [],
    dataPayment: [],
    dataSummary: {},
    subtotal: 0,
    cartItems: 0,
    discount: 0,
    percentIVA: 0,
    iva: 0,
    dolar: 0,
    typeOfPayment: 'Efectivo',
    paymentsApplicated: 0,
    nextID: 1,
    procesing: false
};

/**
 * Regresa el contenido del objeto
 * @returns {Object}
 */
export const getState = () => ({ ...state });

/**
 * Actualiza el contenido del objeto
 * @returns {Object}
 */
export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}

/**
 * Reinicializa el estado del objeto
 */
export const flushState = async () => {
    const nextID = await getNextIDSale();

    updateState(() => ({
        dataCart: [],
        dataPayment: [],
        dataSummary: {},
        subtotal: 0,
        cartItems: 0,
        discount: 0,
        iva: 0,
        typeOfPayment: 'Efectivo',
        paymentsApplicated: 0,
        nextID,
        procesing: false
    }));
};