import { getElement} from "../utils/getElement.js";

export const getDataClient = () => {
    const data = {
        name: getElement('name').value,
        email: getElement('email').value,
        phone: getElement('phone').value,
        birthdate: getElement('date').value,
        comments: getElement('comments').value
    };

    return data;
};