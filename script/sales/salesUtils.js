import { getItemRowInnerHTML, getDiscountContainerHTML, getContainerIVAHTML, getSearchClientContainerHTML } from "./salesDom.js";
import { getState, updateState } from "./stateSales.js";
import { getIVA, getTotal, getSubTotal } from "./salesCalculations.js";
import { newAlert } from "../utils/alerts.js";
import Class from "./salesConsts.js";

/**
 * 
 * @param {HTMLElement} element 
 * @returns {HTMLElement}
 */
export const validateElement = (element) => {
    if (!element) {
        throw new Error("Elemento no existe en el DOM");
    }

    return element;
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

    const formatMoney = (item) => {
        if (isNaN(item)) {
            throw new Error('Valor invalido');
        }

        return parseFloat(item).toFixed(2);
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
            .map((item, i, filteredData) => ({
                ...item,
                position: i,
                iva: getIVA(item, previousData.percentIva),
                amount: getTotal(filteredData[i])
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

        if (regex.test(discountStr) && discountStr !== "" && !isNaN(parseFloat(discountStr))) {
            const item = getState().data[index];
            const actualAmount = getSubTotal(item);
            const amountToDiscount = typeOfDiscount.checked ? parseFloat(discountStr) : actualAmount * (parseFloat(discountStr) / 100);

            if (amountToDiscount < actualAmount) {
                updateState(previousData => {
                    const newData = [...previousData.data]

                    const updatedItem = {
                        ...newData[index],
                        discount: parseFloat(amountToDiscount)
                    };

                    updatedItem.iva = getIVA(updatedItem, updatedItem.percentIva);
                    updatedItem.amount = getTotal(updatedItem);
                    newData[index] = updatedItem;

                    return {
                        data: newData
                    };
                });                  

                refreshDataHTML(getState().data);
                closeOverlay(document.querySelector(Class.overlay));
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
        closeOverlay(document.querySelector(Class.overlay));
    }
};

export const showPromptIVA = (element) => {
    element.appendChild(insertNewHTML(getContainerIVAHTML()));
};

export const showPromptDiscount = (index, element) => {
    element.appendChild(insertNewHTML(getDiscountContainerHTML(index)));
};

export const changeLabelIva = (percentIva) => {
    const ivaLabel = document.querySelector(Class.percent);
    if (ivaLabel) {
        ivaLabel.textContent = `${percentIva}%`;
    }
};

export const showPromptSearchClient = (element) => {
    element.appendChild(insertNewHTML(getSearchClientContainerHTML()));
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
    if (element) element.remove();
};

export const validateValue = (button) => {
    try {
        let value = 0;
        if ('id' in button.dataset) {
            value = parseInt(button.dataset.id, 10);
        }

        if ('value' in button.dataset) {
            value = parseInt(button.dataset.value, 10);
        }

        return value;
    } catch (error) {
        throw new Error('Valor no encontrado');
    }
};