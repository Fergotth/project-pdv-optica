import { 
    getState, 
    updateState 
} from "./state.js";
import Class from "./consts.js";

export const subtotal = (price) => {
    updateState(previusData => {
        return {
            subtotal: previusData.subtotal + price
        };
    });

    return getState().subtotal;
};

export const IVA = (checked) => {
    updateState(previusData => {
        return { iva: checked ? (previusData.subtotal - previusData.discount) * 16 / 100 : 0 };
    });

    return getState().iva;
};

export const total = () => {
    const state = getState();
    return  state.subtotal - state.discount + state.iva;
};

export const calculateDOMSubtotal = () => {
    const items = document.querySelectorAll('.item');
    let total = 0;

    items.forEach(item => {
        const unitPrice = Number(item.querySelector(Class.label.unitprice).textContent.replace("$", ""));
        const quantity = Number(item.querySelector(Class.label.quantity).textContent);
        total += unitPrice * quantity;
    });

    updateState(() => {
        return { subtotal: total };
    });

    return total;
};