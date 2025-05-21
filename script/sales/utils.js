import { getItemRowInnerHTML } from "./salesDom.js";
import { getState, updateState } from "./state.js";
import { getIVA, getTotal, getSubTotal, getDiscount, getNewPrice } from "./calculations.js";
import { validateElement, validatePayment, validateValue, validateRegex } from "./validations.js";
import { newAlert } from "../utils/alerts.js";
import Class from "./consts.js";

/**
 * 
 * @param {Object} newData // Objeto que contiene los datos del nuevo producto a mostrar
 */
export const refreshDataHTML = (newData) => {
    const listProduct = validateElement(Class.list.products);
    const totalLabel = validateElement(Class.label.total);
    const subtotalLabel = validateElement(Class.label.subTotal);
    const ivaLabel = validateElement(Class.label.iva);
    const discountLabel = validateElement(Class.label.discount);
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
                closeOverlay(validateElement(Class.main.overlay));
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
        closeOverlay(validateElement(Class.main.overlay));
    }
};

/**
 * @param {Integer} percentIva  // Porcentaje de IVA
 */
export const changeLabelIva = (percentIva) => {
    const ivaLabel = validateElement(Class.label.percent);
    if (ivaLabel) {
        ivaLabel.textContent = `${percentIva}%`;
    }
};

/**
 * 
 * @param {String} innerHTML    // String que contiene el HTML para insertar
 * @returns {HTMLElement} 
 */
export const insertNewHTML = (innerHTML) => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(innerHTML, 'text/html');
    const parsedElement = parsed.body.firstChild;

    if (parsedElement) {
        return parsedElement;
    }
};

/**
 * 
 * @param {HTMLElement} element     // Elemento overlay a remover
 */
export const closeOverlay = (element) => {
    element.remove();
};

/**
 * 
 * @param {Object} clients  // Objeto que contiene a los clientes
 * @param {String} name     // Nombre a buscar
 * @returns {Object}        // Objeto con los clientes encontrados
 */
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

/**
 * 
 * @param {HTMLElement} dom     // Contenedor donde se esta trabajando
 * @param {Object} client       // Objeto que contiene los clientes a mostrar
 */
export const addClientToList = (dom, client) => {
    const newElement = dom.querySelector('label');
    let listClients = dom.querySelector(Class.list.clients);

    if (!listClients) {
        newElement.insertAdjacentHTML('afterend', '<div class="listClients"></div>');
        listClients = dom.querySelector(Class.list.clients);
    } else {
        listClients.innerHTML = '';
    }

    if (!dom.classList.contains('resizeForm')) {
        dom.classList.add('resizeForm');
    }

    for(let item of client) {
        listClients.appendChild(insertNewHTML(`<span class="clientName" data-id="${item.id}">${item.name}</span>`));
    }
};

/**
 * 
 * @param {Object} data     // Objeto con los datos de los articulos de la venta
 * @param {String} client   // Nombre del cliente
 */
export const insertDataSales = (data, client) => {
    const items = validateElement(Class.list.items);
    const totalLabel = validateElement(Class.label.totalTicket);
    const resumeLabelTicket = validateElement(Class.label.titleCard);
    resumeLabelTicket.textContent = client;
    let total = 0;

    for(const item of data) {
        items.appendChild(insertNewHTML(`<p>${item.quantity}x ${item.description} ${item.material}</p>`));
        total += getTotal(item);
    }

    totalLabel.textContent = `$${total.toFixed(2)}`;
};

/**
 * 
 * @param {HTMLElement} pay // Input de cantidad a abonar
 * @param {String} total    // Total de la venta pendiente por pagar
 */
export const setPayment = (pay, total) => {
    const payment = pay.value.trim();

    if (validateRegex(payment)) { debugger
        if (validatePayment(payment, total)){
            const paymentMethod = getMethodPayment();
            
            if (paymentMethod) {
                insertDataPayment(payment, paymentMethod.value);
                paymentMethod.checked = false;
                pay.value = '';
            } else {
                newAlert({
                    icon: "info",
                    title: "AVISO",
                    text: "No se ha seleccionado la forma de pago"
                });
            }
        } else {
            newAlert({
                icon: "info",
                title: "Aviso",
                text: "El abono o pago no puede ser mayor al total de la venta"
            });
        }
    } else {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "Escriba una cantidad valida"
        });
    }
};

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
    const paymentsContainer = validateElement('.details');
    const price = validateElement('.paymentPrice');
    const actualAmount = price.textContent.replace("$", "");
    const total = validateElement(Class.label.totalTicket).textContent.replace("$", "");

    if (validatePayment(Number(pay) + Number(actualAmount), total)) {
        paymentsContainer.appendChild(insertNewHTML(`<span>${paymentMethod}</span>`));
        paymentsContainer.appendChild(insertNewHTML(`<span>$${Number(pay).toFixed(2)}</span>`));
        price.textContent = getNewPrice(price, Number(pay));
    } else {
        newAlert({
            icon: "error",
            title: "AVISO",
            text: "El anticipo o pago no puede exceder el total de la venta"
        });
    }
};