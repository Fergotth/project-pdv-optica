import { 
    getState, 
    updateState 
} from "./state.js";
import { 
    getElement, 
    getParsedHTML 
} from "../utils/getElement.js";
import { getProductHTML } from "./salesDom.js";
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

export const generateTicketSale = async (NextID) => {
    try {
        const response = await fetch('/generate-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NextID })
        });

        if (!response.ok) {
            const errorText = await response.text(); // <- captura error
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json(); // <- seguro ahora
        console.log('✅ PDF creado:', data.file);
        window.open(data.file, '_blank');
    } catch (err) {
        console.error('❌ Error al generar el PDF:', err);
    }
};

export const numberToWords = (number) => {
    const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const specials = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve"];
    const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

    if (number === 0) return "cero";
    if (number === 100) return "cien";
    if (number === 1000) return "mil";

    let result = '';

    const h = Math.floor(number /100);

    if (h > 0) {
        result += hundreds[h] + ' ';
        number %= 100;
    }

    if (number >= 10 && number < 20) {
        result += specials[number - 10];
    } else {
        const t = Math.floor(number / 10);

        if (t > 0) {
            result += tens[t];
            number %= 10;

            if (number > 0) result += ' y ';
        }

        if (number > 0) result += units[number];
    }

    return result.trim();
};