import { 
    getDataNoteDB,
    getDataNotePaymentsDB,
    getDataNoteArticlesDB
} from "./getData.js";
import { getDataClientDB } from "../clients/getData.js";
import { 
    getElement, 
    getParsedHTML 
} from "../utils/getElement.js";
import { 
    getArticleHTML, 
    getPaymentHTML 
} from "./kardexDOM.js";
import { newAlert } from "../utils/alerts.js";

export const getNoteData = async (noteID) => {
    const noteResult = await getDataNoteDB(noteID);

    if (!noteResult || noteResult.length === 0) {
        newAlert({
            icon: "info",
            title: "Nota no encontrada",
            text: `No se encontró la nota con el numero de Folio ${noteID}.`
        });
        
        getElement('.payment__input').value = '';
        throw new Error(`No se encontró la nota con el numero de Folio ${noteID}`);
    }

    const [note] = noteResult;

    const articles = await getDataNoteArticlesDB(noteID);
    const payments = await getDataNotePaymentsDB(noteID);
    const [client] = await getDataClientDB(note.ClientID);

    return { note, articles, payments, client };
};


export const renderNoteHeader = ({ note, client }) => {
    getElement('.payments__second > span').textContent = `Nota: ${note.ID}`;
    getElement('.payment__clientName').textContent = client?.Name || "Publico General";
    getElement('.payments__summary span').textContent = `$${note.Total.toFixed(2)}`;
    getElement('.payment__date').textContent = `${note.PaymentDate}`;
};

export const renderArticles = (articles) => {
    const container = getElement('.payment__articles');
    container.replaceChildren();
    for (let key in articles) {
        const article = articles[key];
        container.appendChild(getParsedHTML(getArticleHTML(article)));
    }
};

export const renderPayments = (payments) => {
    const container = getElement('.payment__paymentsSummary');
    container.replaceChildren();
    let totalPaid = 0;

    for (let key in payments) {
        const payment = payments[key];
        container.appendChild(getParsedHTML(getPaymentHTML(payment)));
        totalPaid += payment.Paid;
    }

    return totalPaid;
};

export const renderTotals = (total, paid) => {
    const pending = total - paid;
    getElement('.payment__payments div:nth-child(1) span:nth-child(2)').textContent = `$${paid.toFixed(2)}`;
    getElement('.payment__payments div:nth-child(2) span:nth-child(2)').textContent = `$${pending.toFixed(2)}`;
    getElement('.payment__input').value = '';
};
