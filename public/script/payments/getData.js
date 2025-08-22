import { newAlert } from '../utils/alerts.js';

export const getData = async (value) => {
    try {
        const response = await fetch(`/find-unpaidSale?q=${encodeURIComponent(value)}`);
        
        if (!response.ok) {
            newAlert(`Error HTTP: ${response.status}`, "error");
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

export const getPaymentsData = (elements) => {
    const newData = Array.from(elements).map(item => ({
        PaymentMethod: item.querySelector('.typeOfPaymentValue').textContent,
        Paid: Number(item.querySelector('.paidValue').textContent)
    }));

    return newData;
};