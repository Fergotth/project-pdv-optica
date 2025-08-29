import { postData } from '../utils/postDataToDB.js';
import { newAlert } from '../utils/alerts.js';
import { getElement } from '../utils/getElement.js';
import { getPaymentsData } from './getData.js';
import { safeNumber } from '../utils/getSafeNumbers.js';

export const savePayments = async (data) => {
    if (!data) {
        newAlert({
            icon: 'info',
            text: "No se ha registrado ningun pago"
        });

        throw new Error("No se registro ningun pago");
    }

    const newPayments = data.map(item => postData('/save-salepayments', item));
    const result = await Promise.all(newPayments);

    if(result.some(r => r === false)) {
        newAlert({
            icon: 'info',
            text: "No se pudo registrarlos los pagos correctamente, intente nuevamente"
        });

        return false;
    }

    newAlert({
        icon: 'success',
        text: "Pagos registrados exitosamente"
    });

    return true;
};

export const updateUnpaidNotes = async (elements) => {
    const data = getPaymentsData(elements);
    const balance = safeNumber(getElement('.summary__totalPaid + div').textContent) + 
        data.reduce((acc, item) => acc + item.Paid, 0);

    const response = postData('/update-unpaidNote', { Balance: balance, SaleID: data.SaleID });
    // seguir aqui, validar envio de datos
};