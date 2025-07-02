import { newAlert } from "../utils/alerts.js";
import { getProductHTML, getMaterialCatalogHTML, getItemToCardHTML, getPromptDiscountHTML } from "./salesDom.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
import { getDataDB } from "./getData.js";
import { validateData } from "./validations.js";
import { getDataProductDB } from '../products/getData.js';
import { handleQuantityButton, updateItemsCart, setItemsToCart, setSubtotal } from "./utils.js";
import { flushState, getState } from "./state.js";
import Class from "./consts.js";

export const handlerBtnFrames = async ({ DOM, url, category }) => {
    const products = await getDataDB(url);
    
    if (!validateData(products, category)) {
        newAlert({
            icon: "info",
            title: "Armazones",
            text: "No hay armazones registrados en la base de datos"
        })
        return;
    }

    setItemsToCart(DOM, products, category);
};

export const handlerBtnGlasses = ({ DOM }) => {
    DOM.innerHTML = '';
    DOM.insertAdjacentHTML('afterbegin', getMaterialCatalogHTML());
};

export const handlerBtnAccesories = async ({ DOM, url, category }) => {
    const products = await getDataDB(url);
    
    if (!validateData(products, category)) {
        newAlert({
            icon: "info",
            title: "Accesorios",
            text: "No hay accesorios registrados en la base de datos"
        })
        return;
    }

    setItemsToCart(DOM, products, category);
};

export const handlerBtnServices = async ({ DOM, url, category }) => {
    const products = await getDataDB(url);
    
    if (!validateData(products, category)) {
        newAlert({
            icon: "info",
            title: "Servicios",
            text: "No hay articulos registrados en la base de datos"
        })
        return;
    }

    setItemsToCart(DOM, products, category);
};

export const handlerBtnSinglevision = async ({ DOM, url, material }) => {
    const products = await getDataDB(url);

    if (!validateData(products, material)) {
        newAlert({
            icon: "info",
            title: "Materiales",
            text: "No hay materiales registrados en la base de datos"
        })
        return;
    }

    DOM.replaceChildren();
    products.forEach(product => {
        if (product.Description?.toLowerCase().includes(material.toLowerCase()))
            DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
};

export const handlerItemSelected = async ({ DOM, sku }) => {
    const [product] = await getDataProductDB(sku);

    DOM.appendChild(getParsedHTML(getItemToCardHTML(product)));
    setSubtotal(product.SalePrice)
    updateItemsCart(1);
};

export const handlerDeleteItem = ({ DOM }) => {
    updateItemsCart(-Number(DOM.querySelector(Class.label.quantity).textContent));
    setSubtotal(-Number(DOM.closest('.item').querySelector(Class.label.itemprice).textContent.replace("$", "")));
    DOM.remove();
};

export const handlerPlusButton = ({ DOM, param }) => {
    handleQuantityButton(DOM, param);
};

export const handlerMinusButton = ({ DOM, param }) => {
    handleQuantityButton(DOM, param);
};

export const handlerDeleteCart = ({ DOM }) => {
    setSubtotal(-Number(getElement(Class.label.subtotal).textContent.replace("$", "")));
    DOM.replaceChildren();
    newAlert({
        icon: "success",
        title: "AVISO",
        text: "Articulos eliminados del carrito de compras"
    });

    updateItemsCart(-getState().cartItems);
    flushState();
};

export const handlerSku = async ({ DOM, sku }) => {
    const [product] = await getDataProductDB(sku);
    const input = getElement(Class.input.article);

    if (!product) {
        input.blur();

        newAlert({
            icon: "info",
            title: "Busqueda",
            text: `No existe el SKU: ${sku}`
        });

        return;
    }
    
    DOM.appendChild(getParsedHTML(getItemToCardHTML(product)));
    updateItemsCart(1);
    setSubtotal(product.SalePrice);
    input.value = '';
    input.blur();
};

export const handlerApplyDiscountBtn = ({ DOM, items }) => {
    if (items < 1) {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "No hay articulos en el carrito de compras"
        });

        getElement('.discount-summary-menu').removeAttribute('open');
        return;
    }

    DOM.appendChild(getParsedHTML(getPromptDiscountHTML()));
};

export const handlerDeleteDiscountBtn = ({ DOM }) => {
    if (getState().discount > 0) {
        DOM.textContent = "$0.00";
        // falta logica para actualizar total
    } else {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "No se ha aplicado ningun descuento"
        });
        getElement('.discount-summary-menu').removeAttribute('open');
    }
};

export const handlerCancelSetDiscountBtn = ({ DOM }) => {
    getElement('.discount-summary-menu').removeAttribute('open');
    DOM.remove();
};