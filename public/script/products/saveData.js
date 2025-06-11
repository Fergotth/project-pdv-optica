import { getDataProductForm } from "./getData.js";
import { newAlert } from "../utils/alerts.js";

export const saveProduct = async () => {
    try {
        const response = await fetch('http://localhost:5500/save-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getDataProductForm())
        });

        if (response.ok) {
            newAlert({
                icon: "success",
                title: "Alta de Articulos",
                text: "Articulo agregado correctamente"
            });
        } else {
            newAlert({
                icon: "error",
                title: "Alta de Articulo",
                text: "Articulo no se pudo agregar"
            });
        }
    } catch (error) {
        newAlert({
            icon: "error",
            text: `Ha ocurrido un error al querer dar de alta un articulo: ${error}`
        });
    }
};