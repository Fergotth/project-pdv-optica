let state = {
    data: [],
    index: 0,
    percentIva: 0
};

export const getState = () => ({ ...state });

export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}