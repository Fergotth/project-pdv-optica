export const getClientHTML = () => {
    return `
    <div class="overlay">
        <div class="containerClient">
            <h2>Registro de Clientes</h2>
            <form class="container--formClient">
                <input type="text" placeholder="Nombre">
                <input type="text" placeholder="Apellidos">
                <input type="email" placeholder="Email">
                <input type="number" placeholder="Numero telefonico">
                <label>Fecha de Nacimiento</label>
                <input type="date" placeholder="Fecha de Nacimiento">
                <div class="container--radioButton">
                    <label for="" class="input_label">Sexo</label>
                    <div class="radio-input">
                        <label>
                            <input type="radio" id="value-1" name="value-radio" value="value-1">
                            <span>Hombre</span>
                        </label>
                        <label>
                            <input type="radio" id="value-2" name="value-radio" value="value-2">
                            <span>Mujer</span>
                        </label>
                        <label>
                            <input type="radio" id="value-3" name="value-radio" value="value-3">
                            <span>Otro</span>
                        </label>
                        <span class="selection"></span>
                    </div>
                </div>
                <div>
                    <textarea name="comments" class="commentClient" cols="30" rows="10"></textarea>
                </div>
                <button type="button" id="btnSaveClient">Guardar</button>
                <button type="button" id="btnCancelSaveClient">Cancelar</button>
            </form>
        </div>
    </div>
    `;
};