import { getData } from './getData.js';
import { getElement } from '../utils/getElement.js';

export const setData = async (id) => {
    const { total, unpaid, totalPaid, client } = await getData(id);
    console.log("Datos obtenidos:", { total, unpaid, totalPaid, client });
};