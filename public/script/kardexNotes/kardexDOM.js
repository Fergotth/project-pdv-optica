export const getArticleHTML = (data) => {
    return `
    <div class="payment__items">
        <div class="payment__icon">
            <svg fill="none" viewBox="0 0 16 16" height="18" width="18">
                <rect rx="8" height="16" width="16"></rect>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="white" d="M5 8.5L7.5 10.5L11 6"></path>
            </svg>
        </div>
        <div class="payment__articleDescription">
            <span>x${data.Quantity} ${data.Product}</span>
        </div>    
    </div>
    `;
};

export const getPaymentHTML = (data) => {
    return `
    <div class="payment__summaryDetails">
        <div class="payment__datePayment">
            ${data.PaymentDate.replace("-", "/").replace("-", "/")}
        </div>
        <div class="payment__iconSummary">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20">
                <path d="M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM8.50488 14.0027V16.0027H11.0049V18.0027H13.0049V16.0027H14.0049C15.3856 16.0027 16.5049 14.8835 16.5049 13.5027C16.5049 12.122 15.3856 11.0027 14.0049 11.0027H10.0049C9.72874 11.0027 9.50488 10.7789 9.50488 10.5027C9.50488 10.2266 9.72874 10.0027 10.0049 10.0027H15.5049V8.00275H13.0049V6.00275H11.0049V8.00275H10.0049C8.62417 8.00275 7.50488 9.12203 7.50488 10.5027C7.50488 11.8835 8.62417 13.0027 10.0049 13.0027H14.0049C14.281 13.0027 14.5049 13.2266 14.5049 13.5027C14.5049 13.7789 14.281 14.0027 14.0049 14.0027H8.50488Z"></path>
            </svg>
        </div>
        <div class="payment__type">
            <span>${data.PaymentMethod}</span>
        </div>
        <div class="payment__totalPay">
            <span>$${(data.Paid).toFixed(2)}</span>
        </div>
    </div>
    `;
};

export const getTicketItemHTML = (type, ticket) => {
    const HTMLPart1 = `
    <div class="ticket__items">
        <div class="ticket__icon1" style="color: gray">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22">
                <path d="M3 15V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V19C21 20.6569 19.6569 22 18 22H4C2.34315 22 1 20.6569 1 19V17H17V19C17 19.5523 17.4477 20 18 20C18.5523 20 19 19.5523 19 19V15H3Z"></path>
            </svg>
        </div>
        <div class="ticket__type">${type === 'sale' ? "Venta" : "Abono"}</div>
    `; 

    const HTMLPart2 = ticket ? `
    <a href="${ticket }" class="ticket__icon2" target="_blank" rel="noopener noreferrer" title="Abrir ticket PDF">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22">
            <path d="M7 17H17V22H7V17ZM19 20V15H5V20H3C2.44772 20 2 19.5523 2 19V9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V19C22 19.5523 21.5523 20 21 20H19ZM5 10V12H8V10H5ZM7 2H17C17.5523 2 18 2.44772 18 3V6H6V3C6 2.44772 6.44772 2 7 2Z"></path>
        </svg>
    </a>
    </div>` : 
    `<a title="No es encontro ticket">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" style="color: red">
            <path d="M21 11.6736C20.0907 11.2417 19.0736 11 18 11C14.134 11 11 14.134 11 18C11 19.4872 11.4638 20.8662 12.2547 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16L21 7V11.6736ZM18 23C15.2386 23 13 20.7614 13 18C13 15.2386 15.2386 13 18 13C20.7614 13 23 15.2386 23 18C23 20.7614 20.7614 23 18 23ZM16.7066 20.7076C17.0982 20.895 17.5369 21 18 21C19.6569 21 21 19.6569 21 18C21 17.5369 20.895 17.0982 20.7076 16.7066L16.7066 20.7076ZM15.2924 19.2934L19.2934 15.2924C18.9018 15.105 18.4631 15 18 15C16.3431 15 15 16.3431 15 18C15 18.4631 15.105 18.9018 15.2924 19.2934Z"></path>
        </svg>
    </a>
    </div>`;
    return HTMLPart1 + HTMLPart2;
};