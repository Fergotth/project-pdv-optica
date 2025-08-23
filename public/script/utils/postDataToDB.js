import { newAlert } from "./alerts.js";

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
            console.error("Error en la respuesta: ", result);
            return false;
        }

        return response.ok;
    } catch (error) {
        newAlert({
            icon: 'error',
            title: url,
            text: "Error al guardar los datos"
        });

        console.error('Error al guardar los datos: ', error);
        return false;
    }
};