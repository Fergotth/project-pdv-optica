import { getState } from "./state.js";

const sendDataSales = async (url, data) => {
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

export const saveData = async (itemsCart, itemsPayment, itemsSummary) => {
    const urlSale = 'http://localhost:5500/save-sales';
    const urlSaleDetails = 'http://localhost:5500/payment';   // URL ejemplo para payment
    const urlSummary = 'http://localhost:5500/save-saledetails';

    // falta construir todo el codigo para guardar los datos en la base de datos
    // Mapeamos cada array en un array de promesas que usa sendDataSales

    const cartRequests = itemsCart.map(item => sendDataSales(urlCart, item));
    const paymentRequests = itemsPayment.map(item => sendDataSales(urlPayment, item));
    const summaryRequest = sendDataSales(urlSummary, itemsSummary);

    // Esperamos a que todas las promesas se resuelvan
    const results = await Promise.all([
        ...cartRequests,
        ...paymentRequests,
        summaryRequest
    ]);

    const allSuccessful = results.every(result => result === true);

    if (allSuccessful) {
        console.log('Todos los datos fueron guardados exitosamente');
    } else {
        console.warn('Algunos datos no se pudieron guardar');
    }
};