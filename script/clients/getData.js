import { getElement} from "../utils/getElement.js";

/**
 * 
 * @returns {Object}    // Regresa el objeto con los datos obtenidos del formulario
 */
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

export const getDataClientDB = async (name) => {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('../data/clients.db');

    db.all('SELECT * FROM Clients WHERE LOWER(Name) LIKE LOWER(?)', [`%${name}%`],
    (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
        
        data.forEach((row) => {
            //row.nombre del campo del valor
        });

        db.close();
    }
    );
};