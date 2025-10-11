import { newAlert } from "../utils/alerts.js";
import { 
    getElement, 
    getParsedHTML 
} from "../utils/getElement.js";
import { showErrorMessage } from "../utils/errorMessage.js";
import { getDataProductDB } from '../products/getData.js';
import { 
    getMaterialCatalogHTML, 
    getItemToCardHTML, 
    getPromptDiscountHTML,
    getPaymentSummaryHTML,
    getNewPaymentItemHTML,
    getSearchClientFormHTML, 
    getNewClientFoundedHTML,
    getPromptQuotationHTML
} from "./salesDom.js";
import { 
    handleQuantityButton, 
    updateItemsCart, 
    setSubtotal, 
    resetDiscountValue, 
    handleProductCategory, 
    setTotal,
    recalculateSummary,
    restartSaleForm,
    findQuotation,
    existInCart,
    handleFlushCart
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
    getSummarySale,
    getDataQuotation,
} from "./getData.js";
import { getDataClientDB } from "../clients/getData.js";
import { 
    saveData, 
    saveQuotation 
} from "./saveData.js";
import summarySale from "./summarySale.js";

/**
 * Manejador del boton Armazones
 * @param {Object} params 
 */
export const handlerBtnFrames = (params) => {
    handleProductCategory({ ...params, title: "Armazones", message: "armazones" });
};

/**
 * Manejador del boton Materiales
 * @param {Object<HTMLDivElement>} DOM 
 */
export const handlerBtnGlasses = ({ DOM }) => {
    DOM.replaceChildren();
    DOM.insertAdjacentHTML('afterbegin', getMaterialCatalogHTML());
};

/**
 * Manejador del boton Accesorios
 * @param {Onject} params 
 */
export const handlerBtnAccesories = async (params) => {
    handleProductCategory({ ...params, title: "Accesorios", message: "accesorios" });
};

/**
 * Manejador del boton Servicios
 * @param {Object} params 
 */
export const handlerBtnServices = async (params) => {
    handleProductCategory({ ...params, title: "Servicios", message: "articulos" });
};

/**
 * Manejador del boton Vision Sencilla
 * @param {Object} params 
 */
export const handlerBtnSinglevision = (params) => {
    handleProductCategory({ ...params, title: "Materiales", message: "materiales" });
};

/**
 * Manejador del boton Bifocal
 * @param {Objeto} params 
 */
export const handlerBtnBifocal = (params) => {
    handleProductCategory({ ...params, title: "Materiales", message: "materiales" });
};

/**
 * Manejador del boton Progresivos
 * @param {Object} params 
 */
export const handlerBtnProgresive = (params) => {
    handleProductCategory({ ...params, title: "Materiales", message: "materiales" });
};

/**
 * Manejador de seleccion de elemento de ventas
 * @param {OBject<HTMLDivElement, Integer, Integer>} param0 
 */
export const handlerItemSelected = async ({ DOM, sku, quantity }) => {
    const [product] = await getDataProductDB(sku);
    let item = undefined;

    for(let i = 0; i < quantity; i++) {
        if (i === 1) item = existInCart(sku);
    
        if (item) {
            handlerPlusButton({ DOM: item, param: "plus"});
        } else {
            DOM.appendChild(getParsedHTML(getItemToCardHTML(product)));
            recalculateSummary();
            updateItemsCart(1);
        }
    }
};

/**
 * Manejador de borrar un elemento del carrito
 * @param {Object<HTMLDivElement>} param0 
 */
export const handlerDeleteItem = ({ DOM }) => {
    newAlert({
        icon: 'question',
        title: "AVISO",
        text: "¿Desea quitar este articulo del carrito de venta?"
    })
    .then(response => {
        if (response){
            updateItemsCart(-Number(DOM.querySelector(Class.label.quantity).textContent));
            DOM.remove();
            resetDiscountValue();
            recalculateSummary();
        }
    });
};

/**
 * Manejador del boton + del carrito de ventas
 * @param {Object<HTMLDivElement, String>} param0 
 */
export const handlerPlusButton = ({ DOM, param }) => {
    handleQuantityButton(DOM, param);
};

/**
 * Manejador del boton - del carrito de ventas
 * @param {Object<HTMLDivElement, String>} param0 
 */
export const handlerMinusButton = ({ DOM, param }) => {
    handleQuantityButton(DOM, param);
};

/**
 * Manejador del boton borrar el carrito de ventas (vaciar)
 * @param {Object<HTMLDivElement, Boolean>} param0 
 */
export const handlerDeleteCart = async ({ DOM, param }) => {
    if (getState().cartItems > 0) {
        newAlert({
            icon: 'question',
            title: "AVISO",
            text: "¿Desea quitar todos los arituculos del carrito de venta?"
        })
        .then(async response => {
            if (response) {
                await handleFlushCart(DOM, param);
            }
        });
    } else {
        newAlert({
            icon: 'info',
            title: "AVISO",
            text: "No hay articulos en el carrito de ventas"
        });
    }
};

/**
 * Manejador de la busqueda del articulo por SKU
 * @param {Object<HTMLDivElement, Integer>} param0 
 * @returns {Promise<void>}
 */
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

