import { postData } from '../utils/postDataToDB.js';
import { newAlert } from '../utils/alerts.js';
import { getElement } from '../utils/getElement.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { showErrorMessage } from '../utils/errorMessage.js';

/**
 * 
 * @param {Object} data // Objeto con los datos a guardar 
 * @returns {Boolean}   // Resultado del proceso
 */
export const savePayments = async (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        newAlert({
            icon: 'info',
            text: "No se ha registrado ningun pago"
        });

        throw new Error("No se registro ningun pago");
    }

    try {
        const newPayments = data.map(item => postData('/save-salepayments', item));
        const result = await Promise.all(newPayments);

        if(result.some(r => r === false)) {
            newAlert({
                icon: 'info',
                text: "No se pudo registrarlos los pagos correctamente, intente nuevamente"
            });

            return false;
        }

        return true;
    } catch (error) {
        showErrorMessage(document.body, `Error al guardar pagos: ${error}`);
        return false;
    }
};

/**
 * 
 * @param {Object} data // Datos de los pagos
 * @returns {Boolean}   // Resultado del proceso
 */
export const updateUnpaidNotes = async (data) => {
    if (!data || data.length === 0) {
        showErrorMessage(document.body, "No hay datos de pagos para actualizar.");
        return false;
    }

    try {
        const balance = safeNumber(getElement('.summary__totalUnpaid + div').textContent.replace("$", "")) - 
            data.reduce((acc, item) => acc + item.Paid, 0); 

        let response = await postData('/update-unpaidNote', { 
            Balance: balance, 
            SaleID: data[0].SaleID,
            Status: !!balance ? 'Vigente' : 'Pagada'
        });
        
        if (!response) {
            showErrorMessage(document.body, "No se pudo actualiar correctamente la BD UnpaidSales, intente nuevamente");
            return false;
        }

        response = await postData('/update-statusSale', { 
            SaleID: data[0].SaleID, 
            Status: !!balance ? 'Vigente' : 'Pagada' 
        });

        if (!response) {
            showErrorMessage(document.body, "No se pudo actualiar correctamente la BD Sales, intente nuevamente");
            return false;
        }

        return true;
    } catch (error) {
        showErrorMessage(document.body, `Error al actualizar notas impagas: ${error}`);
        return false;
    }
};