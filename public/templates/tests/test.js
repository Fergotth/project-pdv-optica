import { getDataClientDB } from "../../script/clients/getData.js";

const button = document.querySelector('.btnSearchClientForm');

button.onclick = async function() {
    debugger
    const data = await getDataClientDB(document.querySelector('.input').value);

    if (data.length > 0) {
        alert(data.length);
    }
};