/**
 * Manejador del boton aplicar descuento
 * @param {Object<HTMLDivElement, Integer>} param0 
 * @returns {void}
 */
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

/**
 * Manejador del boton borrar descuento
 * @param {void} param0 
 */
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

/**
 * Manejador del boton eliminar descuento
 * @param {Object<HTMLDivElement>} param0 
 */
export const handlerCancelSetDiscountBtn = ({ DOM }) => {
    getElement('.discount-summary-menu').removeAttribute('open');
    DOM.remove();
};

/**
 * Manejador del boton aplicar descuento
 * @param {Object<Number} param0 
 * @returns {void}
 */
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

/**
 * Manejador del boton applicar IVA
 * @param {void} param0 
 */
export const handlerApplyIVA = ({}) => {
    recalculateSummary();
};

/**
 * Manejador del boton aplicar pago
 * @param {Object<HTMLDivElement, String, Number, Integer>} param0 
 */
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

/**
 * Manejador del boton X para cerrar la ventana
 * @param {Object<HTMLDivElement} param0 
 */
export const handlerPaymentCloseIcon = ({ DOM }) => {
    updateState(() => {
        return {
            dataCart: [],
            dataPayment: [],
            dataSummary: {}
        };
    });

    if (DOM) DOM.remove();
};

/**
 * Manejador del boton aplicar abono
 * @param {Object<HTMLDivElement. Number, String>} param0
 * @returns {void}
 */
export const handlerApplyPayment = ({ DOM, value, typeOfPayment }) => {
    if (!calcuteNewPayment(value, typeOfPayment)) {
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

/**
 * Manejador del boton de borrar abono
 * @param {Object<HTMLDivElement, Number>} param0 
 */
export const handlerItemDeletePayment = ({ DOM, value }) => {
    calcuteNewPayment(-value);
    DOM.remove();
};

/**
 * Manejador del boton de aplicar pagos
 * @param {void} param0 
 * @returns {void}
 */
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

/**
 * Manejador del boton buscar cliente para mostrar el formulario de busqueda
 * @param {Object<HTMLDivElement>} param0 
 */
export const handlerSearchClient = ({ DOM }) => {
    DOM.appendChild(getParsedHTML(getSearchClientFormHTML()));
};

/**
 * Manejador del boton X de cerrar formualrio de busqueda de cliente
 * @param {Object<HTMLDivElement>} param0 
 */
export const handlerSearchClientCloseIcon = ({ DOM }) => {
    DOM.remove();
};

/**
 * Manejador del boton buscar cliente
 * @param {Object<String, HTMLDivElement>} param0 
 * @returns {Promise<void>}
 */
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

/**
 * Manejador del boton selecionar cliente
 * @param {Object<String, Integer, HTMLDivElement} param0 
 */
export const handlerSelectClient = ({ client, ID, DOM }) => {
    DOM.textContent = client;
    DOM.dataset.id = ID;
    getElement('.overlaySearchClient').remove();
};

/**
 * Manejador del boton crear cotizacion
 * @param {Object<Integer>} param0 
 * @returns {Promise<void>}
 */
export const handlerBtnCreateQuotation = async ({ items }) => {
    if (items < 1) {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "No hay articulos en el carrito de compras"
        });
        return;
    }

    saveQuotation(await getDataQuotation());
};

/**
 * Manejador del boton recuperar cotizacion
 * @param {Object<HTMLDivElement} param0 
 */
export const handlerBtnRecoverQuotation = ({ DOM }) => {
    DOM.appendChild(getParsedHTML(getPromptQuotationHTML()));
};

/**
 * Manejador del boton cancelar en la busqueda de cotizacion
 * @param {Object<HTMLDivElement} param0 
 */
export const handlerCancelSetQuotationBtn = ({ DOM }) => {
    DOM.remove();
};

/**
 * Manejador del boton de buscar cotizacion
 * @param {Object<Integer>} param0 
 * @returns {Promise<void>}
 */
export const handlerSetQuotationBtn = async ({ quotation }) => {
    const data = await findQuotation(quotation);
    
    if(!data) {
        newAlert({
            icon: "info",
            title: "AVISO",
            text: "No se encontro la cotizacion"
        });

        return;
    }

    const cartContainer = getElement(Class.list.itemsInCart);
    const clientLabel = getElement('.input-client');
    const [clientName] = await getDataClientDB(data.ClientID);
    cartContainer.replaceChildren();
    
    clientLabel.textContent = !Boolean(data.ClientID) ? "Publico General" : clientName.Name;
    clientLabel.dataset.id = data.ClientID;

    data.Products.forEach(item => {
        handlerItemSelected({ DOM: cartContainer, sku: item.sku, quantity: item.quantity });
    });

    if (data.Discount > 0) {
        updateState(() => {
            return {
                discount: data.Discount
            };
        });
    }
    
    if (data.ExistIVA) {
        getElement('.applyIVA').checked = true;
    }

    handlerCancelSetQuotationBtn({ DOM: getElement('.overlayPromptQuotation') });
    recalculateSummary();
};

export const handlerTestAlertButton = ({}) => {
    newAlert({
        icon: 'question',
        title: "Prueba",
        text: "Elemento de prueba"
    })
    .then(response => {
        if (response) {
            newAlert("Mensaje de prueba");
        } 
    });
};