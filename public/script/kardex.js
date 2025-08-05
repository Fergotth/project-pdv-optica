import { loader } from "./utils/loader.js";
import { getElement } from "./utils/getElement.js";
import { setData } from "./kardexNotes/setData.js";

const kardexNote = async () => {
    getElement('.billPaymentsContainer').addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const btnSearchNote = getElement('.payment__search');

    btnSearchNote.addEventListener('click', async (event) => {
        try {
            loader(true);
            await setData(getElement('.payment__input').value)
        } catch (error) {
            console.error("Error al obtener los datos de la nota: ", error);
        } finally {
            loader(false)
        }
    });
};

export default kardexNote;