import { 
    updateState, 
    getState 
} from '../sales/state.js';
import { getElement } from '../utils/getElement.js';
import { newAlert } from '../utils/alerts.js';
import { safeNumber } from '../utils/getSafeNumbers.js';

export const getData = async (value) => {
    try {
        const response = await fetch(`/find-unpaidSale?q=${encodeURIComponent(value)}`);
        
        if (!response.ok) {
            newAlert({
                icon: "error",
                text: `Error HTTP: ${response.status}` 
            });
            return null;
        }

        const data = await response.json();

        // Validar que venga con datos
        if (!data || !data.SaleID) {
            newAlert({
                icon: "info",
                title: "Busqueda fallida",
                text: "No existe esa nota de venta. Por favor, intente nuevamente.",
            });
            return null;
        }

        return {
            total: data.Total ?? 0,
            unpaid: data.Balance ?? 0,
            totalPaid: (data.Total ?? 0) - (data.Balance ?? 0),
            client: data.ClientName || "Público General",
            idClient: data.ClientID,
            status: data.StatusByDate
        };

    } catch (error) {
        console.error("Error en getData:", error);
        newAlert({
            icon: "info",
            title: "Busqueda fallida",
            text: "No se pudo obtener la información de la venta. Por favor, intente nuevamente.",
        });
        return null;
    }
};

export const getPaymentsData = (items) => {    
    const newData = Array.from(items).map(item => {
        const paid = safeNumber(item.querySelector('.paidValue').textContent);
        const saleID = safeNumber(getElement('.second__title div:nth-child(1) > span').textContent); 

        return {
            PaymentMethod: item.querySelector('.typeOfPaymentValue').textContent.trim(),
            Paid: paid,
            SaleID: saleID
        };
    });

    if (!newData.every(item => !!item.Paid)) {
        newAlert({
            icon: 'info',
            title: "Dato invalido",
            text: "Algun pago es invalido, favor de corregir e intentar nuevamente."
        });
        return;
    } 

    updateState(previusData => ({
        dataPayment: [ ...previusData.dataPayment, ...newData ]
    }));

    return getState().dataPayment;
};