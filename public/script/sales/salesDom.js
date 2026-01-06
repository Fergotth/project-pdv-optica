import { formatMoney } from "./utils.js";
import { getState } from "./state.js";

/**
 * Regresa el innerHTML para cada elemento
 * @param {Object} product 
 * @returns {String} HTML
 */
export const getProductHTML = (product) => {
    const pathImg = product.Image ? `../../images/${product.Image}` : "../../images/no-image.jpg";
    
    return `
        <div class="content-image itemSelected" title="${product.Description}" data-sku="${product.SKU}">
            <img src="${pathImg}">
        </div>
    `;
};

/**
 * Regresa el innerHTML para las categorias de los materiales
 * @returns {String}
 */
export const getMaterialCatalogHTML = () => {
    const pathImg = '../../images/';
    
    return `
        <div class="content-image btnSinglevision" title="Monofocal" style="background-image: url(${pathImg}monofocal-frame.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: #B22222; font-weight: 600; letter-spacing: 3px;">
        Monofocal
        </div>
        <div class="content-image btnBifocal" title="Bifocal" style="background-image: url(${pathImg}bifocal-frame.png); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: #E0E0E0; font-weight: 600; letter-spacing: 3px;">
        Bifocal
        </div>
        <div class="content-image btnProgresive" title="Progresivo" style="background-image: url(${pathImg}progresivo-frame.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: flex-end; flex-direction: column; color: #8B0000 ; font-weight: 600; letter-spacing: 3px;">
        Progresivo
        </div>
    `;
};

/**
 * Regresa el innerHTML para cada elemento del carrito
 * @param {Object} product 
 * @returns {String}
 */
export const getItemToCardHTML = (product) => {
    const pathImg = product.Image ? `../../images/${product.Image}` : "../../images/no-image.jpg";

    return `
        <div class="item" title="${product.Description}">
            <div class="item-delete deleteItem" title="Quitar producto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" x2="10" y1="11" y2="17"/>
                    <line x1="14" x2="14" y1="11" y2="17"/>
                </svg>
            </div>
            <div class="item-product">
                <div class="product-image" data-sku="${product.SKU}">
                    <img src="${pathImg}" alt="">
                </div>
                <div class="product-details">
                    <span class="details-description">${product.Description}</span>
                    <span class="details-price">${formatMoney(product.SalePrice)}</span>
                </div>
            </div>
            <div class="item-button">
                <div class="button-quantity">1</div>
                <div class="button-buttons">
                    <button class="buttons-plus plusButton">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m18 15-6-6-6 6"/>
                        </svg>
                    </button>
                    <button class="buttons-minus minusButton">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="item-price">${formatMoney(product.SalePrice)}</div>
        </div>
    `;
};

/**
 * Regresa el innerHtml para prompt para aplicar descuento
 * @returns {String}
 */
export const getPromptDiscountHTML = () => {
    return `
    <div class="overlayPromptDiscount">
        <div class="promptDiscount">
            <div class="discount-container">
                <input class="discountInputValue" required="" placeholder="Descuento" type="number">
                <button class="setDiscountBtn" type="button">Aplicar</button>
            </div>
            <button class="cancelSetDiscountBtn">Cancelar</button>
        </div>
    </div>
    `;
};

/**
 * Regresa el innerHTML para el loader
 * @returns {String}
 */
export const getLoaderHTML = () => {
    return `
    <div class="overlayLoader">
        <div class="custom-loader"></div>
    </div>
    `;
};

/**
 * Obtener el innerHTML para el formulario de pago
 * @param {String} client 
 * @param {Number} total 
 * @param {Integer} ID 
 * @returns {String}
 */
