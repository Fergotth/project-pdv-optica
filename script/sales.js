import products from "../data/products.js";
import { newAlert } from "../script/utils/alerts.js";
import { getItemRowInnerHTML, getDiscountContainerInnerHTML, getContainerIVAHTML } from "./utils/domsales.js";

const sales = () => {
    /**
     * @var {HTMLElement}   // Elemento contener del icono de buscar artiuclo
     */
    const addItem = document.querySelector('.container--iconSeachArticle');

    /**
     * @var {array} - Array donde se almacenaran los datos de los articulos
     */
    let data = [];
    
    /**
     * @var {integer} - Valor del inidice del array donde se posiciona
     */
    let index = 0;

    if (!addItem) {
        newAlert({
            icon: "error",
            title: "No se ha cargado el contenedor principal. Reintente nuevamente",
            text: "Verifique la estructura HTML o recargue la pagina"
        });
        return;
    }

    addItem.addEventListener('click', (event) => {
        event.stopPropagation();
        const itemSearched = document.querySelector('.container--inputArticule');
        let itemSKU = parseInt(itemSearched.value, 10);

        if (itemSKU) {
            const productSearched = products.find(product => product.sku === itemSKU);

            if (productSearched) {
                data.push({
                    price: productSearched.price,
                    description: productSearched.description,
                    material: productSearched.material,
                    quantity: 1,
                    discount: 0,
                    iva: 0,
                    amount: 0,
                    percentIVA: 8,
                    position: 0
                });

                index = data.length - 1;
                data[index].position = index;
                data[index].iva = getIVA(index, data[index].percentIVA);
                data[index].amount = getAmount(index);
                
                refreshDataHTML(data);
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
    });

    /**
     * @type {HTMLElement}  // Evento de click dentro del contenedor
     */
    document.querySelector('.itemRow--1').addEventListener('click', function(event) {
        if (!event.target) return;

        event.stopPropagation();

        const isMinus = button.classList.contains('minus');
        const isPlus = button.classList.contains('plus');
        
        if (isMinus || isPlus) {
            handleQuantityButton(event.taget || "");
            refreshDataHTML(data);
        }
    });

    /**
     * @type {HTMLElement}  // Evento de click dentro del contenedor
     */
    document.querySelector('.discount').addEventListener('click', function(event) {
        if (!event.target) return;

        const button = event.target;
        const isDiscount = button.classList.contains('discount');
        
        if (isDiscount) {
            event.stopPropagation();
            showPromptDiscount(parseInt(button.dataset.id, 10));
            return;
        }

        const btnCancel = button.classList.contains('btnCancel');
        const btnAccept = button.classList.contains('btnAccept');

        if (btnCancel || btnAccept) 
        {
            event.stopPropagation();
            handleDiscount(button); 
            return;
        }
    });

    /**
     * @type {HTMLElement}  // Evento de click dentro del contenedor
     */
    document.querySelector('.iva').addEventListener('click', function(event) {
        if (!event.target) return;
        
        event.stopPropagation();

        const isIVA = button.classList.contains('iva');

        if (isIVA) showPromptIVA();
    });

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

    const handleDiscount = (button) => { debugger
        const overlayScreen = document.querySelector('.overlay');
        index = parseInt(button.dataset.id, 10);

        if (button.classList.contains('btnAccept')) {
            const input = document.querySelector('.inputDiscount');
            const opCash = document.getElementById('value-1');
            const regex = /^(?:\d+)(?:\.\d{1,2})?$/;
            const discountStr = input.value.trim();

            if (regex.test(discountStr) && discountStr !== "" && !isNaN(parseFloat(discountStr))) {
                const amountToDiscount = opCash.checked ? parseFloat(discountStr) : data[index].amount * (discount / 100);

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

    const getIVA = (index, IVA) => {
        const item = data[index];
        return parseFloat((item.quantity * item.price - item.discount) * (IVA / 100));
    };

    const getAmount = (index) => {
        const item = data[index];
        return (item.quantity * item.price) - item.discount + item.iva;
    };

    const showPromptDiscount = (index) => {debugger
        const windowInput = document.body;
        windowInput.insertAdjacentHTML('afterbegin', getDiscountContainerInnerHTML(index));
    };
};

export default sales;