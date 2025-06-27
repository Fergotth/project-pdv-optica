import { getState, updateState, flushState } from "./state.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
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
 * @param {HTMLElement} button          // Elemento seleccionado
 * @param {HTMLElement} input           // Elemento que contiene el valor del input
 * @param {HTMLElement} typeOfDiscount  // Radio button seleccionado
 * @param {Integer} index               // Indice del objeto
 */
export const setDiscount = ({ button, input, typeOfDiscount, index }) => {
    if (button.classList.contains('btnAccept')) {
        const discountStr = input.value.trim();

        if (validateRegex(discountStr)) {
            const item = getState().data[index];
            const actualAmount = getSubTotal(item);
            const amountToDiscount = getDiscount(typeOfDiscount, Number(discountStr), actualAmount);

            if (amountToDiscount < actualAmount) {
                updateState(previousData => {
                    const newData = [...previousData.data]

                    const updatedItem = {
                        ...newData[index],
                        discount: Number(amountToDiscount)
                    };

                    updatedItem.iva = getIVA(updatedItem, updatedItem.percentIva);
                    updatedItem.amount = getTotal(updatedItem);
                    newData[index] = updatedItem;

                    return {
                        data: newData
                    };
                });                  

                refreshDataHTML(getState().data);
                closeOverlay(getElement(Class.main.overlay));
            } else {
                newAlert({
                    title: "AVISO",
                    text: "El descuento no puede ser mayor al total del articulo. Ingrese un descuento valido",
                    icon: "info",
                });
            }
        } else {
            newAlert({
                title: "Error",
                text: "Escriba un descuento valido",
                icon: "error"
            });
        }
    } else {
        closeOverlay(getElement(Class.main.overlay));
    }
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

/**
 * @param {String} pay
 * @param {String} paymentMethod
 */
const insertDataPayment = (pay, paymentMethod) => {
    const paymentsContainer = getElement('.details');
    const price = getElement('.paymentPrice');
    const actualAmount = price.textContent.replace("$", "");
    const total = getElement(Class.label.totalTicket).textContent.replace("$", "");

    if (validatePayment(Number(pay) + Number(actualAmount), total)) {
        updateState(previousData => {
            const newPayment = [...previousData.payment, {
                amount: Number(pay),
                paymentMethod: paymentMethod,
                id: previousData.payments + 1
            }];

            return { 
                payment: newPayment, payments: ++(previousData.payments) 
            };
        });

        paymentsContainer.appendChild(getParsedHTML(getNewPaymentHTML(pay, paymentMethod, getState().payments)));
        price.textContent = getNewPrice(price, Number(pay));
    
        if (validateMaxHeight(getElement('.containerTicket'), 0.89) && !paymentsContainer.classList.contains('itemScroll')) {
            paymentsContainer.classList.add('itemsScroll');
        }
    } else {
        newAlert({
            icon: "error",
            title: "AVISO",
            text: "El anticipo o pago no puede exceder el total de la venta"
        });
    }
};