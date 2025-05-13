import { getItemRowInnerHTML } from "./salesDom.js";
import { getState, updateState } from "./state.js";
import { getIVA, getTotal, getSubTotal, getDiscount } from "./calculations.js";
import { newAlert } from "../utils/alerts.js";
import Class from "./consts.js";

/**
 * 
 * @param {HTMLElement} element     // Elemento HTML
 * @returns {HTMLElement}           // Regresa el elemento validado
 */
export const validateElement = (element) => {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Elemento no existe en el DOM");
    }

    return element;
};

/**
 * 
 * @param {HTMLElement | Number} element    // Elemento HTML o dato numerico
 * @returns                                 // Valor numerico
 */
export const validateValue = (element) => {
    try {
        let value = 0;
        if (element && element instanceof HTMLElement && typeof element !== 'undefined') {
            if ('id' in element.dataset) {
                value = Number(element.dataset.id);
            }

            if ('value' in element.dataset) {
                value = Number(element.dataset.value);
            }
        } else if (element && !isNaN(element) && element !== '') {
            value = Number(element);
        }

        return value;
    } catch (error) {
        throw new Error('Valor incorrecto o tipo de dato incorrecto');
    }
};

/**
 * 
 * @param {Object} newData // Objeto que contiene los datos del nuevo producto a mostrar
 */
export const refreshDataHTML = (newData) => {
    const listProduct = validateElement(document.querySelector(Class.listProduct));
    const totalLabel = validateElement(document.querySelector(Class.total));
    const subtotalLabel = validateElement(document.querySelector(Class.subTotal));
    const ivaLabel = validateElement(document.querySelector(Class.iva));
    const discountLabel = validateElement(document.querySelector(Class.discount));
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

export const setDiscount = ({ button, input, typeOfDiscount, index }) => {
    if (button.classList.contains('btnAccept')) {
        const regex = /^(?:\d+)(?:\.\d{1,2})?$/;
        const discountStr = input.value.trim();

        if (regex.test(discountStr) && discountStr !== "" && !isNaN(Number(discountStr))) {
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
                closeOverlay(validateElement(document.querySelector(Class.overlay)));
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
        closeOverlay(validateElement(document.querySelector(Class.overlay)));
    }
};

export const changeLabelIva = (percentIva) => {
    const ivaLabel = validateElement(document.querySelector(Class.percent));
    if (ivaLabel) {
        ivaLabel.textContent = `${percentIva}%`;
    }
};

export const insertNewHTML = (innerHTML) => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(innerHTML, 'text/html');
    const parsedElement = parsed.body.firstChild;

    if (parsedElement) {
        return parsedElement;
    }
};

export const closeOverlay = (element) => {
    element.remove();
};

export const searchClient = (clients, name) => {
    return (
        clients.filter(px => {
        const inName = px.name.toLowerCase().includes(name.toLowerCase());
        const inLastName = px.lastName.toLowerCase().includes(name.toLowerCase());
        
        return inName || inLastName;
        })
        .map(px => ({
            id: px.id,
            name: `${px.name} ${px.lastName}`
        }))
    );
};

const formatMoney = (item) => {
    validateValue(item);
    return Number(item).toFixed(2);
}