import { getData } from './getData.js';
import { renderData } from './utils.js';

/**
 * 
 * @param {Integer} id  // ID de la nota 
 */
export const setData = async (id) => {
    const { total, unpaid, totalPaid, client, idClient, status } = await getData(id);

    renderData(total, unpaid, totalPaid, client, idClient, status, id);
};