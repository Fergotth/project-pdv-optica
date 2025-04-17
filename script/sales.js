import products from "../data/products.js";

const sales = () => {
    const addItem = document.querySelector('.container--iconSeachArticle');
    let data = [];
    let index = 0;

    addItem.addEventListener('click', () => {
        const itemSearched = document.querySelector('.container--inputArticule');
        let itemSKU = parseInt(itemSearched.value);

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
                    position: 0
                });

                index = data.length - 1;
                data[index].position = index;
                data[index].amount = data[index].price * data[index].quantity;
                refreshDataHTML(data);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No existe ese producto.",
                    icon: "info", //se puede usar success, error, warning, info, question
                });
            }
        } else {
            Swal.fire({
                title: "Error",
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
        listProduct.innerHTML = null;
        
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
                <div class="iva" style="width: calc(1 / 8 * 100%);">${item.iva}</div>
                <div class="price" style="width: calc(1 / 8 * 100%);">${Number(item.amount - item.discount + item.iva).toFixed(2)}</div>
                `;
            total += item.price * item.quantity - item.discount + item.iva;
            listProduct.appendChild(newItem);
        }

        totalLabel.innerText = `Total: $${parseFloat(total).toFixed(2)}`
    };

    document.addEventListener('click', function(event) {
        const button = event.target;
        const isMinus = button.classList.contains('minus');
        const isPlus = button.classList.contains('plus');
        const isDiscount = button.classList.contains('discount');
        const btnCancel = button.classList.contains('btnCancel');
        const btnAccept = button.classList.contains('btnAccept');
    
        if (isMinus || isPlus) {
            let index = button.dataset.id;
            let quantity = data[index].quantity;

            data[index].quantity = isMinus ? --quantity : ++quantity;
            data[index].amount = data[index].price * data[index].quantity;
            data = data.filter(item => item.quantity !== 0).map((item, index) => ({
                ...item, position: index
            }));

            refreshDataHTML(data);
        } else if (isDiscount) {
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
                        <button type="button" class="btnAccept" data-id="${button.dataset.id}" style="background-color: #2563eb;">Aceptar</button>
                    </div>
                </form>
            </div>
            `);
        } else if (btnCancel) {
            const overlayScreen = document.querySelector('.overlay');
            overlayScreen.remove();
        } else if (btnAccept) {
            const input = document.querySelector('.inputDiscount');
            const opCash = document.getElementById('value-1');
            const regex = /^\d*(\.\d{0,})?$/;
            let index = document.querySelector('.btnAccept').dataset.id;
            let discount = input.value;

            if (regex.test(discount) && discount !== "") {
                let amountToDiscount = opCash.checked ? discount : data[index].amount * (discount / 100);
                
                if (amountToDiscount < data[index].amount) {
                    const overlayScreen = document.querySelector('.overlay');
                    data[index].discount = parseFloat(amountToDiscount).toFixed(2);
                    refreshDataHTML(data);
                    overlayScreen.remove();
                } else {
                    Swal.fire({
                        title: "AVISO",
                        text: "El descuento no puede ser mayor al total del articulo. Ingrese un descuento valido",
                        icon: "info",
                    });
                }
            } else {
                Swal.fire({
                    title: "AVISO",
                    text: "Escriba un descuento valido",
                    icon: "question"
                });
            }
        }  
    });
}

export default sales;