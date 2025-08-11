import { getData } from './getData.js';
import { renderData } from './utils.js';

export const setData = async (id) => {
    const { total, unpaid, totalPaid, client, date } = await getData(id);

    renderData(total, unpaid, totalPaid, client, id);
};