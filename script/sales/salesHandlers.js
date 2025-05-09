import { getState, updateState } from "./stateSales.js";
import { newAlert } from "../utils/alerts.js";
import * as utils from "./salesUtils.js";

export const handlerAddItem = ({ itemSearched, products, percentIva }) => {
    let itemSKU = parseInt(itemSearched.value, 10);

    if (itemSKU) {
        const productSearched = products.find(product => product.sku == itemSKU);

        if (productSearched) {
            updateState(previousData => {
                const newData = [...previousData.data, {
                    price: productSearched.price,
                    description: productSearched.description,
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
                    iva: utils.getIVA(newData[newData.length - 1], percentIva)
                };

                updatedItem.amount = utils.getAmount(updatedItem);
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

export const handlerMinus = ({ button, index }) => {
    utils.handleQuantityButton(button, index);
    utils.refreshDataHTML(getState().data);
};

export const handlerPlus = ({ button, index }) => {
    utils.handleQuantityButton(button, index);
    utils.refreshDataHTML(getState().data);
};

export const handlerDiscount = ({ index, dom }) => {
    utils.showPromptDiscount(index, dom);
};

export const handlerBtnCancel = ({ button }) => {
    utils.setDiscount( {button} );
};

export const handlerBtnAccept = ({ button, input, typeOfDiscount, index }) => {
    utils.setDiscount({ button, input, typeOfDiscount, index });
};

export const handlerIva = ({ dom }) => {
    utils.showPromptIVA(dom);
};

export const handlerTypeOfIva = ({ percentIva }) => {
    updateState(previousData => {
        const newData = previousData.data.map(item => {
            const updatedItem = {
                ...item,
                percentIva: percentIva,
            };

            updatedItem.iva = utils.getIVA(updatedItem, percentIva);
            updatedItem.amount = utils.getAmount(updatedItem);

            return updatedItem;
        });

        return {
            data: newData,
            percentIva: percentIva
        };
    });
    
    document.querySelector('.overlay')?.remove();
    utils.changeLabelIva(percentIva);
    utils.refreshDataHTML(getState().data);
};

export const handlerSearchClient = ({ dom }) => {
    utils.showPromptSearchClient(dom);
};

export const handlerBtnCancelClient = () => {
    document.querySelector('.overlay')?.remove();
};

export const handlerBtnSearchClient = () => {
    document.querySelector('.overlay')?.remove();
};