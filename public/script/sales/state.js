let state = {
    data: [],
    payment: [],
    subtotal: 0,
    cartItems: 0
};

export const getState = () => ({ ...state });

export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}

export const flushState = () => updateState(() => ({
    data: [],
    payment: [],
    cartItems: 0
}));