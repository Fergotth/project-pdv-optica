import { showErrorMessage } from "./errorMessage.js";

export const postData = async (url, data, remainingAttempts = 3) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Mejor que .json() para evitar errores de parseo
            showErrorMessage(document.body, `Error en la respuesta: ${errorText}`);
            console.error("Error en la respuesta: ", errorText);
            return false;
        }

        // Si ok, confirma que hay JSON válido (opcional, pero seguro)
        const result = await response.json();
        console.log("Datos guardados:", result);
        return true;
    } catch (error) {
        if (remainingAttempts > 0) {
            // Espera 500ms y reintenta recursivamente
            await new Promise(resolve => setTimeout(resolve, 500));
            return await postData(url, data, remainingAttempts - 1);
        } else {
            showErrorMessage(document.body, `${url} -> Error al guardar los datos: ${error}`);
            console.error('Error al guardar los datos: ', error);
            return false;
        }
    }
};