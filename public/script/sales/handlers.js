import { newAlert } from "../utils/alerts.js";
import { 
    getMaterialCatalogHTML, 
    getItemToCardHTML, 
    getPromptDiscountHTML 
} from "./salesDom.js";
import { 
    getElement, 
    getParsedHTML 
} from "../utils/getElement.js";
import { getDataProductDB } from '../products/getData.js';
import { 
    handleQuantityButton, 
    updateItemsCart, 
    setSubtotal, 
    formatMoney, 
    resetDiscountValue, 
    handleProductCategory, 
    setTotal,
    setIVA,
    recalculateSummary
} from "./utils.js";
import { 
    flushState, 
    getState, 
    updateState 
} from "./state.js";
import Class from "./consts.js";

export const handlerBtnFrames = (params) => {
    handleProductCategory({ ...params, title: "Armazones", message: "armazones" });
};

export const handlerBtnGlasses = ({ DOM }) => {
    DOM.replaceChildren();
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
    recalculateSummary();
    updateItemsCart(1);
};

export const handlerDeleteItem = ({ DOM }) => {
    updateItemsCart(-Number(DOM.querySelector(Class.label.quantity).textContent));
    DOM.remove();
    resetDiscountValue();
    recalculateSummary();
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
    recalculateSummary();
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
    setTotal();
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

export const handlerDeleteDiscountBtn = ({}) => {
    if (getState().discount > 0) {
        resetDiscountValue();
        recalculateSummary();
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

    recalculateSummary();
};

export const handlerApplyIVA = ({ button }) => {
    recalculateSummary();
}