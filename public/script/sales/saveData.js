import { getState } from "./state.js";

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
    const urlSalePayments = 'http://localhost:5500/';

    const totalPaid = paymentItems.reduce((acc, item) => acc + item.paid, 0);
    const balance = saleSummary.total - totalPaid;
    
    // Constructor de objeto con los datos de la venta
    const saleData = {
        ClientID: saleSummary.client,
        Discount: saleSummary.discount,
        IVA: saleSummary.iva,
        Total: saleSummary.total,
        Payment: totalPaid,
        Balance: balance,
        PaymentMethod: paymentItems[0].typeOfPayment,
        Status: (totalPaid - balance) === 0 ? 'Pagado' : 'Vigente' 
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
        IDSale: nextID,
        AmountPaid: paid,
        PaymentMethod: typeOfPayment
    }));

    // Mapeamos cada array en un array de promesas que usa postData
    const saleRequest = postData(urlSale, saleData);
    const saleDetailsRequest = saleDetailsData.map(item => postData(urlSaleDetails, item));
    const salePaymentsRequest = salePayments.map(item => postData(urlSalePayments, item));

/* 
Falta crear tabla para los abonos de una nota salePayments
Falta crear tabla para las notas pendientes sin pagar
*/

    // Esperamos a que todas las promesas se resuelvan
    const results = await Promise.all([
        saleRequest,
        ...saleDetailsRequest,
        ...salePaymentsRequest
    ]);

    const allSuccessful = results.every(result => result === true);

    if (allSuccessful) {
        console.log('Todos los datos fueron guardados exitosamente');
    } else {
        console.warn('Algunos datos no se pudieron guardar');
    }
};