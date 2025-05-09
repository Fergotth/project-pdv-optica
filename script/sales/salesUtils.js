import { getItemRowInnerHTML, getDiscountContainerHTML, getContainerIVAHTML, getSearchClientContainerHTML } from "./domSales.js";
import { getState, updateState } from "./stateSales.js";
import { getIVA, getAmount } from "./salesCalculations.js";

/**
 * 
 * @param {HTMLElement} element 
 * @returns 
 */
export const validateElement = (element) => {
    if (!element) {
        throw new Error("Elemento no existe en el DOM");
    }

    return element;
};

/**
 * 
 * @param {Object} newData 
 */
export const refreshDataHTML = (newData) => {
    const listProduct = validateElement(document.querySelector('.container--shoppingArticles'));
    const totalLabel = validateElement(document.querySelector('.container--totalPrice'));
    const subtotalLabel = validateElement(document.querySelector('.subtotalValue span'));
    const ivaLabel = validateElement(document.querySelector('.ivaValue span'));
    const discountLabel = validateElement(document.querySelector('.discountValue span'));
    let total = 0;
    let subtotal = 0;
    let iva = 0;
    let discount = 0;

    listProduct.innerHTML = '';
    
    for (const item of newData) {
        let newItem = document.createElement('div');
        newItem.classList.add('itemRow');
        newItem.innerHTML = getItemRowInnerHTML(item);
        subtotal += item.price * item.quantity;
        iva += item.iva;
        discount += item.discount;
        total += item.amount;
        listProduct.appendChild(newItem);
    }

    subtotalLabel.textContent = `$${parseFloat(subtotal).toFixed(2)}`;
    ivaLabel.textContent = `$${parseFloat(iva).toFixed(2)}`;
    discountLabel.textContent = `$${parseFloat(discount).toFixed(2)}`;
    totalLabel.textContent = `Total: $${parseFloat(total).toFixed(2)}`;
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
                amount: getAmount(filteredData[i])
            }));
        
        return {
            data: finalData                    
        };
    });
    
    refreshDataHTML(getState().data);
};

export const setDiscount = ({ button, input, typeOfDiscount, index }) => {
    const overlayScreen = document.querySelector('.overlay');

    if (button.classList.contains('btnAccept')) {
        const regex = /^(?:\d+)(?:\.\d{1,2})?$/;
        const discountStr = input.value.trim();

        if (regex.test(discountStr) && discountStr !== "" && !isNaN(parseFloat(discountStr))) {
            const item = getState().data[index];
            const actualAmount = item.price * item.quantity;
            const amountToDiscount = typeOfDiscount.checked ? parseFloat(discountStr) : actualAmount * (parseFloat(discountStr) / 100);

            if (amountToDiscount < actualAmount) {
                updateState(previousData => {
                    const newData = [...previousData.data]

                    const updatedItem = {
                        ...newData[index],
                        discount: parseFloat(amountToDiscount)
                    };

                    updatedItem.iva = getIVA(updatedItem, updatedItem.percentIva);
                    updatedItem.amount = getAmount(updatedItem);
                    newData[index] = updatedItem;

                    return {
                        data: newData
                    };
                });                  

                refreshDataHTML(getState().data);
                if (overlayScreen) overlayScreen.remove();
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
        if (overlayScreen) overlayScreen.remove();
    }
};

export const showPromptIVA = (element) => {
    element.appendChild(insertNewHTML(getContainerIVAHTML()));
};

export const showPromptDiscount = (index, element) => {
    element.appendChild(insertNewHTML(getDiscountContainerHTML(index)));
};

export const changeLabelIva = (percentIva) => {
    const ivaLabel = document.querySelector('.amount--percentIVA');
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