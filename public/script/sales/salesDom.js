/**
 * 
 * @param {Object} product 
 * @returns {String} HTML
 */

export const getProductHTML = (product) => {
    const pathImg = product.Image ? `../../images/products/${product.Image}` : "../../images/no-image.jpg";
    return `
        <div class="content-image" title="${product.Description}" data-sku="${product.SKU}">
            <img src="${pathImg}">
        </div>
    `;
};