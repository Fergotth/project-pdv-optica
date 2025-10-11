import { getData } from './getData.js';
import { renderData } from './utils.js';
import { newAlert } from '../utils/alerts.js';

/**
 * 
 * @param {Integer} id  // ID de la nota 
 */
export const setData = async (id) => {
    const data = await getData(id);

    if (data) {
        const { total, unpaid, totalPaid, client, idClient, status } = data;
        renderData(total, unpaid, totalPaid, client, idClient, status, id);
    } else {
        newAlert({
            icon: "info",
            title: "Búsqueda fallida",
            text: `No existe esa nota de venta con Folio No. <span style="color: #000;">${id}</span>. Por favor, intente nuevamente.`,
        });
    }
};
