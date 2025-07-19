import { 
    getState, 
    updateState, 
    flushState 
} from "./state.js";
import { 
    getElement, 
    getParsedHTML 
} from "../utils/getElement.js";
import { 
    getProductHTML, 
    getLoaderHTML 
} from "./salesDom.js";
import { 
    subtotal,
    IVA,
    total,
    calculateDOMSubtotal
} from "./calculation.js";
import { getDataDB } from "./getData.js";
import { validateData } from "./validations.js";
import { newAlert } from "../utils/alerts.js";
import { 
    handlerDeleteCart, 
    handlerPaymentCloseIcon 
} from "./handlers.js";
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
        setNewPrice(DOM.closest('.item'), newQuantity);
        recalculateSummary();
    }
};

/**
 * 
 * 
 */
export const restartSaleForm = async () => {
    await handlerDeleteCart({ DOM: getElement(Class.list.itemsInCart), param: false });
    handlerPaymentCloseIcon({ DOM: getElement('.overlayPromptDiscount') });
    
    const inputClient = getElement('.input-client');
    inputClient.textContent = 'Publico General';
    inputClient.dataset.id = 0;
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
    getElement(Class.label.subtotal).textContent = formatMoney(subtotal(price));
};

export const setTotal = () => {
    getElement(Class.label.total).textContent = `${formatMoney(total())}`;
}

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
            discount: 0,
            iva: IVA(getElement('.applyIVA').checked)
        };
    });
    recalculateSummary();
};

export const loader = (param) => {
    updateState(() => ({
        procesing: param
    }));

    const DOM = document.body;

    if (param) {
        // Mostrar loader
        DOM.appendChild(getParsedHTML(getLoaderHTML()));
    } else {
        // Ocultar loader si existe
        const overlay = getElement('.overlayLoader');
        if (overlay) {
            overlay.remove();
        }
    }
};

export const recalculateSummary = () => {
    const state = getState();
    const applyIVA = getElement('.applyIVA').checked;
    
    setMoneyContent(Class.label.subtotal, calculateDOMSubtotal());
    setMoneyContent(Class.label.iva, IVA(applyIVA));
    setMoneyContent(Class.label.discount, state.discount || 0, true);
    setMoneyContent(Class.label.total, total());
    getElement(Class.label.cartTotalItems).textContent = state.cartItems;
};

const setMoneyContent = (selector, value, isNegative = false) => {
    const el = getElement(selector);
    const displayValue = `${isNegative ? "- " : ""}$${value.toFixed(2)}`;
    if (el) el.textContent = displayValue;
};