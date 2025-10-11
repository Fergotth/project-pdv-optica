/**
 * Devuelve si la categoria buscada existe
 * @param {Object} data 
 * @param {String} param 
 * @returns {Boolean || false}
 */
export const validateData = (data, param) => {
    if (!Array.isArray(data) || data.length === 0) return false;

    const categoryParams = ['frames', 'accessories', 'services'];
    const paramLower = param.toLowerCase();

    return data.some(element => {
        if (categoryParams.includes(paramLower)) {
            return element.Category?.toLowerCase() === paramLower;
        } else {
            return element.Description?.toLowerCase().includes(paramLower);
        }
    });
};
