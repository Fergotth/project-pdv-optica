import { getDataProductDB } from './getData.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { newAlert } from '../utils/alerts.js';
import { getElement } from '../utils/getElement.js';

/**
 * Verifica si un SKU existe en la base de datos.
 * @param {String} SKU - El SKU del producto a verificar.
 * @returns {Promise<boolean>} - true si el SKU existe, false en caso contrario.
 */
export const existSKU = async (SKU) => {
    const data = await getDataProductDB(SKU);
    
    if (data.length > 0)
        return true;

    return false;
};

/**
 * Verifica los datos obtenidos del formulario
 * @param {Object}
 * @returns {Object || New Error}
 */
export const validateDataform = (data) => {
    const validatedData = {
        IVA: safeNumber(data.IVA),
        SKU: /^\d+$/.test(data.SKU.trim()) ? data.SKU.trim() : false,
        Category: data.Category !== "" ? data.Category : false,
        Description: data.Description.trim() ? data.Description.trim() : false,
        PriceExcludingIVA: safeNumber(data.PriceExcludingIVA),
        PriceIncludingIVA: safeNumber(data.PriceIncludingIVA),
        NetProfit: safeNumber(data.NetProfit),
        SalePrice: safeNumber(data.SalePrice),
        Stock: safeNumber(data.Stock),
        Image: data.Image
    };

    const fieldNames = {
        IVA: "IVA",
        SKU: "Código SKU",
        Category: "Categoría",
        Description: "Descripción",
        PriceExcludingIVA: "Precio sin IVA",
        PriceIncludingIVA: "Precio con IVA",
        NetProfit: "Utilidad",
        SalePrice: "Precio de venta",
        Stock: "Unidades"
    };

    for (const key in validatedData) {
        if (validatedData[key] === false) {
            newAlert({
                icon: 'info',
                title: "AVISO",
                text: `El campo "${fieldNames[key]}" no debe estar vacío o es inválido.`
            });
            throw new Error(`Campo inválido: ${key}`);
        }
    }

    return validatedData;
};

/**
 * Mostrar en pantalla los articulos encontrados de la consulta
 */
export const renderArticlesFounded = (data) => {
    const articlesContainer = getElement('.list--items');
    const itemsFoundedLabel = getElement('.footer--summary label:nth-child(2)');
    const Category = {
        frames: "Armazones",
        glasses: "Materiales",
        accessories: "Accesorios",
        services: "Servicios"
    };
    
    articlesContainer.replaceChildren();
    data.forEach(item => {
        const image = item.Image ? 
        `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="#009900">
            <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M15 5.28571L16.8 7L21 3" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>` : 
        `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="#990000">
            <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M12 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12M16 3L18.5 5.5M18.5 5.5L21 8M18.5 5.5L21 3M18.5 5.5L16 8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `;
        
        const element = `
        <div class="items--item">
            <span>${item.SKU}</span>
            <span>${item.Description}</span>
            <span>${Category[item.Category] || "Error en cat."}</span>
            <span>${item.IVA}%</span>
            <span>${item.PriceExcludingIVA.toFixed(2)}</span>
            <span>${item.PriceIncludingIVA.toFixed(2)}</span>
            <span>${item.SalePrice.toFixed(2)}</span>
            <span>${item.NetProfit.toFixed(2)}</span>
            <span>${item.Stock}</span>
            <span>${image}</span>
        </div>
        `;

        articlesContainer.insertAdjacentHTML('beforeend', element);
    });

    itemsFoundedLabel.closest('.footer--summary').querySelector('label:nth-child(1)').textContent = "Articulos encontrados: ";
    itemsFoundedLabel.textContent = data.length;
};