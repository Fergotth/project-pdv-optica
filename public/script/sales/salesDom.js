import { formatMoney } from "./utils.js";

/**
 * 
 * @param {Object} product 
 * @returns {String} HTML
 */

export const getProductHTML = (product) => {
    const pathImg = product.Image ? `../../images/${product.Image}` : "../../images/no-image.jpg";
    
    return `
        <div class="content-image itemSelected" title="${product.Description}" data-sku="${product.SKU}">
            <img src="${pathImg}">
        </div>
    `;
};

export const getMaterialCatalogHTML = () => {
    const pathImg = '../../images/';
    
    return `
        <div class="content-image btnSinglevision" title="Monofocal" style="background-image: url(${pathImg}monofocal-frame.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: #B22222; font-weight: 600; letter-spacing: 3px;">
        Monofocal
        </div>
        <div class="content-image btnBifocal" title="Bifocal" style="background-image: url(${pathImg}bifocal-frame.png); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: #E0E0E0; font-weight: 600; letter-spacing: 3px;">
        Bifocal
        </div>
        <div class="content-image btnProgresive" title="Progresivo" style="background-image: url(${pathImg}progresivo-frame.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: #8B0000 ; font-weight: 600; letter-spacing: 3px;">
        Progresivo
        </div>
    `;
};

export const getItemToCardHTML = (product) => {
    const pathImg = product.Image ? `../../images/${product.Image}` : "../../images/no-image.jpg";

    return `
        <div class="item" title="${product.Description}">
            <div class="item-delete deleteItem" title="Quitar producto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" x2="10" y1="11" y2="17"/>
                    <line x1="14" x2="14" y1="11" y2="17"/>
                </svg>
            </div>
            <div class="item-product">
                <div class="product-image" data-sku="${product.SKU}">
                    <img src="${pathImg}" alt="">
                </div>
                <div class="product-details">
                    <span class="details-description">${product.Description}</span>
                    <span class="details-price">${formatMoney(product.SalePrice)}</span>
                </div>
            </div>
            <div class="item-button">
                <div class="button-quantity">1</div>
                <div class="button-buttons">
                    <button class="buttons-plus plusButton">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m18 15-6-6-6 6"/>
                        </svg>
                    </button>
                    <button class="buttons-minus minusButton">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="item-price">${formatMoney(product.SalePrice)}</div>
        </div>
    `;
};

export const getPromptDiscountHTML = () => {
    return `
    <div class="overlayPromptDiscount">
        <div class="promptDiscount">
            <div class="discount-container">
                <input class="discountInputValue" required="" placeholder="Descuento" type="number">
                <button class="setDiscountBtn" type="button">Aplicar</button>
            </div>
            <button class="cancelSetDiscountBtn">Cancelar</button>
        </div>
    </div>
    `;
};

export const getLoaderHTML = () => {
    return `
    <div class="overlayLoader">
        <div class="custom-loader"></div>
    </div>
    `;
};

export const getPaymentSummaryHTML = (client, total) => {
    return `
    <div class="overlayPromptDiscount">
        <div class="paymentContainer">
            <div class="paymentCloseIcon" title="Cerrar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </div>
            <div class="leftsection">
                <div class="leftsection-header">
                    <div class="header-left">
                        <span class="title">pagos<span>Ventas</span></span>
                        <span class="subtitle">Registro de pagos</span>
                        <hr></hr>
                    </div>
                    <div class="header-right">
                        <span>Fecha</span>
                        <span></span>
                    </div>
                </div>
                <div class="leftsection-carousel-header">
                    <span>Forma de Pago</span>
                    <span>Seleccione su forma de pago</span>
                </div>
                <div class="sliderCarousel">
                    <div class="list">
                        <div class="item">
                            <img src="../../images/cash-eu.jpg" alt="">
                        </div>
                        <div class="item">
                            <img src="../../images/cash-mx.jpg" alt="">
                        </div>
                        <div class="item">
                            <img src="../../images/creditcard.png" alt="">
                        </div>
                        <div class="item">
                            <img src="../../images/spei2-removebg.png" alt="">
                            <div class="topic">Transferencia</div>
                        </div>
                        <div class="item">
                            <img src="../../images/cupon-removebg.png" alt="">
                        </div>
                    </div>
                    <div class="arrows">
                        <button class="prev"><</button>
                        <button class="next">></button>
                    </div>
                </div>
                <div class="paymentSection">
                    <div class="paymentLabels">
                        <span>Anticipo</span>
                        <span>Cantidad a abonar</span>
                    </div>
                    <input class="paymentValue" required="" placeholder="Cantidad" type="number">
                    <button class="applyPayment">Aplicar</button>
                </div>
            </div>
            <div class="rightsection">
                <div class="summaryClient">
                    <div class="summaryClientContainer">
                        <div class="clientIcon">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        <span class="summaryClientName">${client}</span>
                    </div>
                    <div class="summaryClientSaleDetails">
                        <span>Total</span>
                        <span>${Number(total).toFixed(2)}</span>
                        <span>MX</span>
                    </div>
                </div>
                <div class="summarySale">
                    <div class="salePayments">
                        
                    </div>
                    <div class="summaryPaymentDetail">
                        <div class="detailTotal">
                            <span>0.00</span> MX</span>
                        </div>
                        <span>Total abonado</span>
                    </div>
                    <button class="btnApplyPayments">Registrar</button>
                </div>
            </div>
        </div>      
    </div>
    `;
};

export const getNewPaymentItemHTML = (payment, typeOfPayment) => {
    return `
    <div class="paymentItem">
        <div class="itemCheck">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
        </div>
        <span class="typeOfPaymentValue">${typeOfPayment}</span>
        <span class="paidValue">${Number(payment).toFixed(2)}</span>
        <div class="itemDeletePayment">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
        </div>
    </div>
    `;
};