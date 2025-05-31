/**
 * 
 * @param {object} item  // Objeto con los datos a insertar en el elemento 
 * @returns {InnerHTML} // Contenido HTML dentro del nuevo elemento a insertar
 */

export const getItemRowInnerHTML = (item) => {
    return `
    <div class="itemRow--1" style="width: calc(1 / 8 * 100%);">
        <span class="minus" data-id="${item.position}" style="display: flex;">-</span>
        <span class="itemQuantity">${item.quantity}</span>
        <span class="plus" data-id="${item.position}" style="display: flex;">+</span>
    </div>
    <div class="description" style="width: calc(3 / 8 * 100%);">${item.description} ${item.material}</div>
    <div class="unitPrice" style="width: calc(1 / 8 * 100%);">${Number(item.price).toFixed(2)}</div>
    <div class="discount" data-id="${item.position}" style="width: calc(1 / 8 * 100%);">${Number(item.discount).toFixed(2)}</div>
    <div class="IVA" style="width: calc(1 / 8 * 100%);">${Number(item.iva).toFixed(2)}</div>
    <div class="price" style="width: calc(1 / 8 * 100%);">${Number(item.amount).toFixed(2)}</div>
    `;
};

/**
 * 
 * @param {integer} index   // Indice del elemento
 * @returns {InnerHTML}     // Contenido del contenedor a crear
 */
export const getDiscountContainerHTML = (index) => {
    return `
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
    `
};

/**
 * @returns {InnerHTML} // Contenido del contener de IVA a crear
 */
export const getContainerIVAHTML = () => {
    return `
    <div class="overlay">   
        <div class="containerIVA">
            <div class="custom-radioIVA">
                <input class="typeOfIva" type="radio" id="radio-IVA1" name="tabs" data-value="0" checked="">
                <label class="radio-labelIVA" for="radio-IVA1">
                    <div class="radio-circleIVA"></div>
                    <span class="radio-text">0%</span>
                </label>
                <input class="typeOfIva" type="radio" id="radio-IVA2" name="tabs" data-value="8">
                <label class="radio-labelIVA" for="radio-IVA2">
                    <div class="radio-circleIVA"></div>
                    <span class="radio-text">8%</span>
                </label>
                <input class="typeOfIva" type="radio" id="radio-IVA3" name="tabs" data-value="16">
                <label class="radio-labelIVA" for="radio-IVA3">
                    <div class="radio-circleIVA"></div>
                    <span class="radio-text">16%</span>
                </label>
            </div>
        </div>
    </div>
    `
};

/**
 * @returns {InnerHTML} // Contenedor del cliente a buscar
 */
export const getSearchClientContainerHTML = () => {
    return `
    <div class="overlay">   
        <form class="formSearchClient">
            <label>
                <span>Nombre del cliente</span>
                <input type="text" class="inputClient"/>
            </label>
            <div class="btnContainerClients">
                <button type="button" class="btnCancelClient" style="background-color: #374151;">Cancelar</button>
                <button type="button" class="btnSearchClient" style="background-color: #2563eb;">Buscar</button>
            </div>
        </form>
    </div>
    `
};

export const getTicketContainerHTML = () => {
    return `
    <div class="overlay">
        <div class="containerTicket">
            <div class="card cart">
                <label class="titleCard">RESUMEN</label>
                <div class="steps">
                    <div class="step">
                        <div>
                            <span class="items">ARTICULOS</span>
                            <!-- Se insertata un p para cada articulo -->
                            <span>Total<span class="total" style="font-size: 1.5rem;"></span>
                            </span>                            
                        </div>
                        <hr />
                        <div>
                            <span>METODO DE PAGO</span>
                            <div class="containerPaymentBody">
                                <div class="payment-container">
                                    <!-- Efectivo -->
                                    <label class="payment-option">
                                        <div class="icon-label">
                                            <img src="../../icons/payment-cash.svg"></img>
                                            <p class="label-text">Efectivo</p>
                                        </div>
                                        <input class="cash" type="radio" name="payment" value="Efectivo" />
                                    </label>
                                    <!-- Transferencia -->
                                    <label class="payment-option">
                                        <div class="icon-label">
                                            <img src="../../icons/payment-transfer.svg"></img>
                                            <p class="label-text">Transferencia</p>
                                        </div>
                                        <input class="transfer" type="radio" name="payment" value="Transferencia" />
                                    </label>
                                    <!-- Tarjeta Debito/Credito -->
                                    <label class="payment-option">
                                        <div class="icon-label">
                                            <img src="../../icons/payment-card.svg"></img>
                                            <p class="label-text">Debito/Credito</p>
                                        </div>
                                        <input class="card" type="radio" name="payment" value="Tarjeta" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="payment">
                            <span>PAGO</span>
                            <div class="form">
                                <input class="input_field" placeholder="Cantidad" type="text" />
                                <button class="paymentBtnApply">Aplicar</button>
                            </div>
                        </div>
                        <hr />
                        <div class="payments">
                            <div class="details">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card checkout">
                <div class="footer">
                    <label class="paymentPrice">$0.00</label>
                    <div class="btnTicketContainer">
                        <button class="checkoutBtnCancel">Cancelar</button>
                        <button class="checkoutBtnPay">Pagar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export const getNewPaymentHTML = (pay, paymentMethod, id) => {
    return `
    <div class="payment--${id}">
        <span>${paymentMethod}</span>
        <span>$${Number(pay).toFixed(2)}</span>
        <button class="buttonDeletePayment" data-id="${id}">
            <svg viewBox="0 0 448 512" class="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                </path>
            </svg>
        </button> 
    </div>
    `;
}