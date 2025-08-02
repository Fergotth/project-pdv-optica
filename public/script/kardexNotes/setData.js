import { getDataClientDB } from "../clients/getData.js";
import { getElement } from "../utils/getElement.js";
import { 
    getDataNoteDB,
    getDataNotePaymentsDB,
    getDataNoteArticlesDB
} from "./getData.js";

export const setData = async (value) => {
    const data = {
        ...await getDataNoteDB(value),
        articles: {
            ...await getDataNoteArticlesDB(value)
        },
        payments: {
            ...await getDataNotePaymentsDB(value)
        }
    };

    const client = await getDataClientDB(2);

    console.log(data);
    console.log(client);
    getElement('.payments__second > span').textContent = `Nota: ${data[0].ID}`;
    getElement('.payment__clientName').textContent = client;
    getElement('.payments__summary span').textContent = `$${data[0].Total.toFixed(2)}`;
    getElement('.payment__date').textContent = `${data[0].PaymentDate}`;

};