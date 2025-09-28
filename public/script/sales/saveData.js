import { flushState, getState } from './state.js';
import { newAlert } from '../utils/alerts.js';
import { 
    generateTicket, 
    restartSaleForm,
    createStringProducts
} from './utils.js';
import { 
    createTicketSaleHTML, 
    createTicketQuotationHTML 
} from '../utils/ticket.js';
import { postData } from '../utils/postDataToDB.js';

export const saveData = async (cartItems, paymentItems, saleSummary) => {
    const urlSale = '/save-sales';
    const urlSaleDetails = '/save-saledetails';
    const urlSalePayments = '/save-salepayments';
    const urlUnpaidNotes = '/save-unpaidnotes';
    const urlTicketHTML = '/generate-ticketHTML';

    const totalPaid = Number(paymentItems.reduce((acc, item) => acc + item.Paid, 0).toFixed(2));
    const balance = Number((saleSummary.total - totalPaid).toFixed(2));
    
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
        SaleID: nextID,
        ReceiptID: 0
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
        const { percentIVA, dolar } = getState();
        const ticketSaved = await postData(urlTicketHTML, {
            html: createTicketSaleHTML(nextID, cartItems, paymentItems, saleSummary, percentIVA, dolar)
        });

        if (ticketSaved) {
            generateTicket(nextID, "sale");
        } else {
            newAlert({
                icon: 'error',
                text: `No se pudo guardar el HTML del ticket ${nextID}`
            });

            console.warn('No se pudo guardar el HTML del ticket');
            throw new Error('Error al guardar el ticket HTML');
        }
    } else {
        console.warn('Algunos datos no se pudieron guardar');
        throw new Error('Error');
    }
};

export const saveQuotation = async (data) => {
    const urlSaveQuotation = '/save-quotation';
    const quotationSaved = await postData(urlSaveQuotation, {
        ClientID: parseInt(data.clientId, 10),
        Subtotal: data.subtotal,
        Discount: data.discount,
        IVA: data.iva,
        Total: data.total,
        Products: createStringProducts(data.products)
    });
    
    if (!quotationSaved) {
        newAlert({
            icon: 'error',
            text: "No se pudo guardar la cotización"
        });

        console.warn('No se pudo guardar la cotización');
        throw new Error('Error al guardar la cotización');
    }

    const urlTicketHTML = '/generate-ticketHTML';
    const ticketCreated = await postData(urlTicketHTML, {
        html: createTicketQuotationHTML(data)
    });

    if (!ticketCreated) {
        newAlert({
            icon: 'error',
            text: "No se pudo guardar el HTML del ticket"
        });

        console.warn('No se pudo guardar el HTML del ticket');
        throw new Error('Error al guardar el ticket HTML');
    }

    generateTicket(data.nextID, "quotation");
    await flushState();
    restartSaleForm();
};