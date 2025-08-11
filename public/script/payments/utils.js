import { getElement } from '../utils/getElement.js';
export const renderData = (total, unpaid, totalPaid, client, id) => {
    getElement('.second__title div:nth-child(1) > span').textContent = id;
    getElement('.second__title div:nth-child(2) > span').textContent = client;
    getElement('.summary__total + div').textContent = `$${total.toFixed(2)}`;
    getElement('.summary__totalPaid + div').textContent = `$${totalPaid.toFixed(2)}`;
    getElement('.summary__totalUnpaid + div').textContent = `$${unpaid.toFixed(2)}`;
}