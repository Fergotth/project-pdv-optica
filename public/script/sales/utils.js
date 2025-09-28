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
import { 
    getDataDB,
    getQuoationDB 
} from "./getData.js";
import { validateData } from "./validations.js";
import { newAlert } from "../utils/alerts.js";
import { 
    handlerDeleteCart, 
    handlerPaymentCloseIcon 
} from "./handlers.js";
import { loader } from '../utils/loader.js';
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
    handlerPaymentCloseIcon({ DOM: document.querySelector('.overlayPromptDiscount') || null });
    
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

export const generateTicket = async (NextID, type, receiptID = undefined) => {
    try {
        loader(true);
        const response = await fetch('/generate-ticketPDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NextID, type, receiptID })
        });

        if (!response.ok) {
            const errorText = await response.text(); // <- captura error
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json(); // <- seguro ahora
        console.log('PDF creado:', data.file);
        window.open(data.file, '_blank');
    } catch (err) {
        console.error('Error al generar el PDF:', err);
    } finally {
        loader(false);
    }
};

export const numberToWords = (number) => {
    const units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const specials = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    const toWords = (num) => {
        if (num === 0) return 'cero';
        if (num === 100) return 'cien';

        let text = '';

        const millions = Math.floor(num / 1000000);
        const thousands = Math.floor((num % 1000000) / 1000);
        const remainder = num % 1000;

        if (millions > 0) {
            if (millions === 1) text += 'un millón ';
            else text += `${toWords(millions)} millones `;
        }

        if (thousands > 0) {
            if (thousands === 1) text += 'mil ';
            else text += `${toWords(thousands)} mil `;
        }

        const hundred = Math.floor(remainder / 100);
        const dec = Math.floor((remainder % 100) / 10);
        const unit = remainder % 10;

        if (hundred > 0) text += hundreds[hundred] + ' ';

        if (dec === 1 && unit > 0) {
            text += specials[unit] + ' ';
        } else if (dec > 0) {
            text += tens[dec];
            if (unit > 0) {
                if (dec === 2) {
                    text += 'i' + units[unit];
                } else {
                    text += ' y ' + units[unit];
                }
            }
            text += ' ';
        } else if (unit > 0) {
            text += units[unit] + ' ';
        }

        return text.trim();
    };

    const integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100);

    const integerText = toWords(integerPart);
    const centavos = decimalPart.toString().padStart(2, '0');

    return `${integerText} ${centavos}/100`;
};

export const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convierte a formato 12 horas

    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
};

export const extractProducts = (data) => {
    const regExp = /s[a-zA-Z0-9]+\?\d+/g;
    const products = data.match(regExp) || [];

    const result = products.map(item => {
        const match = item.match(/s([a-zA-Z0-9]+)\?(\d+)/);
        return {
            sku: match[1],
            quantity: parseInt(match[2], 10)
        };
    });

    return result;
};

export const createStringProducts = (products) => {
    return products.map(item => `s${item.SKU}?${item.Quantity}`).join('');
};

export const findQuotation = async (quotation) => {
    const [quotations] = await getQuoationDB(quotation);

    if (!quotations) {
        console.warn("No se encontraron cotizaciones en la base de datos.");
        return null;
    }

    return {
        ClientID: quotations.ClientID,
        Subtotal: quotations.Subtotal,
        Discount: quotations.Discount,
        ExistIVA: quotation.IVA ? true : false,
        Total: quotations.Total,
        Products: extractProducts(quotations.Products)
    };
};

export const existInCart = (SKU) => {
    try {
        const items = Array.from(getElement(Class.list.itemsInCart).querySelectorAll('.product-image')).find(item => item.dataset.sku === SKU);
        
        if (!items) return null;

        return items.closest('.item')?.querySelector('.button-quantity') || null;
    } catch (error) {
        console.log("Articulo no esta aun en carrito, se agrega nuevo");
        return null;
    }
};