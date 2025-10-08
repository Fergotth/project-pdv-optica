import { getElement } from '../utils/getElement.js';
import { newAlert } from '../utils/alerts.js';
import { showErrorMessage } from '../utils/errorMessage.js';
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
            
            if (!res) {
                showErrorMessage(document.body, "Fallo la respuesta del servidor");
                throw new Error('Fallo la respuesta del servidor');
            }

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
            showErrorMessage(document.body, `Error al guardar los datos del producto: ${error}`);
            console.error('Error al guardar los datos del producto:', error);
        }
    });
};

export default params;