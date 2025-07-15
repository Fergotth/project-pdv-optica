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
    procesing: false
};

export const getState = () => ({ ...state });

export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}

export const flushState = () => updateState(() => ({
    dataCart: [],
    dataPayment: [],
    dataSummary: {},
    subtotal: 0,
    cartItems: 0,
    discount: 0,
    iva: 0,
    typeOfPayment: 'Efectivo',
    paymentsApplicated: 0,
    procesing: false
}));