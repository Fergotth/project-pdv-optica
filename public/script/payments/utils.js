import { getElement } from '../utils/getElement.js';
export const renderData = (total, unpaid, totalPaid, client, idClient, status, id) => {
    getElement('.second__title div:nth-child(1) > span').textContent = id;
    getElement('.second__title div:nth-child(2) > span').textContent = client;
    getElement('.second__title div:nth-child(2) > span').dataset.id = idClient;
    getElement('.summary__total + div').textContent = `$${total.toFixed(2)}`;
    getElement('.summary__totalPaid + div').textContent = `$${totalPaid.toFixed(2)}`;
    getElement('.summary__totalUnpaid + div').textContent = `$${unpaid.toFixed(2)}`;
    getElement('.billPayment__input').value = '';
    
    const statusNote = getElement('.summary__status > span');
    const btnApplyPaidment = getElement('.third__applyNewPayment');
    
    if (!!unpaid) {
        statusNote.style.color = status === "Cancelada" ? 'red' : 'green';
        statusNote.textContent = status;
        btnApplyPaidment.classList.remove('unabled__button');
    }
    else {
        statusNote.style.color = 'black';
        statusNote.textContent = "Pagada";
        btnApplyPaidment.classList.add('unabled__button');
    }
};