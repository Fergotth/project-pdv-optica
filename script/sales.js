import { newAlert } from "../script/utils/alerts.js";
import { getItemRowInnerHTML, getDiscountContainerInnerHTML, getContainerIVAHTML } from "./sales/domsales.js";
import { getHandlerArgs } from "./sales/handlerDispatcher.js";
import { getState, updateState } from "./sales/stateSales.js";

const sales = () => {
    document.querySelector('.formSales').addEventListener('click', (event) => {
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
                updateState(previousData => {
                    const newData = [...previousData.data, {
                        price: productSearched.price,
                        description: productSearched.description,
                        material: productSearched.material,
                        quantity: 1,
                        discount: 0,
                        iva: 0,
                        amount: 0,
                        percentIVA: previousData.percentIva,
                        position: previousData.data.length
                    }];

                    const updatedItem = {
                        ...newData[newData.length - 1],
                        iva: getIVA(newData[newData.length - 1], previousData.percentIva),
                        amount: getAmount(newData[newData.length - 1])
                    };

                    newData[newData.length - 1] = updatedItem;
                    return { ...previousData, data: newData };
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

    const handlerMinus = ({ button, index }) => {
        handleQuantityButton(button, index);
        refreshDataHTML(getState().data);
    };

    const handlerPlus = ({ button, index }) => {
        handleQuantityButton(button, parseInt(button.dataset.id, 10));
        refreshDataHTML(getState().data);
    };

    const handlerDiscount = ({ index, dom }) => {
        showPromptDiscount(index, dom);
    };

    const handlerBtnCancel = ({ button }) => {
        setDiscount( {button} );
    };

    const handlerBtnAccept = ({ button, input, ivaSelected, index }) => {
        setDiscount({ button, input, ivaSelected, index });
    };

    const handlerIva = ({ dom }) => {
        showPromptIVA(dom);
    };

    const handlerTypeOfIva = ({ percentIva }) => {
        updateState(previousData => {
            const newData = previousData.data.map(item => {
                const updatedItem = {
                    ...item,
                    percentIva: percentIva,
                };

                updatedItem.iva = getIVA(updatedItem, percentIva);
                updatedItem.amount = getAmount(updatedItem);

                return updatedItem;
            });

            return {
                data: newData,
                percentIva: percentIva
            };
        });
        
        document.querySelector('.overlay')?.remove();
        changeLabelIva(percentIva);
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

        updateState(previousData => {
            const newData = [...previousData.data];
            
            newData[index] = {
                ...newData[index],
                quantity: newData[index].quantity + quantity,
                discount: quantity < 0 ? 0 : newData[index].discount
            };

            const finalData = newData
                .filter(item => item.quantity > 0)
                .map((item, i, filteredData) => ({
                    ...item,
                    position: i,
                    iva: getIVA(item, previousData.percentIva),
                    amount: getAmount(filteredData[i])
                }));
            
            return {
                data: finalData                    
            };
        });
        
        refreshDataHTML(getState().data);
    };

    const setDiscount = ({ button, input, ivaSelected, index }) => {
        const overlayScreen = document.querySelector('.overlay');

        if (button.classList.contains('btnAccept')) {
            const regex = /^(?:\d+)(?:\.\d{1,2})?$/;
            const discountStr = input.value.trim();

            if (regex.test(discountStr) && discountStr !== "" && !isNaN(parseFloat(discountStr))) {
                const actualAmount = getState().data[index].amount;
                const amountToDiscount = ivaSelected.checked ? parseFloat(discountStr) : actualAmount * (parseFloat(discountStr) / 100);

                if (amountToDiscount < actualAmount) {
                    updateState(previousData => {
                        const newData = [...previousData.data]
                        
                        newData[index] = {
                            ...newData[index],
                            discount: parseFloat(amountToDiscount),
                            iva: getIVA(newData[index], newData[index].percentIVA)
                        };

                        newData[index].amount = getAmount(newData[index]);

                        return {
                            data: newData
                        };
                    });                  

                    refreshDataHTML(getState().data);
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
        element.appendChild(insertNewHTML(getContainerIVAHTML()));
    };

    const showPromptDiscount = (index, element) => {
        element.appendChild(insertNewHTML(getDiscountContainerInnerHTML(index)));
    };

    const changeLabelIva = (percentIva) => {
        const ivaLabel = document.querySelector('.amount--percentIVA');
        if (ivaLabel) {
            ivaLabel.textContent = `${percentIva}%`;
        }
    };

    const insertNewHTML = (innerHTML) => {
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(innerHTML, 'text/html');
        const parsedElement = parsedDocument.body.firstChild;

        if (parsedElement) {
            return parsedElement;
        }
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