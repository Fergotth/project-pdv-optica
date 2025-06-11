import { newAlert } from "../utils/alerts.js";

/**
 * @param {Object}  // Datos del cliente a guardar
 */
export const saveClient = async (data) => {
    try {
        const response = await fetch('http://localhost:5500/save-clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            newAlert({
                icon: "success",
                title: "Alta de Cliente",
                text: "Cliente agregado correctamente"
            });
        } else {
            newAlert({
                icon: "error",
                title: "Alta de Cliente",
                text: "Cliente no se pudo agregar"
            });
        }
    } catch (error) {
        newAlert({
            icon: "error",
            text: `Ha ocurrido un error: ${error}`
        });
    }
};