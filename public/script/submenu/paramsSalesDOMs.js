export const getParamsSalesHTML = () => {
    return `
    <div class="overlayParams">
        <div class="paramsContainer">
            <div class="title">Parametros de Venta Basicos</div>
            <h3>IVA</h3>
            <div class="params-radio-inputs">
                <label class="radio-param">
                    <input type="radio" name="radio" value="0" checked="" />
                    <span class="name">0%</span>
                </label>
                <label class="radio-param">
                    <input type="radio" name="radio" value="8"/>
                    <span class="name">8%</span>
                </label>
                <label class="radio-param">
                    <input type="radio" name="radio" value="16"/>
                    <span class="name">16%</span>
                </label>
            </div>
            <h3>Precio Dolar</h3>
            <input class="dolarValue" required="" placeholder="Valor del dolar" type="number">
            <button class="applyParams">Aplicar</button>
        </div>      
    </div>
    `;
};