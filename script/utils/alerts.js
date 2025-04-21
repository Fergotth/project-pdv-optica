import alerts, { container } from './elements.js';

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        let index = parseInt(event.target.dataset.id);
        let newElement = document.body;
        let title;
        let text;
        newElement.insertAdjacentHTML('afterbegin', container); 

        const alertContainer = document.querySelector('.containerAlert');
        const parser = new DOMParser();
        const doc = parser.parseFromString(alerts[index].innerHTML + alerts[index].style, 'text/html');

        if (index === 0) {
            title = 'Success Title';
            text = 'Success Text';    
        } else if (index === 1) {
            title = 'question Title';
            text = 'question Text';
        } else if (index === 2) {
            title = 'info Title';
            text = 'info Text';
        } else if (index === 3) {
            title = 'error Title';
            text = 'error Text';
        }

        assignContent(doc, alertContainer, getContent(title, text, alerts[index]));

        if (alerts[index].timer !== 0)
            setTimeout(() => {
                document.body.querySelector('.overlay').remove();
            }, alerts[index].timer);
    }
});

const assignContent = (doc, alertContainer, innerText) => {
    Array.from(doc.body.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Mapeo de clases a propiedades de innerText
            const classToTextMap = {
                textTitleStyle: innerText.title,
                textMessageStyle: innerText.text,
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

const getContent = (title, text, dataObject) => {
    const newElement = {
        title: title,
        text: text,
        ...dataObject
    };
    return newElement;
};