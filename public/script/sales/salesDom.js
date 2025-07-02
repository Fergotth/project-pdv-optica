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
                <div class="product-image">
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