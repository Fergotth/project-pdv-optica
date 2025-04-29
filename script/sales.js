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
                globalThis[handlerName](button);
            }
        });
    });

    const handlerAddItem = ({ button, itemSearched, products, state }) => {
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
                        percentIVA: state.iva,
                        position: previusData.data.length
                    }];

                    const updatedItem = {
                        ...newData[newData.length - 1],
                        iva: getIVA(newData.length - 1, state.iva, newData),
                        amount: getAmount(newData.length - 1, newData)
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

    const handlerMinus = (button) => {
        handleQuantityButton(button || "");
        refreshDataHTML(data);
    };

    const handlerPlus = (button) => {
        handleQuantityButton(button || "");
        refreshDataHTML(data);
    };

    const handlerDiscount = (button) => {
        showPromptDiscount(parseInt(button.dataset.id, 10));
    };

    const handlerBtnCancel = (button) => {
        handleDiscount(button);
    };

    const handlerBtnAccept = (button) => {
        handleDiscount(button);
    };

    const handlerIva = (button) => {
        showPromptIVA();
    };

    const handlerTypeOfIva = (button) => {
        iva = parseInt(button.dataset.value, 10);
        data = data.map((item) => ({
            ...item, percentIVA: iva,
            ...item, iva: getIVA(item.position, iva)
        }));
        
        document.querySelector('.overlay').remove();
        refreshDataHTML(data);
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

    const handleQuantityButton = (button) => {
        const isMinus = button.classList.contains('minus');
        index = parseInt(button.dataset.id, 10);

        if (!data[index]) {
            newAlert({
                title: "Error",
                text: "No se encontró el elemento correspondiente.",
                icon: "error"
            });
            return;
        }

        let quantity = data[index].quantity;

        data[index].quantity = isMinus ? --quantity : ++quantity;
        data[index].discount = isMinus ? 0 : data[index].discount;
        data[index].iva = getIVA(index, data[index].percentIVA);
        data[index].amount = getAmount(index);
        data = data.filter(item => item.quantity !== 0).map((item, index) => ({
            ...item, position: index
        }));
    };

    const handleDiscount = (button) => {
        const overlayScreen = document.querySelector('.overlay');
        index = parseInt(button.dataset.id, 10);

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

    const showPromptIVA = () => {
        const formIVA = document.body;
        formIVA.insertAdjacentHTML('afterbegin', getContainerIVAHTML());
    };

    const getIVA = (index, IVA, data) => {
        const item = data[index];
        return parseFloat((item.quantity * item.price - item.discount) * (IVA / 100));
    };

    const getAmount = (index, data) => {
        const item = data[index];
        return (item.quantity * item.price) - item.discount + item.iva;
    };

    const showPromptDiscount = (index) => {
        const windowInput = document.body;
        windowInput.insertAdjacentHTML('afterbegin', getDiscountContainerInnerHTML(index));
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