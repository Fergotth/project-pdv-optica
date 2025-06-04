import { getParsedHTML } from "../utils/getElement.js";

/**
 * 
 * @param {HTMLDivElement} DOM  // Elemendo padre donde se insertara el nuevo elemento
 * @param {String} innerHTML    // Codigo HTML a insertar
 */
export const handlerRegisterClient = ({ DOM, innerHTML }) => {
    DOM.appendChild(getParsedHTML(innerHTML));
};

export const handlerBtnSaveClient = ({ data }) => {
    const { name, email, phone, birthdate, comments } = data;

    if (!name || !email || !phone || !birthdate) {
        throw new Error("Todos los campos son obligatorios");
    }

    console.log("Datos del cliente guardados:");
    console.log(`Nombre: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Teléfono: ${phone}`);
    console.log(`Fecha de nacimiento: ${birthdate}`);

    return {
        name,
        email,
        phone,
        birthdate,
        comments: comments || ""
    };
};