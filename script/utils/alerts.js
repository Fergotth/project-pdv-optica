import alerts, { container } from './elements.js';

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        newAlert({
            icon: "inffo",
            text: "Texto de prueba de success",
            title: "Titulo de prueba de Success"
        });

            setTimeout(() => {
                document.body.querySelector('.overlay').remove();
            }, 40000);
    }
});

const assignContent = (doc, alertContainer, innerText) => {
    Array.from(doc.body.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Mapeo de clases a propiedades de innerText
            const classToTextMap = {
                textTitle: innerText.title,
                textMessage: innerText.text,
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
    if (typeof dataObject === "string") {
        return {
            title: title,
            text: "",
            timer: timer
        };
    }
    
    const newElement = {
        title: title,
        text: text,
        timer: timer,
        ...dataObject
    };
    
    return newElement;
};

const newAlert = (input) => {
    if (typeof input === "object" && input !== null) {
        const { icon, title, text, timer = 40000 } = input;
        const index = alerts.findIndex(item => item.icon === icon);
        const newObject = createObject(title, text, timer, alerts[index]);
        const newElement = document.body;
        newElement.insertAdjacentHTML('afterbegin', container); 

        const alertContainer = document.querySelector('.containerAlert');
        const parser = new DOMParser();

        const typeOfObject = () => {
            let doc;
            if (index !== -1) {        
                doc = parser.parseFromString(alerts[index].innerHTML, 'text/html');
            } else {
                doc = parser.parseFromString(alerts[4].innerHTML, 'text/html');
            }
            console.log(doc);
            return doc;
        }
        // falta corregir cuando no se manda bien la etiqueta icon
        assignContent(typeOfObject(), alertContainer, newObject);
    }
};