import { getState, updateState } from "./state.js";
import { newAlert } from "../utils/alerts.js";
import { getIVA, getTotal } from "./calculations.js";
import * as prompt from "./prompts.js";
import * as utils from "./utils.js";
import Class from "./consts.js";

/**
 * 
 * @param {Object} params                   // Valores recibidos en el objeto
 * @param {HTMLElement} params.itemSearched // Elemento con el input del valor a buscar
 * @param {Object} params.products          // Objeto que contiene los productos
 * @param {Number} params.percentIva        // Valor del porcentaje del IVA
 */
export const handlerAddItem = ({ itemSearched, products, percentIva }) => {
    let itemSKU = utils.validateValue(itemSearched.value);

    if (itemSKU) {
        const productSearched = products.find(product => product.sku == itemSKU);

        if (productSearched) {
            updateState(previousData => {
                const newData = [...previousData.data, {
                    price: productSearched.price,
                    description: productSearched.category === 'frame' ? `${productSearched.description} ${productSearched.model}` : productSearched.description,
                    material: productSearched.material,
                    quantity: productSearched.category === 'lenses' ? 2 : 1,
                    discount: 0,
                    iva: 0,
                    amount: 0,
                    percentIva: percentIva,
                    position: previousData.data.length
                }];

                const updatedItem = {
                    ...newData[newData.length - 1],
                    iva: getIVA(newData[newData.length - 1], percentIva)
                };

                updatedItem.amount = getTotal(updatedItem);
                newData[newData.length - 1] = updatedItem;
                return { ...previousData, data: newData };
            });
            
            utils.refreshDataHTML(getState().data);
        } else {
            newAlert({
                title: "AVISO",
                text: "No existe ese producto.",
                icon: "info" //se puede usar success, error, info, question
            });
        }
    } else {
        newAlert({
            title: "AVISO",
            text: "No se ingreso ningun articulo",
            icon: "info"
        });
    }

    itemSearched.value = '';
};

/**
 * 
 * @param {Object} params               // Valores recibidos en el objeto
 * @param {HTMLElement} params.button   // Elemento que se selecciono
 * @param {Number} params.index         // Indice del elemento seleccionado
 */
export const handlerMinus = ({ button, index }) => {
    utils.handleQuantityButton(button, index);
    utils.refreshDataHTML(getState().data);
};

/**
 * 
 * @param {Object} params               // Valores recibidos en el objeto
 * @param {HTMLElement} params.button   // Elemento que se selecciono
 * @param {Number} params.index         // Indice del elemento seleccionado
 */
export const handlerPlus = ({ button, index }) => {
    utils.handleQuantityButton(button, index);
    utils.refreshDataHTML(getState().data);
};

/**
 * 
 * @param {Object} params           // Valores recibidos en el objeto
 * @param {Number} params.index     // Indice del elemento seleccionado
 * @param {HTMLElement} params.dom  // Elemento padre para insertar el nuevo elemento
 */
export const handlerDiscount = ({ index, dom }) => {
    prompt.showPromptDiscount(index, dom);
};

/**
 * 
 * @param {Object} param                // Valor recibido en el objeto
 * @param {HTMLElement} param.button    // Elemento seleccionado 
 */
export const handlerBtnCancel = ({ button }) => {
    utils.setDiscount( {button} );
};

/**
 * 
 * @param {Object} params                       // Valores recibidos en el objeto
 * @param {HTMLElement} params.button           // Elemento seleccionado
 * @param {HTMLElement} params.input            // Elemento que contiene el valor base a descontar
 * @param {HTMLElement} params.typeOfDiscount   // Elemento que contiene el tipo de descuento
 * @param {Number} params.index                 // Indice del elemento
 */
export const handlerBtnAccept = ({ button, input, typeOfDiscount, index }) => {
    utils.setDiscount({ button, input, typeOfDiscount, index });
};

/**
 * 
 * @param {Object} param            // Valor recibido en el objeto
 * @param {HTMLElement} param.dom   // Elemento padre donde se insertara el nuevo elemento 
 */
export const handlerIva = ({ dom }) => {
    prompt.showPromptIVA(dom);
};

/**
 * 
 * @param {Object} param            // Valor recibido en el objeto
 * @param {Number} param.percentIva // Porcentaje de IVA
 */
export const handlerTypeOfIva = ({ percentIva }) => {
    updateState(previousData => {
        const newData = previousData.data.map(item => {
            const updatedItem = {
                ...item,
                percentIva: percentIva,
            };

            updatedItem.iva = getIVA(updatedItem, percentIva);
            updatedItem.amount = getTotal(updatedItem);

            return updatedItem;
        });

        return {
            data: newData,
            percentIva: percentIva
        };
    });
    
    utils.closeOverlay(document.querySelector(Class.main.overlay));
    utils.changeLabelIva(percentIva);
    utils.refreshDataHTML(getState().data);
};

/**
 * 
 * @param {Object} param            // Valor recibido en el objeto
 * @param {HTMLElement} param.dom   // Elemento padre donde se insertara el nuevo elemento 
 */
export const handlerSearchClient = ({ dom }) => {
    prompt.showPromptSearchClient(dom);
};

/**
 * No recibe argumentos, solo quita la capa overlay
 */
export const handlerBtnCancelClient = () => {
    utils.closeOverlay(document.querySelector(Class.main.overlay));
};

/**
 * 
 * @param {Object} params           // Valores recibidos en el objeto
 * @param {HTMLElement} params.dom  // Elemento padre donde se insertara el nuevo elemento
 * @param {String} params.name      // Nombre del cliente
 */
export const handlerBtnSearchClient = ({ dom, name }) => {
    prompt.showPromptClients(dom, name);
};

/**
 * 
 * @param {Object} params       // Valores recibidos en el objeto
 * @param {String} params.name  // Nombre del cliente
 * @param {Number} params.id    // ID del cliente
 */
export const handlerClientName = ({ name, id }) => {
    const nameInput = document.querySelector(Class.input.name);
    nameInput.setAttribute('data-id', id);
    nameInput.value = name;
    handlerBtnCancelClient();
};

export const handlerBtnPay = ({ dom }) => {
    prompt.showSaleResume(dom);
};