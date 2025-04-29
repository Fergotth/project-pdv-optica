let state = {
    data: [],
    percentIva: 0
};

export const getState = () => ({ ...state });

export const updateState = (updater) => {
    state = { ...state, ...updater(state) };
    return getState();
}