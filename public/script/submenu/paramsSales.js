import { getElement } from '../utils/getElement.js';
import { newAlert } from '../utils/alerts.js';
import { updateState } from '../sales/state.js';
import { postData } from '../utils/postDataToDB.js';

const params = () => {
    getElement('.applyParams').addEventListener('click', async function () {
        const overlay = getElement('.overlayParams');
        const ID = 1;
        const IVA = Number(getElement('.params-radio-inputs input[name="radio"]:checked').value);
        const PriceDolar = Number(getElement('.dolarValue').value);
        const url = '/save-params';
    
        try {
            const res = await postData(url, { ID, IVA, PriceDolar });
            
            if (!res) throw new Error('Fallo la respuesta del servidor');

            overlay.remove();

            updateState(() => {
                return {
                    percentIVA: IVA,
                    dolar: PriceDolar
                };
            });

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