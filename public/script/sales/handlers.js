import { newAlert } from "../utils/alerts.js";
import { getProductHTML, getMaterialCatalogHTML, getItemToCardHTML } from "./salesDom.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
import { getDataDB } from "./getData.js";
import { validateData } from "./validations.js";
import { getDataProductDB } from '../products/getData.js';
import { handleQuantityButton, updateItemsCart } from "./utils.js";
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

    DOM.replaceChildren();
    products.forEach(product => {
        if (product.Category == category)
            DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
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

    DOM.replaceChildren();
    products.forEach(product => {
        if (product.Category == category )
            DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
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

    DOM.replaceChildren();
    products.forEach(product => {
        if (product.Category == category )
            DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
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
    updateItemsCart(1);
};

export const handlerDeleteItem = ({ DOM }) => {
    updateItemsCart(-Number(DOM.querySelector(Class.label.quantity).textContent));
    DOM.remove();
};

export const handlerPlusButton = ({ DOM, param }) => {
    handleQuantityButton(DOM, param);
};

export const handlerMinusButton = ({ DOM, param }) => {
    handleQuantityButton(DOM, param);
};

export const handlerDeleteCart = ({ DOM }) => {
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
    input.value = '';
    input.blur();
}