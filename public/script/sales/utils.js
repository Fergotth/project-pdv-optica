import { getState, updateState, flushState } from "./state.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
import { getProductHTML, getLoaderHTML } from "./salesDom.js";
import { getDataDB } from "./getData.js";
import { validateData } from "./validations.js";
import { newAlert } from "../utils/alerts.js";
import Class from "./consts.js";

export const handleProductCategory = async ({ DOM, url, category, title, message }) => {
    const products = await getDataDB(url);

    if (!validateData(products, category)) {
        newAlert({
            icon: "info",
            title: title,
            text: `No hay ${message} registrados en la base de datos`
        });
        return;
    }

    if (["monofocal", "bifocal", "progresivo"].includes(category.toLowerCase())) {
        DOM.replaceChildren();
        products.forEach(product => {
            if (product.Description?.toLowerCase().includes(category.toLowerCase())) {
                DOM.appendChild(getParsedHTML(getProductHTML(product)));
            }
        });
    } else {
        setItemsToCart(DOM, products, category);
    }
};

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
        setSubtotal(quantity * Number(DOM.closest('.item').querySelector(Class.label.unitprice).textContent.replace("$","")));
        setNewPrice(DOM.closest('.item'), newQuantity);
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
};

export const updateItemsCart = (quantity) => {
    updateState(previusData => {
        return { 
            cartItems: previusData.cartItems + quantity
        };
    });

    getElement(Class.label.cartTotalItems).textContent = getState().cartItems;
};

export const setItemsToCart = (DOM, products, category) => {
    DOM.replaceChildren();
    products.forEach(product => {
        if (product.Category == category)
            DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
};

export const setSubtotal = (price) => {
    updateState(previusData => {
        return {
            subtotal: previusData.subtotal + price
        };
    });
    
    getElement(Class.label.subtotal).textContent = formatMoney(getState().subtotal);
};

export const setNewPrice = (DOM, quantity) => { 
    const price = DOM.querySelector(Class.label.itemprice);
    const unitPrice = Number(DOM.querySelector(Class.label.unitprice).textContent.replace("$", ""));
    price.textContent = formatMoney(unitPrice * quantity);
};

export const formatMoney = (value) => {
    return `$${value.toFixed(2)}`;
}

export const closeOverlayOpened = (DOM) => {
    if (DOM) DOM.remove();
};

export const resetDiscountValue = () => {
    updateState(() => {
        return {
            discount: 0
        };
    });
    getElement(Class.label.discount).textContent = `${formatMoney(0)}`;
};

export const loader = (param) => {
    if (!getState().procesing) {
        const DOM = getElement(Class.form.sales);
        DOM.appendChild(getParsedHTML(getLoaderHTML()));
    } else {
        getElement(Class.list.overlay).remove();
    }
    
    updateState(() => {
            return {
                procesing: param
            };
        });
};