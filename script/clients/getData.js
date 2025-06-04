import { getElement} from "../utils/getElement.js";

export const getDataClientForm = () => {
    const data = {
        Name: getElement('name').value,
        Email: getElement('email').value,
        Phone: getElement('phone').value,
        Birthdate: getElement('date').value,
        Comments: getElement('comments').value
    };

    return data;
};