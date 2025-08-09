export const getDataNoteUnpaid = async (value) => {
    try {
        const response = await fetch(`/find-sale?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la nota: ", error);
        return null;
    }
};