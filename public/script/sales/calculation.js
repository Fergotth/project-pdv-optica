import { 
    getState, 
    updateState 
} from "./state.js";
import Class from "./consts.js";
import { getElement } from "../utils/getElement.js";

/**
 * Actualiza el valor del subtotal
 * @param {Number} price 
 * @returns 
 */
export const subtotal = (price) => {
    updateState(previusData => {
        return {
            subtotal: previusData.subtotal + price
        };
    });

    return getState().subtotal;
};

/**
 * Regresa el valor del iva y marca o desmarca la casilla de iva segun sea el caso
 * @param {Boolean} checked 
 * @returns {Number}
 */
export const IVA = (checked) => {
    updateState(previusData => {
        return { iva: checked ? (previusData.subtotal - previusData.discount) * previusData.percentIVA / 100 : 0 };
    });

    const { percentIVA, iva } = getState();
    getElement('.discount + div').innerHTML = checked ? 
    `<input type="checkbox" class="applyIVA" checked>IVA %${percentIVA}` : 
    `<input type="checkbox" class="applyIVA">IVA`;
    
    return iva;
};

/**
 * Calcula el total de la nota
 * @returns {Number}
 */
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

/**
 * Calcula el nuevo pago
 * @param {Number} value 
 * @param {String || undefined} typeOfPayment 
 * @returns {Boolean}
 */
export const calcuteNewPayment = (value, typeOfPayment = undefined) => {
    const dataState = getState();
    const actualPaid = Number(dataState.paymentsApplicated.toFixed(2));
    const newPayment = typeOfPayment === 'Dolar' ? 
        Number((dataState.dolar * Number(value)).toFixed(2)) : Number(value);
    const totalPaid = getElement('.detailTotal span');
    const totalValue = Number(total().toFixed(2));

    if (actualPaid + newPayment > totalValue) {
        return false;
    }

    updateState(previusData => {
        return {
            paymentsApplicated: previusData.paymentsApplicated + newPayment
        };
    });

    totalPaid.textContent = getState().paymentsApplicated.toFixed(2);
    return true;
};