import products from "../data/products.js";
import { newAlert } from "../script/utils/alerts.js";

const sales = () => {
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

    const refreshDataHTML = (newData) => {
        const listProduct = document.querySelector('.container--shoppingArticles');
        const totalLabel = document.querySelector('.container--totalPrice');
        let total = 0;
        listProduct.innerHTML = '';
        
        for (const item of newData) {
            let newItem = document.createElement('div');
            newItem.classList.add('itemRow');
            newItem.innerHTML =
                `
                <div class="itemRow--1" style="width: calc(1 / 8 * 100%);">
                    <span class="minus" data-id="${item.position}" style="display: flex;">-</span>
                    <span class="itemQuantity">${item.quantity}</span>
                    <span class="plus" data-id="${item.position}" style="display: flex;">+</span>
                </div>
                <div class="description" style="width: calc(3 / 8 * 100%);">${item.description} ${item.material}</div>
                <div class="unitPrice" style="width: calc(1 / 8 * 100%);">${Number(item.price).toFixed(2)}</div>
                <div class="discount" data-id="${item.position}" style="width: calc(1 / 8 * 100%);">${item.discount}</div>
                <div class="iva" data-id="${item.position}" style="width: calc(1 / 8 * 100%);">${Number(item.iva).toFixed(2)}</div>
                <div class="price" style="width: calc(1 / 8 * 100%);">${Number(item.amount).toFixed(2)}</div>
                `;
            total += item.amount;
            listProduct.appendChild(newItem);
        }

        totalLabel.innerText = `Total: $${parseFloat(total).toFixed(2)}`
    };

    document.addEventListener('click', function(event) {
        if (!event.target) return;

        /**
         * @constant {HTMLElement} - Boton que se presiono dentro del contenedor 
         */
        const button = event.target;

        /**
         * @param {boolean} - Valor booleano si se encontro alguna de esas clases
         */
        const isMinus = button.classList.contains('minus');
        const isPlus = button.classList.contains('plus');
        const isDiscount = button.classList.contains('discount');
        const isIVA = button.classList.contains('iva');
        const btnCancel = button.classList.contains('btnCancel');
        const btnAccept = button.classList.contains('btnAccept');

        if (isMinus || isPlus) {
            event.stopPropagation();
            handleQuantityButton(button);
            refreshDataHTML(data);
            return;
        }

        if (btnCancel || btnAccept) 
        {
            event.stopPropagation();
            handleDiscount(button); 
            return;
        }
        
        if (isDiscount) {
            event.stopPropagation();
            showPromtDiscount(parseInt(button.dataset.id, 10));
            return;
        }
        
        if (isIVA) {
            event.stopPropagation();
            showPromptIVA();
            return;
        }
    });

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
            const discount = input.value.trim();

            if (regex.test(discount) && discount !== "") {
                const amountToDiscount = opCash.checked ? discount : data[index].amount * (discount / 100);

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
        formIVA.insertAdjacentHTML('afterbegin', `
        <div class="overlay">   
            <div class="containerIVA">
                <div class="custom-radioIVA">
                    <input type="radio" id="radio-IVA1" name="tabs" checked="">
                    <label class="radio-labelIVA" for="radio-IVA1">
                        <div class="radio-circleIVA"></div>
                        <span class="radio-text">0%</span>
                    </label>
                    <input type="radio" id="radio-IVA2" name="tabs">
                    <label class="radio-labelIVA" for="radio-IVA2">
                        <div class="radio-circleIVA"></div>
                        <span class="radio-text">8%</span>
                    </label>
                    <input type="radio" id="radio-IVA3" name="tabs">
                    <label class="radio-labelIVA" for="radio-IVA3">
                        <div class="radio-circleIVA"></div>
                        <span class="radio-text">16%</span>
                    </label>
                </div>
            </div>
        </div>
        `);
    };

    const getIVA = (index, IVA) => {
        const item = data[index];
        return parseFloat((item.quantity * item.price - item.discount) * (IVA / 100));
    };

    const getAmount = (index) => {
        const item = data[index];
        return (item.quantity * item.price) - item.discount + item.iva;
    };

    const showPromtDiscount = (index) => {
        const windowInput = document.body;
        windowInput.insertAdjacentHTML('afterbegin', `
        <div class="overlay">   
            <form class="formDiscount">
                <label>
                    <span>Cantidad o porcentaje a descontar</span>
                    <input type="text" class="inputDiscount"/>
                </label>
                <div>
                    <div class="radio-input">
                        <input value="value-1" name="value-radio" id="value-1" type="radio" checked>
                        <label for="value-1">$</label>
                        <input value="value-2" name="value-radio" id="value-2" type="radio">
                        <label for="value-2">%</label>
                    </div>
                    <button type="button" class="btnCancel" style="background-color: #374151;">Cancelar</button>
                    <button type="button" class="btnAccept" data-id="${index}" style="background-color: #2563eb;">Aceptar</button>
                </div>
            </form>
        </div>
        `);
    };
};

export default sales;