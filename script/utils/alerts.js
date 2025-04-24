
import { alerts, container } from './elements.js';

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const index = parseInt(event.target.dataset.id);
        
        if (index === 0) {
            newAlert({
            icon: "success",
            text: "Texto de prueba de success",
            title: "Titulo de prueba de Success"
            });
        }
        if (index === 1) {
            newAlert({
                icon: "question",
                text: "Texto de prueba de Question",
                title: "Titulo de prueba de Question"
            });
        }
        if (index === 2) {
            newAlert({
                icon: "info",
                text: "Texto de prueba de info",
                title: "Titulo de prueba de Info"
            });
        }
        if (index === 3) {
            newAlert({
                icon: "error",
                text: "Texto de prueba de Error",
                title: "Titulo de prueba de Error"
            });
        }
        if (index === 4) {
            newAlert("Texto de prueba sin icono");
        }
        
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
    /**
     * @param {string|object} input - Puede ser un string o un objeto con propiedades icon, title, text y timer.
     */

    /**
     * @param {boolean} isObject - Verifica si el input es un objeto.
     */
    
    const isObject = typeof input === "object" && input !== null;
    const { icon, title, text, timer = 15000 } = isObject ? input : {};
    const alertData = isObject
        ? alerts.find(item => item.icon === icon) || alerts[4]
        : alerts[4];
    const newObject = createObject(
        isObject ? title : input,
        isObject ? text : "",
        timer,
        alertData
    );

    // Elimina overlay existente si lo hay
    const existingOverlay = document.body.querySelector('.overlayAlert');
    if (existingOverlay) existingOverlay.remove();

    // Inserta el contenedor de la alerta
    document.body.insertAdjacentHTML('afterbegin', container);

    // Asigna contenido al contenedor de la alerta
    const alertContainer = document.querySelector('.containerAlert');
    const parser = new DOMParser();
    const doc = parser.parseFromString(alertData.innerHTML, 'text/html');
    assignContent(doc, alertContainer, newObject);

    // Configura el temporizador para eliminar la alerta
    const timeoutId = setTimeout(() => {
        closeAlertWithAnimation();
    }, timer);

    // Configura el evento para cerrar la alerta al presionar el botón
    const closeButton = document.querySelector('.btnCloseAlert');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            clearTimeout(timeoutId); // Limpia el temporizador
            closeAlertWithAnimation();
        });
    }

    // Función para cerrar la alerta con animación
    const closeAlertWithAnimation = () => {
        const overlay = document.body.querySelector('.overlayAlert');
        const alertContainer = document.querySelector('.containerAlert'); // Selecciona el contenedor de la alerta
        if (overlay && alertContainer) {
            alertContainer.classList.add('fadeOut'); // Aplica la animación al contenedor de la alerta
            alertContainer.addEventListener('animationend', () => {
                overlay.remove(); // Elimina el overlay después de que termine la animación
            });
        }
    };
};

export { newAlert };
