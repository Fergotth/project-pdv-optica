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

export const createTicketSaleHTML = (nextID, cartItems, payments, summarySale) => {
    let productsItems = '';
    cartItems.forEach(product => {
        productsItems += `
            <div class="itemTicket">
                <div>${product.Quantity}</div>
                <div>${product.Product}</div>
                <div>${formatMoney(product.Price * product.Quantity)}</div>
            </div>
        `;
    });

    let paymentsItems = '';
    let totalPaid = 0;
    payments.forEach(payment => {
        paymentsItems += `
            <div>${payment.PaymentMethod}</div>
            <div>${formatMoney(payment.Paid)}</div>
        `;
        totalPaid += payment.Paid;
    });

    const ticketInnerHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>Ticket</title>
    <style>
        body {
            font-family: monospace;
            width: 80mm;
            margin: 5px;
        }

        .logoTicket {
            background-color: black;
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }

        .clientTicket {
            width: 100%;
            margin-bottom: 10px;
        }

        .divisorTicket {
            width: 100%;
            border-top: 1px dashed gray;
        }

        .titleTicket {
            width: 100%;
            margin: 10px 0;
            text-align: center;
            font-size: 1rem;
        }

        .detailsTicket {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 15px 0;
        }

        .headerArticlesTicket {
            margin: 15px 0 10px 0;
            font-weight: bold;
            display: flex;
            flex-direction: row;
        }

        .headerArticlesTicket div:nth-child(1) {
            width: 20%;
        }

        .headerArticlesTicket div:nth-child(2) {
            width: 60%;
        }

        .headerArticlesTicket div:nth-child(3) {
            width: 20%;
        }

        .itemTicket {
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;
        }

        .itemTicket div:nth-child(1) {
            width: 20%;
            text-align: center;
        }

        .itemTicket div:nth-child(2) {
            width: 60%;
        }

        .itemTicket div:nth-child(3) {
            width: 20%;
        }

        .quantityArticlesTicket {
            margin: 15px 0 10px 0;
        }

        .quantityArticlesTicket span {
            font-weight: 600;
        }

        .summaryTicket, .paymentsTicket {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            text-align: right;
            margin: 10px 0 10px 0;
        }

        .summaryTicket > div {
            width: 70%;
        }

        .summaryTicket > span {
            width: 30%;
        }

        .totalTicket, .totalTicket + span {
            font-weight: 600;
        }

        .totalInWords {
            margin-bottom: 10px;
        }

        .paymentsTicket div:nth-child(odd) {
            font-size: bold;
            width: 50%;
            text-align: left;
        }

        .paymentsTicket div:nth-child(even) {
            text-align: right;
            font-weight: 600;
            width: 50%;
        }

        .titlePaymentsTicket {
            margin-top: 5px;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .paymentSummaryTicket {
            display: flex;
            flex-wrap: wrap;
        }

        .paymentSummaryTicket div:nth-child(1) {
            width: 50%;
        }

        .paymentSummaryTicket div:nth-child(2) {
            width: 50%;
            text-align: right;
            font-weight: 600;
        }
        
        .unpaidSummaryTicket {
            display: flex;
            flex-wrap: wrap;
        }

        .unpaidSummaryTicket div:nth-child(1) {
            width: 50%;
            margin-bottom: 5px;
        }

        .unpaidSummaryTicket div:nth-child(2) {
            width: 50%;
            text-align: right;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .footerTicket  {
            margin-top: 20px;
        }
        
        .footerTicket * {
            margin: 0;
        }

        .footerTicket p {
            text-align: center;
        }

    </style>
    </head>
    <body>
    <header class="logoTicket">
        <img src="../icons/FernaSoft.svg" alt="">
    </header>
    <div class="divisorTicket"></div>
    <div class="titleTicket">Ticket de Compra</div>
    <div class="divisorTicket"></div>
    <div class="detailsTicket">
        <div class="numberTicket">No. Folio: ${nextID}</div>
        <div class="dateTicket">${getCurrentDateTime()}</div>
    </div>
    <div class="clientTicket">Cliente: Fernando Peralta Rodriguez</div>
    <div class="divisorTicket"></div>
    <div class="headerArticlesTicket">
        <div>Cant.</div>
        <div>Producto</div>
        <div>Importe</div>
    </div>
    <div class="itemsTicketTicket">
        ${productsItems}
    </div>
    <div class="quantityArticlesTicket">>> Numero de Articulos: <span>25</span></div>
    <div class="divisorTicket"></div>
    <div class="summaryTicket">
        <div class="subtotalTicket">Subtotal:</div>
        <span>${summarySale.subtotal}</span>
        <div class="discountTicket">Descuentos:</div>
        <span>${summarySale.discount}</span>
        <div class="ivaTicket">IVA 8%:</div>
        <span>${summarySale.iva}</span>
        <div class="totalTicket">Total:</div>
        <span>${summarySale.total}</span>
    </div>
    <div class="totalInWords">(${numberToWords(summarySale.total)})</div>
    <div class="divisorTicket"></div>
    <div class="titlePaymentsTicket">Pagos realizados</div>
    <div class="paymentsTicket">
        ${paymentsItems}
    </div>
    <div class="paymentSummaryTicket">
        <div>Total Abonado</div>
        <div>${formatMoney(totalPaid)}</div>
    </div>
    <div class="unpaidSummaryTicket">
        <div>Saldo Pendiente</div>
        <div>${formatMoney(summarySale.total - totalPaid)}</div>
    </div>
    <div class="divisorTicket"></div>
    <div class="divisorTicket"></div>
    <div class="footerTicket">
        <p>Empresa: Ferna Soft</p>
        <p>C. Cuarta #440 - 3, Zona Centro, CP: 22800</p>
        <p>Telefono: (646) 2049630</p>
        <p>!!! Muchas gracias por su preferencia !!!</p>    
    </div>
    </body>
    </html>
    `;

    console.log(ticketInnerHTML);
};

const getCurrentDateTime = () => {
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