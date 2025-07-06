import { getElement } from "../utils/getElement.js";
import { newAlert } from "../utils/alerts.js";

const params = () => {
    getElement('.applyParams').addEventListener('click', async function () {
        const overlay = getElement('.overlayParams');
        const ID = 1;
        const IVA = Number(getElement('.params-radio-inputs input[name="radio"]:checked').value);
        const PriceDolar = Number(getElement('.dolarValue').value);
        const url = 'http://localhost:5500/save-params';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ID, IVA, PriceDolar })
            });
    
            if (!response.ok) throw new Error('Fallo la respuesta del servidor');
            
            overlay.remove();

            newAlert({
                icon: "success",
                text: "Parámetros guardados exitosamente"
            });
    
        } catch (error) {
            console.error('Error al guardar los datos del producto:', error);
            newAlert({
                icon: "error",
                text: "Error al guardar los parámetros"
            });
        }
    });
};

export default params;