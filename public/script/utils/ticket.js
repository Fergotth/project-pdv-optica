import { 
    formatMoney, 
    getCurrentDateTime, 
    numberToWords 
} from "../sales/utils.js";

/**
 * Costruye la estructura HTML para generar el ticket y devuelve su innerHTML
 * @param {Integer} nextID 
 * @param {Object} cartItems 
 * @param {Object} payments 
 * @param {Object} summarySale 
 * @param {Integer} percentIVA 
 * @param {Number} dolar 
 * @returns {String}
 */
export const createTicketSaleHTML = (nextID, cartItems, payments, summarySale, percentIVA, dolar) => {
    let totalItems = 0;
    let productsItems = '';
    cartItems.forEach(product => {
        productsItems += `
            <div class="itemTicket">
                <div>${product.Quantity}</div>
                <div>${product.Product}</div>
                <div>${formatMoney(product.Price * product.Quantity)}</div>
            </div>
        `;
        totalItems += product.Quantity;
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

    const unpaidAmount = (summarySale.total - totalPaid) < 0 ?
        (summarySale.total - totalPaid) * -1 : summarySale.total - totalPaid;

    const clientName = document.querySelector('.input-client').textContent;

    const ticketInnerHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>Ticket</title>
    <style>
        @page {
            size: 80mm auto;
        }
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
    <div class="clientTicket">Cliente: ${clientName}</div>
    <div class="divisorTicket"></div>
    <div class="headerArticlesTicket">
        <div>Cant.</div>
        <div>Producto</div>
        <div>Importe</div>
    </div>
    <div class="itemsTicketTicket">
        ${productsItems}
    </div>
    <div class="quantityArticlesTicket">>> Numero de Articulos: <span>${totalItems}</span></div>
    <div class="divisorTicket"></div>
    <div class="summaryTicket">
        <div class="subtotalTicket">Subtotal:</div>
        <span>${formatMoney(summarySale.subtotal)}</span>
        <div class="discountTicket">Descuentos:</div>
        <span>${formatMoney(summarySale.discount)}</span>
        <div class="ivaTicket">IVA ${percentIVA}%:</div>
        <span>${formatMoney(summarySale.iva)}</span>
        <div class="totalTicket">Total:</div>
        <span>${formatMoney(summarySale.total)}</span>
    </div>
    <div class="totalInWords">(${numberToWords(summarySale.total)})</div>
    <div class="divisorTicket"></div>
    <div class="dollarValue">Tipo de cambio: $${dolar}</div>
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
        <div>${formatMoney(unpaidAmount)}</div>
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

    return ticketInnerHTML;
};

/**
 * Crea y devuelve el innerHTML para el ticket de cotizacion
 * @param {Object} data 
 * @returns {String}
 */
export const createTicketQuotationHTML = (data) => {
    let totalItems = 0;
    let productsItems = '';
    data.products.forEach(product => {
        productsItems += `
            <div class="itemTicket">
                <div>${product.Quantity}</div>
                <div>${product.Product}</div>
                <div>${formatMoney(product.Price * product.Quantity)}</div>
            </div>
        `;
        totalItems += product.Quantity;
    });

    const clientName = document.querySelector('.input-client').textContent;
    const ticketInnerHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>Ticket</title>
    <style>
        @page {
            size: 80mm auto;
        }
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
    <div class="titleTicket">Cotizacion</div>
    <div class="divisorTicket"></div>
    <div class="detailsTicket">
        <div class="numberTicket">No. Folio: ${data.nextID}</div>
        <div class="dateTicket">${getCurrentDateTime()}</div>
    </div>
    <div class="clientTicket">Cliente: ${clientName}</div>
    <div class="divisorTicket"></div>
    <div class="headerArticlesTicket">
        <div>Cant.</div>
        <div>Producto</div>
        <div>Importe</div>
    </div>
    <div class="itemsTicketTicket">
        ${productsItems}
    </div>
    <div class="quantityArticlesTicket">>> Numero de Articulos: <span>${totalItems}</span></div>
    <div class="divisorTicket"></div>
    <div class="summaryTicket">
        <div class="subtotalTicket">Subtotal:</div>
        <span>${formatMoney(data.subtotal)}</span>
        <div class="discountTicket">Descuentos:</div>
        <span>${formatMoney(data.discount)}</span>
        <div class="ivaTicket">IVA ${data.percentIVA}%:</div>
        <span>${formatMoney(data.iva)}</span>
        <div class="totalTicket">Total:</div>
        <span>${formatMoney(data.total)}</span>
    </div>
    <div class="totalInWords">(${numberToWords(data.total)})</div>
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

    return ticketInnerHTML;
};

/**
 * Crea y devuelve el innerHTML para el ticket de abono
 * @param {Integer} nextID 
 * @param {Object} cartItems 
 * @param {Object} payments 
 * @param {Number} summarySale 
 * @param {Number} dolar 
 * @returns {String}
 */
export const createTicketPaymentHTML = (nextID, cartItems, payments, summarySale, dolar) => {
    let totalItems = 0;
    let productsItems = '';
    cartItems.forEach(product => {
        productsItems += `
            <div class="itemTicket">
                <div>${product.Quantity}</div>
                <div>${product.Product}</div>
                <div></div>
            </div>
        `;
        totalItems += product.Quantity;
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

    const unpaidAmount = (summarySale - totalPaid) < 0 ?
        (summarySale - totalPaid) * -1 : summarySale - totalPaid;

    // nombre del cliente
    const clientName = document.querySelector('.second__title div:nth-child(2) span').textContent.trim();

    const ticketInnerHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>Ticket</title>
    <style>
        @page {
            size: 80mm auto;
        }
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
    <div class="titleTicket">Ticket de Abono</div>
    <div class="divisorTicket"></div>
    <div class="detailsTicket">
        <div class="numberTicket">No. Folio: ${nextID}</div>
        <div class="dateTicket">${getCurrentDateTime()}</div>
    </div>
    <div class="clientTicket">Cliente: ${clientName}</div>
    <div class="divisorTicket"></div>
    <div class="headerArticlesTicket">
        <div>Cant.</div>
        <div>Producto</div>
        <div></div>
    </div>
    <div class="itemsTicketTicket">
        ${productsItems}
    </div>
    <div class="quantityArticlesTicket">>> Numero de Articulos: <span>${totalItems}</span></div>
    <div class="divisorTicket"></div>
    <div class="summaryTicket">
        <div class="subtotalTicket"></div>
        <span></span>
        <div class="discountTicket"></div>
        <span></span>
        <div class="ivaTicket"></div>
        <span></span>
        <div class="totalTicket">Saldo:</div>
        <span>${formatMoney(summarySale)}</span>
    </div>
    <div class="totalInWords">(${numberToWords(summarySale)})</div>
    <div class="divisorTicket"></div>
    <div class="dollarValue">Tipo de cambio: $${dolar}</div>
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
        <div>${formatMoney(unpaidAmount)}</div>
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

    return ticketInnerHTML;
};