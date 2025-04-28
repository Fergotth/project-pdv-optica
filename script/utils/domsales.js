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
    <div class="discount" data-id="${item.position}" style="width: calc(1 / 8 * 100%);">${item.discount}</div>
    <div class="IVA" style="width: calc(1 / 8 * 100%);">${Number(item.iva).toFixed(2)}</div>
    <div class="price" style="width: calc(1 / 8 * 100%);">${Number(item.amount).toFixed(2)}</div>
    `;
};

/**
 * 
 * @param {integer} index   // Indice del elemento
 * @returns {InnerHTML}     // Contenido del contenedor a crear
 */
export const getDiscountContainerInnerHTML = (index) => {
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