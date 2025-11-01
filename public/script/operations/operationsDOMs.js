/**
 * @param {void}
 * @returns {String}    // Contenido para el elemento HTNL nuevo
 */
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

/**
 * @param {void}
 * @returns {String}    // Contenido para el elemento HTNL nuevo
 */
export const getProductsHTML = () => {
    return `
    <div class="overlay">
        <div class="container--ra">
            <section class="ra--section1">
                <div class="section1--logo">
                    <img src="../../icons/FernaSoft.svg" alt="">
                </div>
                <div class="section1--header">
                    <span class="header--title">Alta de nuevos productos</span>
                    <span class="header--subtitle">Registro de productos</span>
                </div>
            </section>
        
            <section class="ra--section2">
                <div class="section2--sku">
                    <div class="sku--title">
                        <span>SKU<svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16">
                            <path d="M0 2.53h2.49v10.95H0zm11 0h2.49v10.95H11zm-6.02 0h1.24v10.95H4.98zm2.49 0h1.24v10.95H7.47zm7.29 0H16v10.95h-1.24z"/>
                        </svg></span>
                    </div>
                    <div class="sku--input">
                        <input type="text" name="input--skuCode" class="input--skuCode" id="input--skuCode">
                        <label for="input--skuCode" class="input--labelSkuCode">Codigo del articulo</label>
                    </div>
                </div>
                <div class="section2--description">
                    <div class="description--title">
                        <span>Descripcion<svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16">
                            <path d="M13.13 4.13 9.37.37A1.26 1.26 0 0 0 8.48 0H3.75A1.25 1.25 0 0 0 2.5 1.25v13.5A1.25 1.25 0 0 0 3.75 16h8.5a1.25 1.25 0 0 0 1.25-1.25V5a1.26 1.26 0 0 0-.37-.87zm-.88 10.62h-8.5V1.25h3.48V5a1.25 1.25 0 0 0 1.25 1.27h3.77zm0-9.73H8.48V1.25L12.25 5z"/>
                            <path d="M5 7.5h6v1.25H5zM5 10h6v1.25H5z"/>
                        </svg></span>
                    </div>
                    <div class="description--input">
                        <input type="text" name="input--skuCode" class="input--description" id="input--description">
                        <label for="input--description" class="input--labelDescription">Descripcion del articulo</label>
                        <select type="text" class="input--description-category">
                            <option value="Monofocal" class="category--option"></option>
                            <option value="Bifocal">Bifocal</option>
                            <option value="Progresivo">Progresivo</option>
                        </select>
                    </div>
                </div>
            </section>
            
            <section class="ra--section3">
                <div class="section3--kindOfArticle">
                    <div class="kindOfArticle--title">
                        <span>Tipo de articulo<svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16">
                            <path d="m15.66 7-.91-2.68L8.62.85a1.28 1.28 0 0 0-1.24 0L1.25 4.32.34 7a1.24 1.24 0 0 0 .58 1.5l.33.18V11a1.25 1.25 0 0 0 .63 1l5.5 3.11a1.28 1.28 0 0 0 1.24 0l5.5-3.11a1.25 1.25 0 0 0 .63-1V8.68l.33-.18a1.24 1.24 0 0 0 .58-1.5zM10 9.87l-.48-1.28L14 6.13l.44 1.28zM8 1.94 13.46 5 8 8 2.54 5zM1.52 7.41 2 6.13l4.48 2.46L6 9.87zm1 1.95 4.25 2.32.62-1.84v3.87L2.5 11zM13.5 11l-4.88 2.71V9.84l.63 1.84 4.25-2.32z"/>
                        </svg></span>
                    </div>
                    <div class="kindOfArticle--input">
                        <label class="input--subtitle">Categoria</label>
                        <div class="input--radiobutton">
                            <label class="radiobutton--label">
                                <input 
                                    type="radio" 
                                    id="radiobutton--frames" 
                                    class="radiobutton--frames" 
                                    name="radiobutton--value" 
                                    value="frames"
                                />
                                <p class="radiobutton--text">Armazones</p>
                            </label>
                            <label class="radiobutton--label">
                                <input 
                                    type="radio" 
                                    id="radiobutton--glasses" 
                                    class="radiobutton--glasses" 
                                    name="radiobutton--value" 
                                    value="glasses"
                                />
                                <p class="radiobutton--text">Materiales</p>
                            </label>
                            <label class="radiobutton--label">
                                <input 
                                    type="radio" 
                                    id="radiobutton--accesories" 
                                    class="radiobutton--accesories" 
                                    name="radiobutton--value" 
                                    value="accessories"
                                />
                                <p class="radiobutton--text">Accesorios</p>
                            </label>
                            <label class="radiobutton--label">
                                <input 
                                    type="radio" 
                                    id="radiobutton--services" 
                                    class="radiobutton--services" 
                                    name="radiobutton--value" 
                                    value="services"
                                />
                                <p class="radiobutton--text">Servicios</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="section3--image">
                    <div class="image--title">
                        <span>Imagen del articulo
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16">
                                <path d="M15 3.5h-4l-.22-.65A1.24 1.24 0 0 0 9.6 2H6.4a1.24 1.24 0 0 0-1.18.85L5 3.5H1a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a1 1 0 0 0-1-1zm-.25 9.25H1.25v-8H5.9l.5-1.5h3.2l.5 1.5h4.65z"/><path d="M8 6a2.59 2.59 0 0 0-2.67 2.5A2.59 2.59 0 0 0 8 11a2.59 2.59 0 0 0 2.67-2.5A2.59 2.59 0 0 0 8 6zm0 3.75A1.35 1.35 0 0 1 6.58 8.5 1.35 1.35 0 0 1 8 7.25 1.35 1.35 0 0 1 9.42 8.5 1.35 1.35 0 0 1 8 9.75z"/>
                                <ellipse cx="12.84" cy="6.63" rx=".67" ry=".63"/>
                            </svg>
                        </span>
                    </div>
                    <label for="image--input" class="image--subtitle">Seleccione una imagen</label>
                    <input type="file" hidden class="image--input" id="image--input">
                    <div class="image--container"></div>
                    <div class="image--zoom">
                        <svg width="22px" height="22px" viewBox="0 0 20 20">
                            <path d="M9 5a1 1 0 100 2h2.586l-3.293 3.293a1 1 0 101.414 1.414L13 8.414V11a1 1 0 102 0V6c0-.025 0-.05-.003-.075A1 1 0 0014 5H9zM1 14.5A1.5 1.5 0 012.5 13h3A1.5 1.5 0 017 14.5v3A1.5 1.5 0 015.5 19h-3A1.5 1.5 0 011 17.5v-3z" fill="#5C5F62"/>
                            <path d="M2.5 1A1.5 1.5 0 001 2.5V11h2V3h14v14H9v2h8.5a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 1h-15z" fill="#5C5F62"/>
                        </svg>
                    </div>
                </div>
            </section>
        
            <section class="ra--section4">
                <div class="section4--summary">
                    <span class="summary--title">Informacion de costos<svg fill="#000000" width="20px" height="20px" viewBox="0 -0.5 17 17">
                        <path fill-rule="evenodd" d="M15.35 8c0 3.377-2.945 6.25-6.75 6.25S1.85 11.377 1.85 8 4.795 1.75 8.6 1.75 15.35 4.623 15.35 8zm1.25 0c0 4.142-3.582 7.5-8 7.5S.6 12.142.6 8C.6 3.858 4.182.5 8.6.5s8 3.358 8 7.5zM9.229 3.101l-.014 7.3-1.25-.002.014-7.3 1.25.002zm.016 9.249a.65.65 0 1 0-1.3 0 .65.65 0 0 0 1.3 0z"/>
                    </svg>
                    </span>
                </div>
                <div class="section4--inputs">
                    <div class="inputs--IVA">
                        <label for="IVA--input">IVA %</label>
                        <input type="number" class="IVA--input" id="IVA--input" value="8">
                    </div>
                    <div class="inputs--priceWithoutIVA">
                        <label for="priceWithoutIVA--input">Costo sin IVA</label>
                        <input type="text" class="priceWithoutIVA--input" id="priceWithoutIVA--input">
                    </div>
                    <div class="inputs--priceWithIVA">
                        <label for="priceWithIVA--input">Costo con IVA</label>
                        <input type="text" class="priceWithIVA--input" id="priceWithIVA--input">
                    </div>
                    <div class="inputs--priceSale">                    
                        <label for="priceSale--input">Precio de Venta</label>
                        <input type="text" class="priceSale--input" id="priceSale--input">
                    </div>
                    <div class="inputs--utility">
                        <label for="utility--input">Utilidad en %</label>
                        <input type="text" class="utility--input" id="utility--input">
                    </div>
                    <div class="inputs--units">
                        <label for="units--input">Unidades</label>
                        <input type="text" class="units--input" id="units--input">
                    </div>
                </div>
            </section>
        
            <section class="ra--section5">
                <button class="section5--accept btnProductsSave">Registrar</button>
                <button class="section5--cancel btnProductsCancel">Cancelar</button>
            </section>
        </div>
    </div>
    `;
};