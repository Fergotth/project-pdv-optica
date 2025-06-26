import { getState, updateState, flushState } from "./state.js";
import { getIVA, getTotal, getSubTotal, getDiscount, getNewPrice } from "./calculations.js";
import { validatePayment, validateValue, validateRegex, validateMaxHeight } from "./validations.js";
import { getElement } from "../utils/getElement.js";
import { getParsedHTML } from "../utils/getElement.js";
import { closeOverlay } from "../utils/removeOverlay.js";
import { newAlert } from "../utils/alerts.js";
import { getDataClientDB } from "../clients/getData.js";
import Class from "./consts.js";

/**
 * 
 * @param {Object} newData // Objeto que contiene los datos del nuevo producto a mostrar
 */
export const refreshDataHTML = (newData) => {
    const listProduct = getElement(Class.list.products);
    const totalLabel = getElement(Class.label.total);
    const subtotalLabel = getElement(Class.label.subTotal);
    const ivaLabel = getElement(Class.label.iva);
    const discountLabel = getElement(Class.label.discount);
    let total = 0, subtotal = 0, iva = 0, discount = 0;

    listProduct.innerHTML = '';
    
    for (const item of newData) {
        let newItem = document.createElement('div');
        newItem.classList.add('itemRow');
        newItem.innerHTML = getItemRowInnerHTML(item);
        subtotal += getSubTotal(item);
        iva += item.iva;
        discount += item.discount;
        total += item.amount;
        listProduct.appendChild(newItem);
    }

    subtotalLabel.textContent = `$${formatMoney(subtotal)}`;
    ivaLabel.textContent = `$${formatMoney(iva)}`;
    discountLabel.textContent = `$${formatMoney(discount)}`;
    totalLabel.textContent = `Total: $${formatMoney(total)}`;
};

/**
 * 
 * @param {HTMLElement} button  // Elemento seleccionado
 * @param {Integer} index       // Indice del objeto
 */
export const handleQuantityButton = (button, index) => {
    const isMinus = button.classList.contains('minus');
    const quantity = isMinus ? -1 : 1;

    updateState(previousData => {
        const newData = [...previousData.data];
        
        newData[index] = {
            ...newData[index],
            quantity: newData[index].quantity + quantity,
            discount: quantity < 0 ? 0 : newData[index].discount
        };

        const finalData = newData
            .filter(item => item.quantity > 0)
            .map((item, i) => ({
                ...item,
                position: i,
                iva: getIVA(item, previousData.percentIva)
            }))
            .map(item => ({
                ...item,
                amount: getTotal(item)
            }));
        
        return {
            data: finalData                    
        };
    });
    
    refreshDataHTML(getState().data);
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
 * 
 * @returns {HTMLElement}   // Radio button seleccionado de forma de pago
 */
const getMethodPayment = () => {
    const typeOfMethod = document.querySelectorAll('.payment-container input[type="radio"]');
    return Array.from(typeOfMethod).find(method => method.checked) || null;
};

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