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