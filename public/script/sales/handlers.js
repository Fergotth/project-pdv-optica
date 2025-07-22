import { newAlert } from "../utils/alerts.js";
import { 
    getMaterialCatalogHTML, 
    getItemToCardHTML, 
    getPromptDiscountHTML,
    getPaymentSummaryHTML,
    getNewPaymentItemHTML,
    getSearchClientFormHTML, 
    getNewClientFoundedHTML
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
    resetDiscountValue, 
    handleProductCategory, 
    setTotal,
    recalculateSummary,
    restartSaleForm
} from "./utils.js";
import { 
    flushState, 
    getState, 
    updateState 
} from "./state.js";
import Class from "./consts.js";
import { calcuteNewPayment } from "./calculation.js";
import { 
    getCartItems,
    getPayments,
    getSummarySale
} from "./getData.js";
import { getDataClientDB } from "../clients/getData.js";
import { saveData } from "./saveData.js";
import summarySale from "./summarySale.js";

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

export const handlerDeleteCart = async ({ DOM, param }) => {
    const subtotalElement = getElement(Class.label.subtotal);
    const subtotal = subtotalElement ? Number(subtotalElement.textContent.replace("$", "")) : 0;
    setSubtotal(-subtotal);
    DOM.replaceChildren?.();

    updateItemsCart(-getState().cartItems);
    resetDiscountValue();
    await flushState();
    recalculateSummary();

    if (param) {
        newAlert({
            icon: "success",
            title: "AVISO",
            text: "Articulos eliminados del carrito de compras"
        });
    }
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

export const handlerApplyIVA = ({}) => {
    recalculateSummary();
};

export const handlerBtnRegisterPay = ({ DOM, client, total, ID }) => {
    if (getState().cartItems > 0) {
        DOM.appendChild(getParsedHTML(getPaymentSummaryHTML(client, total, ID)));
        summarySale();
    } else {
        newAlert({
            icon: "info",
            text: "No se ha registrado ningun articulo"
        });
    }
};

export const handlerPaymentCloseIcon = ({ DOM }) => {
    updateState(() => {
        return {
            dataCart: [],
            dataPayment: [],
            dataSummary: {}
        };
    });

    DOM.remove();
};

export const handlerApplyPayment = ({ DOM, value, typeOfPayment }) => {
    if (!calcuteNewPayment(value)) {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "El monto ingresado es mayor al total"
        });
        return;
    }

    getElement('.paymentValue').value = '';
    DOM.appendChild(getParsedHTML(getNewPaymentItemHTML(value, typeOfPayment)));
};

export const handlerItemDeletePayment = ({ DOM, value }) => {
    calcuteNewPayment(-value);
    DOM.remove();
};

export const handlerBtnApplyPayments = ({}) => {
    if (!document.querySelector('.paymentItem')) {
        newAlert({
            icon: "error",
            title: "AVISO",
            text: "No se ha registrado ningun pago"
        });

        return;
    }

    saveData(getCartItems(), getPayments(), getSummarySale());
    restartSaleForm();
    newAlert({
        icon: "success",
        title: "VENTA",
        text: "Venta registrada exitosamente"
    });
};

export const handlerSearchClient = ({ DOM }) => {
    DOM.appendChild(getParsedHTML(getSearchClientFormHTML()));
};

export const handlerSearchClientCloseIcon = ({ DOM }) => {
    DOM.remove();
};

export const handlerBtnSearchClientForm = async ({ client, DOM }) => {
    if (client === "") return;
    
    const data = await getDataClientDB(client);
    DOM.replaceChildren();

    if (data.length === 0) {
        newAlert({
            icon: "info",
            text: "No se encontro ningun paciente"
        });
    } else {
        data.forEach(element => {
            DOM.appendChild(getParsedHTML(getNewClientFoundedHTML(element.ID, element.Name)));
        });
    }
};

export const handlerSelectClient = ({ client, ID, DOM }) => {
    DOM.textContent = client;
    DOM.dataset.id = ID;
    getElement('.overlaySearchClient').remove();
};