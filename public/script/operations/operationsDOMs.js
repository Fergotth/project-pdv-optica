export const getClientHTML = () => {
    return `
    <div class="overlay">
        <div class="containerClient">
        <img src="../icons/cancel.svg" class="closeFormClient"></img>
            <div class="cardClient">
                <span class="titleClient">Datos del Cliente</span>
                <form class="formClient">
                    <div class="groupClient">
                        <input placeholder="" type="text" id="name" name="name" required="">
                        <label for="name">Nombre</label>
                    </div>
                    <div class="groupClient">
                        <input placeholder="" type="text" id="phone" name="phone" required="">
                        <label for="phone">Telefono</label>
                    </div>
                    <div class="groupClient">
                        <input placeholder="" type="date" id="date" name="date" required="">
                        <label for="date">Fecha de Nacimiento</label>
                    </div>
                    <div class="groupClient">
                        <input placeholder="" type="email" id="email" name="email">
                        <label for="email">Correo Electronico</label>
                    </div>
                    <div class="groupClient">
                        <textarea placeholder="" id="comments" name="comments" rows="5"></textarea>
                        <label for="comments">Comentarios</label>
                    </div>
                    <button class="btnSaveClient">Guardar</button>
                </form>
            </div>
        </div>
    </div>
    `;
};

export const getProductsHTML = () => {
    return `
    <div class="overlay">
        <div class="containerProducts">
            <div class="products--title"><h2>Registro de Articulos</h2></div>
            <div class="products--sku"> 
                <input class="sku--input" id="sku--input" type="text">
                <label for="sku--input">SKU</label>
            </div>
            <div class="products--category">
                <select class="category--input" id="category--input" name="category--input">
                    <option value="">--- Selecciona una categoria ---</option>
                    <option value="frames">Armazones</option>
                    <option value="glasses">Materiales</option>
                    <option value="accessories">Accesorios</option>
                    <option value="services">Servicios</option>
                </select>
                <label for="category--input">Categoria</label>
            </div>
            <div class="products--description">
                <input class="description--input" id="description--input" type="text">
                <label for="description--input">Descripcion</label>
            </div>
            <div class="products--pricePurchaseExcludingIVA">
                <input class="pricePurchaseExcludingIVA--input" id="pricePurchaseExcludingIVA--input" type="text">
                <label for="pricePurchaseExcludingIVA--input">Precio de Compra s/IVA</label>
            </div>
            <div class="products--pricePurchaseIncludingIVA">
                <input class="pricePurchaseIncludingIVA--input" id="pricePurchaseIncludingIVA--input" type="text">
                <label for="pricePurchaseIncludingIVA--input">Precio de Compra c/IVA</label>
            </div>
            <div class="products--quantity">
                <input class="quantity--input" id="IVA--input" type="text">
                <label for="quantity--input">Cantidad</label>
            </div>
            <div class="products--salePrice">
                <input class="salePrice--input" id="salePrice--input" type="text">
                <label for="salePrice--input">Precio de Venta</label>
            </div>
            <div class="products--netProfit">
                <div class="netProfit--input"></div>
                <label for="netProfit--input">Utilidad Neta</label>
            </div>
            <div class="products--buttons">
                <button class="btnProductsSave">Guardar</button>
                <button class="btnProductsCancel">Cancelar</button>
            </div>
        </div>
    </div>
    `;
}