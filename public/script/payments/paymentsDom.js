export const getBillPaymentSummaryHTML = (client, total, ID) => {
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
                        <span class="title">pagos<span>Abonos</span></span>
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