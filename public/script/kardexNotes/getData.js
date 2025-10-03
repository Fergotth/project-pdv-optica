export const getDataNoteDB = async (value) => {
    try {
        const response = await fetch(`/find-sale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};

export const getDataNotePaymentsDB = async (value) => {
    try {
        const response = await fetch(`/find-paymentsSale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};

export const getDataNoteArticlesDB = async (value) => {
    try {
        const response = await fetch(`/find-articlesSale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};

export const getTicketsFile = async (ID) => {
    try {
        const response = await fetch(`/get-ticketPDF?id=${ID}`);
        
        if (!response.ok) {
            console.warn("Respuesta inesperada del servidor:", response.status);
            return null;
        }

        const data = await response.json();

        if (!data.urls || data.urls.length === 0) {
            console.warn("No se encontraron URLs de tickets en la respuesta.");
            return null;
        }

        return data.urls;

    } catch (error) {
        console.error("Error al obtener los datos: ", error);
        return null;
    }
};