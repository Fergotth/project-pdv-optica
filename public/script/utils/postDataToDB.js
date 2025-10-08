import { showErrorMessage } from "./errorMessage.js";

export const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            showErrorMessage(document.body, `Error en la respuesta: ${result}`);
            console.error("Error en la respuesta: ", result);
            return false;
        }

        return response.ok;
    } catch (error) {
        showErrorMessage(document.body, `${url} -> Error al guardar los datos: ${error}`);
        console.error('Error al guardar los datos: ', error);
        return false;
    }
};