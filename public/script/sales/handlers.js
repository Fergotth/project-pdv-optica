import { newAlert } from "../utils/alerts.js";
import { getProductHTML } from "./salesDom.js";
import { getElement, getParsedHTML } from "../utils/getElement.js";
import * as utils from "./utils.js";
import Class from "./consts.js";

export const handlerBtnFrames = ({ DOM, products }) => {
    // Hay que validar DOM y products

    products.forEach(product => {
        DOM.appendChild(getParsedHTML(getProductHTML(product)));
    });
};