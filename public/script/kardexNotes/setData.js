import { getDataClientDB } from "../clients/getData.js";
import { 
    getElement, 
    getParsedHTML 
} from "../utils/getElement.js";
import { 
    getArticleHTML, 
    getPaymentHTML 
} from "./kardexDOM.js";
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

    const [client] = await getDataClientDB(data[0].ClientID);

    console.log(data);
    console.log(client);
    getElement('.payments__second > span').textContent = `Nota: ${data[0].ID}`;
    getElement('.payment__clientName').textContent = client?.Name || "Publico General";
    getElement('.payments__summary span').textContent = `$${data[0].Total.toFixed(2)}`;
    getElement('.payment__date').textContent = `${data[0].PaymentDate}`;

    const articlesDOM = getElement('.payment__articles');
    const paymentsDOM = getElement('.payment__paymentsSummary');

    articlesDOM.replaceChildren();
    for (let key in data.articles) {
        const article = data.articles[key];
        articlesDOM.appendChild(getParsedHTML(getArticleHTML(article)));
    }

    paymentsDOM.replaceChildren();
    for (let key in data.payments) {
        const payment = data.payments[key];
        paymentsDOM.appendChild(getParsedHTML(getPaymentHTML(payment)));
    }
    
};