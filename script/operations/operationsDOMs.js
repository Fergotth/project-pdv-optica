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