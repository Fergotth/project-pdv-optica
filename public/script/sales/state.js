let state = {
    data: [],
    percentIva: 0,
    payment: [],
    payments: 0
};

export const getState = () => ({ ...state });

export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}

export const flushState = () => updateState(() => ({
    data: [],
    percentIva: 0,
    payments: 0
}));