import { loader } from "./utils/loader.js";
import { getElement } from "./utils/getElement.js";
import { setData } from "./payments/setData.js";

const payments = async () => {
    getElement('.billPaymentsContainer').addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const btnSearchUnpaidNote = getElement('.billPayment__search');

    btnSearchUnpaidNote.addEventListener('click', async (event) => {
        try {
            loader(true);
            await setData(getElement('.billPayment__input').value);
        } catch (error) {
            console.error("Error al obtener los datos de la nota");
        } finally {
            loader(false);
        }
    });
};

export default payments;