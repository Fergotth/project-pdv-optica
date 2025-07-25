import { flushState, getState } from './state.js';
import { 
    generateTicket, 
    restartSaleForm 
} from './utils.js';
import { 
    createTicketSaleHTML, 
    createTicketQuotationHTML 
} from '../utils/ticket.js';

const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.ok;
    } catch (error) {
        console.error('Error al guardar los datos del producto: ', error);
        return false;
    }
};

export const saveData = async (cartItems, paymentItems, saleSummary) => {
    const urlSale = 'http://localhost:5500/save-sales';
    const urlSaleDetails = 'http://localhost:5500/save-saledetails';
    const urlSalePayments = 'http://localhost:5500/save-salepayments';
    const urlUnpaidNotes = 'http://localhost:5500/save-unpaidnotes';
    const urlTicketHTML = 'http://localhost:5500/generate-ticketHTML';

    const totalPaid = paymentItems.reduce((acc, item) => acc + item.Paid, 0);
    const balance = saleSummary.total - totalPaid;
    
    // Constructor del objeto con los datos de la venta
    const saleData = {
        ClientID: saleSummary.clientId,
        Discount: saleSummary.discount,
        IVA: saleSummary.iva,
        Total: saleSummary.total,
        Payment: totalPaid,
        Balance: balance,
        PaymentMethod: paymentItems[0].PaymentMethod,
        Status: balance === 0 ? "Pagado" : "Vigente"
    };

    // Constructor del objeto con los datos del detalle de la venta
    const nextID = getState().nextID;
    const saleDetailsData = cartItems.map(item => ({
        ...item,
        SaleID: nextID
    }));

    // Constructor del objeto con los datos de los pagos
    const salePayments = paymentItems.map(item => ({
        ...item,
        SaleID: nextID
    }));

    // Mapeamos cada array en un array de promesas que usa postData
    const saleRequest = postData(urlSale, saleData);
    const saleDetailsRequest = saleDetailsData.map(item => postData(urlSaleDetails, item));
    const salePaymentsRequest = salePayments.map(item => postData(urlSalePayments, item));

    const promises = [
        saleRequest,
        ...saleDetailsRequest,
        ...salePaymentsRequest
    ];

    // Verificaos si la nota tiene o quedo con saldo pendiente
    if (saleData.Balance > 0) {
        const saleUnpaidNotes = {
            SaleID: nextID,
            Total: saleData.Total,
            Balance: saleData.Balance,
            Status: "Vigente"
        };

        const saleUnpaidNotesRequest = postData(urlUnpaidNotes, saleUnpaidNotes);
        promises.push(saleUnpaidNotesRequest);
    }

    // Esperamos a que todas las promesas se resuelvan
    const results = await Promise.all(promises);

    const allSuccessful = results.every(result => result === true);
    document.querySelector('.thirdsection-content').replaceChildren();

    if (allSuccessful) {
        console.log('Todos los datos fueron guardados exitosamente');
        const ticketSaved = await postData(urlTicketHTML, {
            html: createTicketSaleHTML(nextID, cartItems, paymentItems, saleSummary, getState().percentIVA)
        });

        if (ticketSaved) {
            generateTicket(nextID, "sale");
        } else {
            console.warn('No se pudo guardar el HTML del ticket');
            throw new Error('Error al guardar el ticket HTML');
        }
    } else {
        console.warn('Algunos datos no se pudieron guardar');
        throw new Error('Error');
    }
};

export const saveQuotation = async (data) => {
    const urlTicketHTML = 'http://localhost:5500/generate-ticketHTML';
    const ticketSaved = await postData(urlTicketHTML, {
        html: createTicketQuotationHTML(data)
    });

    if (ticketSaved) {
        generateTicket(1, "quotation");
        restartSaleForm();
    } else {
        console.warn('No se pudo guardar el HTML del ticket');
        throw new Error('Error al guardar el ticket HTML');
    }
};