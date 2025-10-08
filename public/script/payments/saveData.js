import { postData } from '../utils/postDataToDB.js';
import { newAlert } from '../utils/alerts.js';
import { getElement } from '../utils/getElement.js';
import { safeNumber } from '../utils/getSafeNumbers.js';
import { showErrorMessage } from '../utils/errorMessage.js';

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

    return true;
};

export const updateUnpaidNotes = async (data) => {
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
};