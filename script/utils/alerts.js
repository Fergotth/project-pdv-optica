
import { alerts, container } from './elements.js';

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        newAlert({
            icon: "success",
            text: "Texto de prueba de success",
            title: "Titulo de prueba de Success"
        });
    }
});

const assignContent = (doc, alertContainer, innerText) => {
    // Limpia el contenedor antes de insertar nuevos nodos
    alertContainer.innerHTML = '';
    Array.from(doc.body.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Mapeo de clases a propiedades de innerText
            const classToTextMap = {
                textTitle: innerText.title || innerText.text || "",
                textMessage: innerText.title ? innerText.text || "" : "",
            };

            // Verificar si el nodo tiene alguna de las clases y asignar el texto correspondiente
            Object.keys(classToTextMap).forEach((className) => {
                if (node.classList.contains(className)) {
                    node.innerText = classToTextMap[className];
                }
            });
        }
        alertContainer.appendChild(node);
    });
};

const createObject = (title, text, timer, dataObject) => {
    // dataObject siempre es un objeto de alerts
    return {
        title: title,
        text: text,
        timer: timer,
        ...dataObject
    };
};

const newAlert = (input) => {
    if (typeof input === "object" && input !== null) {
        const { icon, title, text, timer = 4100 } = input;
        const index = alerts.findIndex(item => item.icon === icon);
        const alertData = index !== -1 ? alerts[index] : alerts[4];
        const newObject = createObject(title, text, timer, alertData);

        // Elimina overlay existente si lo hay
        const existingOverlay = document.body.querySelector('.overlay');
        if (existingOverlay) existingOverlay.remove();

        document.body.insertAdjacentHTML('afterbegin', container);

        const alertContainer = document.querySelector('.containerAlert');
        const parser = new DOMParser();
        const doc = parser.parseFromString(alertData.innerHTML, 'text/html');

        assignContent(doc, alertContainer, newObject);

        setTimeout(() => {
            const overlay = document.body.querySelector('.overlay');
            if (overlay) overlay.remove();
        }, timer);
    }
};

export { newAlert };
