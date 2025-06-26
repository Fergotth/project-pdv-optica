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
        <div class="content-image btnSinglevision" title="Monofocal" style="background-image: url(${pathImg}monofocal-frame.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: red; font-weight: 600;">
        Monofocal
        </div>
        <div class="content-image btnBifocal" title="Bifocal" style="background-image: url(${pathImg}bifocal-frame.png); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: red; font-weight: 600;">
        Bifocal
        </div>
        <div class="content-image btnProgresive" title="Progresivo" style="background-image: url(${pathImg}progresivo-frame.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: red; font-weight: 600;">
        Progresivo
        </div>
    `;
};