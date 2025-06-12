import { getElement } from "../utils/getElement.js";

export const getDataProductForm = () => {
    try {
        const data = {
            SKU: getElement('.sku--input').value,
            Category: getElement('.category--input').value,
            Description: getElement('.description--input').value,
            PriceExcludingIVA: getElement('.pricePurchaseExcludingIVA--input').value,
            PriceIncludingIVA: getElement('.pricePurchaseIncludingIVA--input').value,
            NetProfit: getElement('.netProfit--input').textContent,
            SalePrice: getElement('.salePrice--input').value,
            Stock: getElement('.quantity--input').value,
            Image: ""
        };
    
        return data;
    } catch (error) {
        console.error("No se puedieron obtener los datos de los articulos", error);
    }
};