/**
 * 
 * @param {Object} product 
 * @returns {String} HTML
 */

export const getProductHTML = (product) => {
    const pathImg = product.Image ? `../../images/${product.Image}` : "../../images/no-image.jpg";
    
    return `
        <div class="content-image" title="${product.Description}" data-sku="${product.SKU}">
            <img src="${pathImg}">
        </div>
    `;
};

export const getMaterialCatalogHTML = () => {
    const pathImg = '../../images/';
    
    return `
        <div class="content-image btnSinglevision" title="Monofocal">
            <img src="${pathImg}monofocal-frame.jpg">
        </div>
        <div class="content-image btnBifocal" title="Bifocal">
            <img src="${pathImg}bifocal-frame.png">
        </div>
        <div class="content-image btnProgresive" title="Progresivo">
            <img src="${pathImg}progresivo-frame.jpg">
        </div>
    `;
};