let state = {
    data: [],
    percentIva: 0,
    client: "Publico General"
};

export const getState = () => ({ ...state });

export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}

export const flushState = () => updateState(() => ({
    data: [],
    percentIva: 0,
    client: "Publico General"
}));