import { getState, updateState, flushState } from "./state.js";
import { getElement } from "../utils/getElement.js";
import Class from "./consts.js";

/**
 * 
 * @param {HTMLElement} button  // Elemento seleccionado
 * @param {Integer} index       // Indice del objeto
 */
export const handleQuantityButton = (DOM, param) => {
    const quantity = param === 'minus' ? -1 : 1;
    const newQuantity = quantity + Number(DOM.textContent);

    if (newQuantity > 0) {
        DOM.textContent = newQuantity;
        updateItemsCart(quantity);
    }

    // updateState(previousData => {
    //     const newData = [...previousData.data];
        
    //     newData[index] = {
    //         ...newData[index],
    //         quantity: newData[index].quantity + quantity,
    //         discount: quantity < 0 ? 0 : newData[index].discount
    //     };

    //     const finalData = newData
    //         .filter(item => item.quantity > 0)
    //         .map((item, i) => ({
    //             ...item,
    //             position: i,
    //             iva: getIVA(item, previousData.percentIva)
    //         }))
    //         .map(item => ({
    //             ...item,
    //             amount: getTotal(item)
    //         }));
        
    //     return {
    //         data: finalData                    
    //     };
    // });
    
    // refreshDataHTML(getState().data);
};

/**
 * 
 * @param {HTMLFormElement} formSales // Contenedor principal
 */
export const resetSale = (formSales) => {
    if (!formSales) {
        throw new Error('DOM formSales no esta disponible');
    }

    flushState();

    const name = getElement(Class.input.name);
    const listItems = getElement(Class.list.products);
    const labelIndicatorIVA = getElement(Class.label.percent);
    const labelSubtotal = getElement(Class.label.subTotal);
    const discount = getElement(Class.label.discount);
    const labelIVA = getElement(Class.label.iva);
    const labelTotal = getElement(Class.label.total);

    name.value = "Publico General";
    listItems.innerHTML = '';
    labelIndicatorIVA.textContent = "0%";
    labelSubtotal.textContent = "$0.00";
    discount.textContent = "$0.00";
    labelIVA.textContent = "$0.00";
    labelTotal.textContent = "Total $0.00";

    newAlert({
        icon: "success",
        title: "AVISO",
        text: "Venta en proceso cancelada"
    });
}

/**
 * 
 * @param {Number} item     // Valor numerico a dar formato de numero 
 * @returns {Number}
 */
const formatMoney = (item) => {
    validateValue(item);
    return Number(item).toFixed(2);
}

export const updateItemsCart = (quantity) => {
    updateState(previusData => {
        return { 
            cartItems: previusData.cartItems + quantity
        };
    });

    getElement(Class.label.cartTotalItems).textContent = getState().cartItems;
}