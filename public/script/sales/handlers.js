import { newAlert } from "../utils/alerts.js";
import { getProductHTML, getMaterialCatalogHTML } from "./salesDom.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
import { getDataDB } from "./getData.js";
import { validateData } from "./validations.js";
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

    DOM.innerHTML = '';
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

        console.log("No hay accesorios registrados en la base de datos Productos");
        return;
    }

    DOM.innerHTML = '';
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
            text: "No hay servicios registrados en la base de datos"
        })

        console.log("No hay servicios registrados en la base de datos Productos");
        return;
    }

    DOM.innerHTML = '';
    products.forEach(product => {
        if (product.Category == category )
            DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
};

export const handlerBtnSinglevision = async ({ DOM, url, material }) => {
    const products = await getDataDB(url);
};