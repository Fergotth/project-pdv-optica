import Class from './consts.js';
import { getState, updateState } from './state.js';

export const setTotals = () => {

};

const getSubtotal = (data) => {
    return data.reduce((acc, item) => acc + item.total, 0);
};