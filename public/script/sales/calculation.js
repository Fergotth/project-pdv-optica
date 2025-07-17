import { 
    getState, 
    updateState 
} from "./state.js";
import Class from "./consts.js";
import { getElement } from "../utils/getElement.js";

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
        return { iva: checked ? (previusData.subtotal - previusData.discount) * previusData.percentIVA / 100 : 0 };
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

    if (items) {
        items.forEach(item => {
            const unitPriceElement = item.querySelector(Class.label.unitprice);
            const quantityElement = item.querySelector(Class.label.quantity);
        
            const unitPrice = unitPriceElement ? Number(unitPriceElement.textContent.replace("$", "")) : 0;
            const quantity = quantityElement ? Number(quantityElement.textContent) : 0;
        
            total += unitPrice * quantity;
        });
    }

    updateState(() => {
        return { subtotal: total };
    });

    return total;
};

export const calcuteNewPayment = (value) => {
    const actualPaid = getState().paymentsApplicated;
    const totalPaid = getElement('.detailTotal span');
    const totalValue = total();

    if (actualPaid + Number(value) > totalValue) {
        return false;
    }

    updateState(previusData => {
        return {
            paymentsApplicated: previusData.paymentsApplicated + Number(value)
        };
    });

    totalPaid.textContent = getState().paymentsApplicated.toFixed(2);
    return true;
};