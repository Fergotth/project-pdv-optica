/**
 * 
 * @param {String} url 
 * @returns {Promise<Object[]>} 
 */
export const getDataDB = async (url) => {
    try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        return [];
    }
};