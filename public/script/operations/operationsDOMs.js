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

// aun falta realizar bien esta parte
export const getProductInventary = () => {
    return `
    <div class="overlay">
        <div class="container--pd">
            <section class="pd--header">
                <h1>Consulta de articulos</h1>
                <div class="header--closeIcon btnCloseProductContainer" title="Cerrar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </div>
            </section>
            
            <section class="pd--searcher">
                <label for="searcher--input" class="searcher--label">Codigo</label>
                <input type="text" class="searcher--input" id="searcher--input">
                <label class="searcher--icon btnSearchArticles" title="Buscar">
                    <svg fill="#f6f6f6" width="33px" height="33px" viewBox="0 0 612 612">
                        <g><path d="M33.851,410.035H8.685c-4.796,0-8.685-3.889-8.685-8.686V69.911c0-4.796,3.889-8.685,8.685-8.685h25.166
                            c4.797,0,8.685,3.889,8.685,8.685V401.35C42.536,406.146,38.648,410.035,33.851,410.035z M138.343,61.226H95.607
                            c-4.796,0-8.685,3.889-8.685,8.685V401.35c0,4.797,3.889,8.686,8.685,8.686h42.736c4.797,0,8.685-3.889,8.685-8.686V69.911
                            C147.028,65.114,143.14,61.226,138.343,61.226z M216.48,61.226h-12.683c-4.796,0-8.685,3.889-8.685,8.685V401.35
                            c0,4.797,3.889,8.686,8.685,8.686h12.683c4.796,0,8.685-3.889,8.685-8.686V69.911C225.166,65.114,221.277,61.226,216.48,61.226z
                            M322.33,61.205h-52.874c-4.772,0-8.685,3.913-8.685,8.685v172.364c17.561-25.291,41.802-45.62,70.243-58.41V69.889
                            C331.015,65.117,327.197,61.205,322.33,61.205z M384.271,61.205h-0.191c-4.772,0-8.686,3.913-8.686,8.685V170.58
                            c5.823-0.859,11.645-1.528,17.562-1.813V69.889C392.955,65.117,389.137,61.205,384.271,61.205z M433.326,61.205H427.6
                            c-4.771,0-8.685,3.913-8.685,8.685v99.542c7.825,0.764,15.557,2.1,23.097,4.009V69.889
                            C442.011,65.117,438.098,61.205,433.326,61.205z M497.175,61.205h-27.964c-4.771,0-8.685,3.913-8.685,8.685v109.087
                            c16.415,6.013,31.687,14.507,45.334,25.005V69.889C505.86,65.117,501.947,61.205,497.175,61.205z M602.213,493.773l-71.765-71.764
                            c15.026-23.639,23.859-51.584,23.859-81.609c0-84.199-68.504-152.703-152.703-152.703S248.901,256.201,248.901,340.4
                            s68.504,152.703,152.703,152.703c30.024,0,57.97-8.832,81.608-23.859l71.766,71.766c6.523,6.523,15.071,9.785,23.618,9.785
                            c8.546,0,17.093-3.262,23.617-9.785C615.262,527.971,615.262,506.814,602.213,493.773z M296.62,340.4
                            c0-57.889,47.096-104.983,104.983-104.983S506.587,282.513,506.587,340.4c0,57.887-47.095,104.982-104.982,104.982
                            C343.716,445.383,296.62,398.289,296.62,340.4z"/>
                        </g>
                    </svg>
                </label>
            </section>

            <section class="pd--list">
                <div class="list--header">
                    <span>Codigo</span>
                    <span>Descripcion</span>
                    <span>Categoria</span>
                    <span>IVA %</span>
                    <span>Costo sin IVA</span>
                    <span>Costo con IVA</span>
                    <span>Precio de venta</span>
                    <span>Utilidad %</span>
                    <span>Unidades</span>
                    <span>Imagen</span>
                </div>
                <div class="list--items">
                    <div class="items--item">
                        <span>010139</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 1ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>124.32</span>
                        <span>4600.00</span>
                        <span>235.65</span>
                        <span>125</span>
                        <span>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                                <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M15 5.28571L16.8 7L21 3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>

                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M12 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12M16 3L18.5 5.5M18.5 5.5L21 8M18.5 5.5L21 3M18.5 5.5L16 8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                    <div class="items--item">
                        <span>010140</span>
                        <span>Progresivo Fotoromatico Antirreflejante Blueblock 2ra Serie</span>
                        <span>Materiales</span>
                        <span>16%</span>
                        <span>116.00</span>
                        <span>139.42</span>
                        <span>5100.00</span>
                        <span>205.65</span>
                        <span>125</span>
                        <span>X</span>
                    </div>
                </div>
            </section>

            <section class="pd--footer">
                <div class="footer--summary">
                    <label>Articulos encontrados</label>
                    <label>125</label>
                </div>
            </section>
        </div>
    </div>
    `;
};