export const getPaymentSummaryHTML = (client, total, ID) => {
    return `
    <div class="overlayPromptDiscount">
        <div class="paymentContainer">
            <div class="paymentCloseIcon" title="Cerrar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </div>
            <div class="leftsection">
                <div class="leftsection-header">
                    <div class="header-left">
                        <span class="title">pagos<span>Ventas</span></span>
                        <span class="subtitle">Registro de pagos</span>
                        <hr></hr>
                    </div>
                    <div class="header-right">
                        <span>Fecha</span>
                        <span></span>
                    </div>
                </div>
                <div class="leftsection-carousel-header">
                    <span>Forma de Pago</span>
                    <span>Seleccione su forma de pago</span>
                </div>
                <div class="sliderCarousel">
                    <div class="list">
                        <div class="item">
                            <img src="../../images/cash-eu.jpg" alt="">
                        </div>
                        <div class="item">
                            <img src="../../images/cash-mx.jpg" alt="">
                        </div>
                        <div class="item">
                            <img src="../../images/creditcard.png" alt="">
                        </div>
                        <div class="item">
                            <img src="../../images/spei2-removebg.png" alt="">
                            <div class="topic">Transferencia</div>
                        </div>
                        <div class="item">
                            <img src="../../images/cupon-removebg.png" alt="">
                        </div>
                    </div>
                    <div class="arrows">
                        <button class="prev"><</button>
                        <button class="next">></button>
                    </div>
                </div>
                <div class="paymentSection">
                    <div class="paymentLabels">
                        <span>Anticipo</span>
                        <span>Cantidad a abonar</span>
                    </div>
                    <input class="paymentValue" required="" placeholder="Cantidad" type="number">
                    <button class="applyPayment">Aplicar</button>
                </div>
            </div>
            <div class="rightsection">
                <div class="summaryClient">
                    <div class="summaryClientContainer">
                        <div class="clientIcon">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        <span class="summaryClientName" data-id="${ID}">${client}</span>
                    </div>
                    <div class="summaryClientSaleDetails">
                        <span>Total</span>
                        <span>${Number(total).toFixed(2)}</span>
                        <span>MX</span>
                    </div>
                </div>
                <div class="summarySale">
                    <div class="salePayments">
                        
                    </div>
                    <div class="summaryPaymentDetail">
                        <div class="detailTotal">
                            <span>0.00</span> MX</span>
                        </div>
                        <span>Total abonado</span>
                    </div>
                    <button class="btnApplyPayments">Registrar</button>
                </div>
            </div>
        </div>      
    </div>
    `;
};

/**
 * Obtener el innerHTML para cada pago realizado
 * @param {Number} payment 
 * @param {String} typeOfPayment 
 * @returns {String}
 */
export const getNewPaymentItemHTML = (payment, typeOfPayment) => {
    const typeOfPaymentConverted = typeOfPayment === 'Dolar' ? `${typeOfPayment} (x${payment})` : null;
    const paymentConverted = !typeOfPaymentConverted ? payment : payment * getState().dolar;
    
    return `
    <div class="paymentItem">
        <div class="itemCheck">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
        </div>
        <span class="typeOfPaymentValue">${typeOfPaymentConverted || typeOfPayment}</span>
        <span class="paidValue">${Number(paymentConverted).toFixed(2)}</span>
        <div class="itemDeletePayment">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
        </div>
    </div>
    `;
};

/**
 * Regresa el innerHTML para el formulario de busqueda de cliente
 * @returns {String}
 */
export const getSearchClientFormHTML = () => {
    return `
    <div class="overlaySearchClient">
        <div class="searchClientForm">
            <div class="searchClientCloseIcon" title="Cerrar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </div>
            <h3 class="titleClientForm">Busqueda de cliente</h3>
            <div class="groupItem1">
                <div class="group">
                    <svg class="iconSearchFormClient" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                        </path>
                        </g>
                    </svg>
                    <input placeholder="Nombre del paciente" type="search" class="input">
                    <button class="btnSearchClientForm">Buscar</button>
                </div>
            </div>
            <div class="listClientContainer">              
            </div>
        </div>
    </div>
    `;
};

/**
 * Obtiene el innerHTML para cada cliente encontrado
 * @param {Integer} ID 
 * @param {String} client 
 * @returns {String}
 */
export const getNewClientFoundedHTML = (ID, client) => {
    return `
    <div class="clientItem">
        <div class="itemFounded">
            ${client}
        </div>
        <button class="selectClient" data-id="${ID}">Seleccionar</button>
    </div> 
    `;
};

/**
 * Regresa el innerHTML para el prompt de cotizar venta
 * @returns {String}
 */
