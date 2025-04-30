import products from "../data/products.js";
import { newAlert } from "../script/utils/alerts.js";
import { getItemRowInnerHTML, getDiscountContainerInnerHTML, getContainerIVAHTML } from "./sales/domsales.js";
import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import { getState, updateState } from "./sales/stateSales.js";

const sales = () => {
    document.body.addEventListener('click', (event) => {
        event.stopPropagation();
        const button = event.target;
        button.classList.forEach(className => {
            const handlerName = `handler${className.charAt(0).toUpperCase() + className.slice(1)}`;

            if (typeof globalThis[handlerName] === 'function') {
                const args = getHandlerArgs[handlerName]?.(button) || { button, state: getState() };
                globalThis[handlerName](args);
            }
        });
    });

    const handlerAddItem = ({ itemSearched, products }) => {
        let itemSKU = parseInt(itemSearched.value, 10);

        if (itemSKU) {
            const productSearched = products.find(product => product.sku === itemSKU);

            if (productSearched) {
                updateState(previusData => {
                    const newData = [...previusData.data, {
                        price: productSearched.price,
                        description: productSearched.description,
                        material: productSearched.material,
                        quantity: 1,
                        discount: 0,
                        iva: 0,
                        amount: 0,
                        percentIVA: previusData.percentIva,
                        position: previusData.data.length
                    }];

                    const updatedItem = {
                        ...newData[newData.length - 1],
                        iva: getIVA(newData[newData.length - 1], previusData.percentIva),
                        amount: getAmount(newData[newData.length - 1])
                    };

                    newData[newData.length - 1] = updatedItem;
                    return { ...previusData, data: newData };
                });
                
                refreshDataHTML(getState().data);
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

    const handlerMinus = ({ button }) => {
        handleQuantityButton(button, parseInt(button.dataset.id, 10));
        refreshDataHTML(getState().data);
    };

    const handlerPlus = ({ button }) => {
        handleQuantityButton(button, parseInt(button.dataset.id, 10));
        refreshDataHTML(getState().data);
    };

    const handlerDiscount = ({ index }) => {
        showPromptDiscount(index, document.body);
    };

    const handlerBtnCancel = (button) => {
        handleDiscount(button);
    };

    const handlerBtnAccept = (button) => {
        handleDiscount(button);
    };

    const handlerIva = () => {
        showPromptIVA(document.body);
    };

    const handlerTypeOfIva = ({ percentIva }) => {
        updateState(previusData => {
            const newData = previusData.data.map(item => ({
                ...item,
                percentIva: percentIva,
                iva: getIVA(item, percentIva)
            }));

            return {
                data: newData,
                percentIva: percentIva
            };
        });
        
        document.querySelector('.overlay')?.remove();
        refreshDataHTML(getState().data);
    };

    const refreshDataHTML = (newData) => {
        const listProduct = document.querySelector('.container--shoppingArticles');
        const totalLabel = document.querySelector('.container--totalPrice');
        let total = 0;
        listProduct.innerHTML = '';
        
        for (const item of newData) {
            let newItem = document.createElement('div');
            newItem.classList.add('itemRow');
            newItem.innerHTML = getItemRowInnerHTML(item);
            total += item.amount;
            listProduct.appendChild(newItem);
        }

        totalLabel.textContent = `Total: $${parseFloat(total).toFixed(2)}`
    };

    const handleQuantityButton = (button, index) => {
        const isMinus = button.classList.contains('minus');
        const quantity = isMinus ? -1 : 1;

        updateState(previusData => {
            const newData = [...previusData.data];
            
            newData[index] = {
                ...newData[index],
                quantity: newData[index].quantity + quantity
            };

            const finalData = newData
                .filter(item => item.quantity > 0)
                .map((item, i, filteredData) => ({
                    ...item,
                    position: i,
                    iva: getIVA(item, previusData.percentIva),
                    amount: getAmount(filteredData[i])
                }));
            
            return {
                data: finalData                    
            };
        });
        
        refreshDataHTML(getState().data);
    };

    const handleDiscount = (index) => {
        const overlayScreen = document.querySelector('.overlay');

        if (button.classList.contains('btnAccept')) {
            const input = document.querySelector('.inputDiscount');
            const opCash = document.getElementById('value-1');
            const regex = /^(?:\d+)(?:\.\d{1,2})?$/;
            const discountStr = input.value.trim();

            if (regex.test(discountStr) && discountStr !== "" && !isNaN(parseFloat(discountStr))) {
                const amountToDiscount = opCash.checked ? parseFloat(discountStr) : data[index].amount * (parseFloat(discountStr) / 100);

                if (amountToDiscount < data[index].amount) {
                    data[index].discount = parseFloat(amountToDiscount);
                    data[index].iva = getIVA(index, data[index].percentIVA);
                    data[index].amount = getAmount(index);
                    refreshDataHTML(data);
                    if (overlayScreen) overlayScreen.remove();
                } else {
                    newAlert({
                        title: "AVISO",
                        text: "El descuento no puede ser mayor al total del articulo. Ingrese un descuento valido",
                        icon: "info",
                    });
                }
            } else {
                newAlert({
                    title: "Error",
                    text: "Escriba un descuento valido",
                    icon: "error"
                });
            }
        } else {
            if (overlayScreen) overlayScreen.remove();
        }
    };

    const getIVA = (item, IVA) => {
        return parseFloat((item.quantity * item.price - item.discount) * (IVA / 100));
    };

    const getAmount = (item) => {
        return (item.quantity * item.price) - item.discount + item.iva;
    };

    const showPromptIVA = (element) => {
        element.insertAdjacentHTML('afterbegin', getContainerIVAHTML());
    };

    const showPromptDiscount = (index, element) => {
        element.insertAdjacentHTML('afterbegin', getDiscountContainerInnerHTML(index));
    };

    globalThis.handlerAddItem = handlerAddItem;
    globalThis.handlerMinus = handlerMinus;
    globalThis.handlerPlus = handlerPlus;
    globalThis.handlerDiscount = handlerDiscount;
    globalThis.handlerBtnCancel = handlerBtnCancel;
    globalThis.handlerBtnAccept = handlerBtnAccept;
    globalThis.handlerIva = handlerIva;
    globalThis.handlerTypeOfIva = handlerTypeOfIva;
};

export default sales;