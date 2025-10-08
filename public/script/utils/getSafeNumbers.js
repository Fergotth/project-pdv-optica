import { showErrorMessage } from "./errorMessage.js";

export const safeNumber = (value) => {
    const showError = () => {
        const msg = `El valor "${value}" no es un número válido`;
        showErrorMessage(document.body, msg);
        throw new Error(msg);
    };

    if (value == null) showError(); // cubre null y undefined

    const num = Number(String(value).trim());
    if (Number.isNaN(num) || String(value).trim() === "") showError();

    return num;
};