export const getPromptQuotationHTML = () => {
    return `
    <div class="overlayPromptQuotation">
        <div class="promptQuotation">
            <div class="quotation-container">
                <input class="quotationInputValue" required="" placeholder="No. Cotizacion" type="number">
                <button class="setQuotationBtn" type="button">Buscar</button>
            </div>
            <button class="cancelSetQuotationBtn">Cancelar</button>
        </div>
    </div>
    `;
};

export const getPrescriptionHTML = (data) => {
    return `
        <div class="overlayPromptDiscount">
            <div class="prescriptionContainer">
                <section class="p--header">
                    <h1>Captura de Receta de Laboratorio</h1>
                </section>
                <div class="p--closeIcon" title="Cerrar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </div>
                <section class="p--body">
                    <div class="body--left-section">
                        <img class="left--section--logo" src="../icons/logo-optica.png" alt="">
                        <nav class="left-section--menu">
                            <div class="menu--glasses" data-prescription="Oftalmica">
                                <div>
                                    <svg height="25px" width="25px" version="1.1" id="_x32_" viewBox="0 0 512 512" fill="#fff">
                                        <g>
                                        <path d="M494.808,192.041l-9.598-0.161c0,0-8.412-25.989-56.914-27.898c-38.4-1.518-77.883,1.098-112.568,6.744
                                            c-27.018,4.386-38.022,22.044-43.646,21.946L256,192.412l-16.083,0.258c-5.625,0.098-16.629-17.559-43.646-21.946
                                            c-34.685-5.646-74.168-8.262-112.568-6.744c-48.501,1.91-56.914,27.898-56.914,27.898l-9.598,0.161
                                            c-9.651,0.154-17.35,8.108-17.188,17.762l0.301,18.769c0.119,7.227,4.676,13.649,11.466,16.125l6.257,2.287
                                            c0,0,10.462,33.419,26.745,61.458c23.159,39.869,65.2,42.954,109.189,38.428c61.286-6.31,74.008-64.459,79.094-81.703
                                            c9.913-33.628,22.946-29.83,22.946-29.83s13.033-3.798,22.946,29.83c5.086,17.244,17.808,75.393,79.094,81.703
                                            c43.989,4.526,86.029,1.441,109.188-38.428c16.283-28.038,26.744-61.458,26.744-61.458l6.258-2.287
                                            c6.789-2.476,11.347-8.898,11.466-16.125l0.301-18.769C512.158,200.149,504.459,192.195,494.808,192.041z M200.335,263.404
                                            c-2.938,7.884-6.446,15.559-10.284,23.121c-8.09,15.936-19.955,27.528-39.368,29.438c-8.038,0.791-15.051,1.224-21.438,1.33
                                            c-37.189,0.602-49.19-10.536-56.624-22.659c-11.557-18.875-16.863-35.476-18.867-48.851c-5.684-37.938,30.557-44.284,59.173-42.961
                                            c23.918,1.106,51.744,0.79,75.036,6.458c10.916,2.658,17.699,10.458,18.755,18.748
                                            C208.254,240.059,205.718,248.985,200.335,263.404z M458.246,245.782c-2.004,13.375-7.311,29.976-18.867,48.851
                                            c-7.433,12.124-19.434,23.261-56.624,22.659c-6.387-0.106-13.401-0.539-21.438-1.33c-19.413-1.91-31.278-13.502-39.368-29.438
                                            c-3.838-7.562-7.346-15.237-10.284-23.121c-5.383-14.418-7.919-23.345-6.384-35.378c1.057-8.29,7.839-16.09,18.756-18.748
                                            c23.292-5.667,51.117-5.352,75.036-6.458C427.688,201.499,463.93,207.844,458.246,245.782z"/>
                                        </g>
                                    </svg>
                                </div>
                                <label>Receta Oftalmica</label>
                            </div>
                            <div class="menu--contactGlasses" data-prescription="Lentes de contacto">
                                <div>
                                    <svg width="20px" height="20px" version="1.1" id="_x32_" viewBox="0 0 512 512" fill="#fff">
                                        <path d="M0 0 C27.15075789 9.15444962 44.15219181 50.188311 55.95526123 73.86499023 C62.07539661 86.37199121 67.5465499 99.19218949 73 112 C73.51401367 113.20221191 74.02802734 114.40442383 74.55761719 115.64306641 C94.654079 162.94294164 110.26112735 212.25564693 123 262 C123.22558594 262.87936218 123.45117188 263.75872437 123.68359375 264.66473389 C130.72636021 292.21306956 136.43474859 319.93470674 141 348 C141.2077002 349.26150879 141.41540039 350.52301758 141.62939453 351.82275391 C143.86356895 365.93689905 144.28693551 379.98805588 144.375 394.25 C144.38321777 395.0809317 144.39143555 395.9118634 144.39990234 396.76797485 C144.62358045 427.22258048 144.62358045 427.22258048 135.2578125 436.77734375 C126.3561992 444.62627664 114.8212171 442.4219365 103.48876953 441.87988281 C65.24171666 439.36162435 28.08595636 425.66022556 -4 405 C-4.76699219 405.46148437 -5.53398437 405.92296875 -6.32421875 406.3984375 C-37.67495693 424.82291313 -71.86081532 436.70802884 -108 441 C-108.70463379 441.0942627 -109.40926758 441.18852539 -110.13525391 441.28564453 C-133.10715368 444.04661894 -158.32456677 443.29762717 -181 439 C-182.0223877 438.80664062 -183.04477539 438.61328125 -184.09814453 438.4140625 C-242.23860878 426.98180007 -297.80494303 395.43958774 -333 347 C-334.14855469 345.43378906 -334.14855469 345.43378906 -335.3203125 343.8359375 C-347.55060084 326.66239673 -357.01041997 308.3047124 -364.5 288.625 C-364.85078613 287.73401611 -365.20157227 286.84303223 -365.56298828 285.92504883 C-368.2038731 278.73552957 -369.8161154 271.0270385 -366.5625 263.8125 C-365.716875 262.884375 -364.87125 261.95625 -364 261 C-363.44828125 260.38769531 -362.8965625 259.77539062 -362.328125 259.14453125 C-322.34721657 219.08614044 -222.40871938 223.94049334 -169.3125 222.4375 C-168.58864105 222.41665344 -167.8647821 222.39580688 -167.11898804 222.37432861 C-149.06527074 221.86226798 -131.01114174 221.38361549 -113 223 C-113.33 222.34 -113.66 221.68 -114 221 C-119.12015178 174.98184572 -109.91967067 125.81763244 -88.07714844 85.01416016 C-87.33278249 83.62227008 -86.5969805 82.22577833 -85.86816406 80.82568359 C-80.24844354 70.03778546 -73.9269896 60.24201471 -66.359375 50.71777344 C-65.18750973 49.23694656 -64.0440492 47.73372189 -62.90625 46.2265625 C-51.65559983 31.71679541 -37.86663986 18.73390098 -23 8 C-22.00613281 7.28070313 -21.01226562 6.56140625 -19.98828125 5.8203125 C-12.94733243 0.81832604 -8.80954054 -0.99575924 0 0 Z M-7 15 C-16.24353454 25.50401653 -13.56379576 46.4685833 -12.79785156 59.41748047 C-6.83587716 141.86146229 18.65011108 223.93019906 106 414 C106.55042969 414.72316406 107.10085938 415.44632812 107.66796875 416.19140625 C111.13772597 420.4983703 115.13645617 424.30696333 120 427 C122.82216646 427.52066077 122.82216646 427.52066077 125 426 C147.32870076 388.15285221 119.21828675 306.37437106 109.0519104 266.84838867 C88.29326517 186.94454323 62.06964177 86.06697231 -1 16 C-4.17537168 15.18080895 -4.17537168 15.18080895 -7 15 Z M-39.45361328 42.44433594 C-51.95577231 55.193772 -62.29105261 69.43875525 -71 85 C-71.3722168 85.65548828 -71.74443359 86.31097656 -72.12792969 86.98632812 C-101.42479218 138.88648181 -107.42692045 201.72646147 -92 259 C-81.12463839 297.50120679 -61.50453805 331.09384661 -34 360 C-33.46068848 360.56799316 -32.92137695 361.13598633 -32.36572266 361.72119141 C2.00100438 397.65681266 47.77440635 419.91353831 97 426 C96.61835693 425.49573486 96.23671387 424.99146973 95.84350586 424.47192383 C55.44737143 370.88958434 32.10765528 303.39714451 12 240 C11.75570251 239.23163818 11.51140503 238.46327637 11.25970459 237.67163086 C-9.56693825 172.01943223 -28.53878499 101.41630075 -27 32 C-30.95112747 32 -36.57740257 39.58648196 -39.45361328 42.44433594 Z M-282 247 C-283.08442383 247.18143555 -284.16884766 247.36287109 -285.28613281 247.54980469 C-322.67031697 252.93930335 -322.67031697 252.93930335 -354 272 C-351.26366341 278.20236293 -345.44453713 281.46359725 -339.45043945 284.13720703 C-336.69575305 285.17178061 -333.92850793 286.10612452 -331.125 287 C-330.08472656 287.33684814 -329.04445313 287.67369629 -327.97265625 288.02075195 C-299.18900488 297.06710365 -269.05865982 301.13230175 -239.125 304.1875 C-237.9890892 304.30572113 -237.9890892 304.30572113 -236.83023071 304.42633057 C-230.89310169 305.03566006 -224.95041656 305.53941547 -219 306 C-217.87065033 306.08860291 -216.74130066 306.17720581 -215.57772827 306.26849365 C-191.34500763 308.09935974 -167.15922487 308.31422579 -142.8659668 308.26074219 C-137.53119801 308.24911688 -132.19662546 308.25608878 -126.86186314 308.26788712 C-122.71244292 308.27508482 -118.56307018 308.27283143 -114.41364861 308.26763153 C-112.44282952 308.26630105 -110.47200609 308.2679216 -108.50119209 308.27259064 C-105.78005382 308.27764608 -103.05924806 308.26997027 -100.33813477 308.25878906 C-99.13000877 308.26486176 -99.13000877 308.26486176 -97.8974762 308.27105713 C-94.06664398 308.24176302 -92.26468739 308.17645826 -89 306 C-89.38929688 305.26523437 -89.77859375 304.53046875 -90.1796875 303.7734375 C-94.27326253 295.56742304 -97.5305879 287.13870406 -100.47955322 278.46002197 C-101.0974685 276.64343869 -101.72789181 274.83112451 -102.35888672 273.01904297 C-106.27700936 261.24572403 -108.62678078 249.16490728 -111 237 C-168.17178253 236.55792688 -225.47395218 237.49500518 -282 247 Z M-344 298 C-336.54420178 315.12640709 -327.3452289 330.90877367 -315 345 C-314.01746168 346.16231619 -313.03712974 347.32649981 -312.05859375 348.4921875 C-303.43741706 358.72958038 -294.52108491 367.67486148 -284 376 C-283.03449219 376.78246094 -282.06898438 377.56492187 -281.07421875 378.37109375 C-240.34932094 410.71297575 -189.67683613 427.53003708 -137.875 427.3125 C-136.5210463 427.30976578 -136.5210463 427.30976578 -135.13973999 427.30697632 C-121.55058877 427.2608166 -108.3502336 426.72915625 -95 424 C-94.11473633 423.82839355 -93.22947266 423.65678711 -92.31738281 423.47998047 C-66.19293355 418.34232516 -42.22305121 408.87886026 -19 396 C-19 395.01 -19 394.02 -19 393 C-20.94584964 391.10564009 -20.94584964 391.10564009 -23.5625 389.1875 C-45.66704247 371.66908039 -63.07460728 350.46706502 -77.96948242 326.63134766 C-78.95478609 325.07157531 -79.97662503 323.53506246 -81 322 C-83.81776346 321.7290507 -86.41304204 321.65318751 -89.23022461 321.70703125 C-90.08592985 321.71133274 -90.94163509 321.71563423 -91.8232708 321.72006607 C-93.69471552 321.73139309 -95.56612755 321.74970342 -97.4374485 321.77402496 C-100.43707749 321.81295073 -103.43637223 321.83419507 -106.436203 321.85076904 C-110.71383512 321.87591759 -114.99132187 321.90827485 -119.26885986 321.94616699 C-130.33140164 322.04048814 -141.39412673 322.0672972 -152.45703125 322.078125 C-153.54225319 322.07928566 -154.62747513 322.08044632 -155.74558258 322.08164215 C-179.06191305 322.09358758 -202.22891099 321.31506602 -225.46069336 319.22784424 C-228.01553159 318.9986064 -230.57109797 318.77958964 -233.12695312 318.56201172 C-268.89289701 315.46937383 -305.40329885 310.96392725 -339.3671875 298.8828125 C-341.85322646 297.89402823 -341.85322646 297.89402823 -344 298Z" fill="#fff" transform="translate(368,35)"/>
                                    </svg>
                                </div>
                                <label>Receta Lentes de contacto</label>
                            </div>

                            <!-- Opcion pendiente del menu lateral -->
                        </nav>
                    </div>
                    <div class="body--right-section">
                        <section class="right-section--title">
                            <div class="title--h3">SOLICITUD RECETA</div>
                            <div class="title--kindOfPrescription">Oftalmica</div>
                        </section>
                        <section class="right-section--infoClient">
                            <label class="infoClient--title">Paciente</label>
                            <div class="infoClient--name">
                                <div style="font-weight: 300;">Nombre</div>
                                <div class="name--clientName">${data.client}</div>
                            </div>
                        </section>
                        <section class="right-section--presciption">
                            <label class="prescription--title">Prescripcion</label>
                            <div class="prescription--dates">
                                <div class="dates--start">
                                    <div style="font-weight: 300;">Fecha Prescripcion</div>
                                    <div class="start--prescription">${data.date}</div>
                                </div>
                                <div class="dates--end">
                                    <div style="font-weight: 300;">Vigencia*</div>
                                    <div class="end--prescription">${data.expirationDate}</div>
                                    <div class="end--title" style="margin-left: 15px;">Tipo de lente</div>
                                    <select class="end--menu" style="margin-left: 15px;">
                                        <option value="">Seleccione una opcion</option>
                                        <option value="sv">Monofocal</option>
                                        <option value="bf">Bifocal</option>
                                        <option value="prg">Progresivo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="prescription--OD">
                                <div class="OD--data">
                                    <div>OD Lejos</div>
                                    <label class="data--OD-labelSph">Esfera</label>
                                    <input type="text" class="data--OD-InputSignSph" placeholder="+/-">
                                    <input type="number" class="data--OD-InputSph" placeholder="0.00">
                                    <label>Cilindro</label>
                                    <input type="text" class="data--OD-InputSignCyl" value="-">
                                    <input type="number" class="data--OD-InputCyl" placeholder="0.00">
                                    <label>Eje</label>
                                    <input type="number" class="data--OD-InputAxis" placeholder="0-180">
                                    <label>Adicion</label>
                                    <label>+</label>
                                    <input type="number" class="data--OD-InputADD" placeholder="0.00">
                                    <label>DNP</label>
                                    <input type="number" class="data--OD-InputDNP">
                                    <label>Prisma Potencia</label>
                                    <input type="number" class="data--OD-InputPrism">
                                    <label>Base</label>
                                    <input type="number" class="data--OD-InputBase">
                                    <label>°</label>
                                </div>
                            </div>
                            <div class="prescription--OS">
                                <div class="OS--data">
                                    <div>OI Lejos</div>
                                    <label>Esfera</label>
                                    <input type="text" class="data--OS-InputSignSph" placeholder="+/-">
                                    <input type="number" class="data--OS-InputSph" placeholder="0.00">
                                    <label>Cilindro</label>
                                    <input type="text" class="data--OS-InputSignCyl" value="-">
                                    <input type="number" class="data--OS-InputCyl" placeholder="0.00">
                                    <label>Eje</label>
                                    <input type="number" class="data--OS-InputAxis" placeholder="0-180">
                                    <label>Adicion</label>
                                    <label>+</label>
                                    <input type="number" class="data--OS-InputADD" placeholder="0.00">
                                    <label>DNP</label>
                                    <input type="number" class="data--OS-InputDNP">
                                    <label>Prisma Potencia</label>
                                    <input type="number" class="data--OS-InputPrism">
                                    <label>Base</label>
                                    <input type="number" class="data--OS-InputBase">
                                    <label>°</label>
                                </div>
                            </div>
                        </section>
                        <button class="prescription--converter" title="RX Oftalmica a Lente de contacto">Convertir Rx</button>
                    </div>
                </section>
            </div>
        </div>
    `; 
};