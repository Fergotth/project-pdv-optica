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

export const getTicketsFile = async (type, ID) => {
    try {
        const response = await fetch(`/get-ticketPDF?type=${type}&id=${ID}`);
        
        if (!response.ok) {
            console.warn("Respuesta inesperada del servidor:", response.status);
            return null;
        }

        const data = await response.json();

        if (!data.url) {
            console.warn("No se encontró la URL del archivo en la respuesta.");
            return null;
        }

        return {
            url: data.url,
            message: data.message || 'Archivo encontrado.'
        };

    } catch (error) {
        console.error("Error al obtener los datos: ", error);
        return null;
    }
};