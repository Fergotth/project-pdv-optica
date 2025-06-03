export const getClientHTML = () => {
    return `
    <div class="overlay">
        <div class="containerClient">
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
                        <input placeholder="" type="email" id="email" name="email" required="">
                        <label for="email">Correo Electronico</label>
                    </div>
                    <div class="groupClient">
                        <textarea placeholder="" id="comment" name="comment" rows="5"></textarea>
                        <label for="comment">Comentarios</label>
                    </div>
                    <button>Guardar</button>
                </form>
            </div>
        </div>
    </div>
    `;
};