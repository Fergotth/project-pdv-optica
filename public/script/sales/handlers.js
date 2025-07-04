import { newAlert } from "../utils/alerts.js";
import { getProductHTML, getMaterialCatalogHTML, getItemToCardHTML, getPromptDiscountHTML } from "./salesDom.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
import { getDataDB } from "./getData.js";
import { validateData } from "./validations.js";
import { getDataProductDB } from '../products/getData.js';
import { handleQuantityButton, updateItemsCart, setItemsToCart, setSubtotal, formatMoney, resetDiscountValue, handleProductCategory } from "./utils.js";
import { flushState, getState, updateState } from "./state.js";
import Class from "./consts.js";

export const handlerBtnFrames = (params) => {
    handleProductCategory({ ...params, title: "Armazones", message: "armazones" });
};

export const handlerBtnGlasses = ({ DOM }) => {
    DOM.innerHTML = '';
    DOM.insertAdjacentHTML('afterbegin', getMaterialCatalogHTML());
};

export const handlerBtnAccesories = async (params) => {
    handleProductCategory({ ...params, title: "Accesorios", message: "accesorios" });
};

export const handlerBtnServices = async (params) => {
    handleProductCategory({ ...params, title: "Servicios", message: "articulos" });
};

export const handlerBtnSinglevision = (params) => {
    handleProductCategory({ ...params, title: "Materiales", message: "materiales" });
};

export const handlerBtnBifocal = (params) => {
    handleProductCategory({ ...params, title: "Materiales", message: "materiales" });
};

export const handlerBtnProgresive = (params) => {
    handleProductCategory({ ...params, title: "Materiales", message: "materiales" });
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
    resetDiscountValue();
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
    resetDiscountValue();
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
    }

    getElement('.discount-summary-menu').removeAttribute('open');
};

export const handlerCancelSetDiscountBtn = ({ DOM }) => {
    getElement('.discount-summary-menu').removeAttribute('open');
    DOM.remove();
};

export const handlerSetDiscountBtn = ({ discount }) => {
    handlerCancelSetDiscountBtn({ DOM: getElement('.overlayPromptDiscount') });
    
    if (getState().subtotal <= discount) {
        newAlert({
            icon: "info",
            text: "Descuento invalido. Favor de corregir."
        });

        return;
    }

    updateState(() => {
        return {
            discount: discount
        };
    });

    getElement(Class.label.discount).textContent = `- ${formatMoney(discount)}`;
};