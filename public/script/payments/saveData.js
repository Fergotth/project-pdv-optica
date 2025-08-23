import { postData } from "../utils/postDataToDB.js";
import { newAlert } from "../utils/alerts.js";
import { getUnpaidNoteData } from "./getData.js";

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

export const updateUnpaidNotes = async () => {
    const unpaidNote = await getUnpaidNoteData();

    if(!unpaidNote) return false;

    // 
};