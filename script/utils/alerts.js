import alerts, { container } from './elements.js';

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        let index = event.target.dataset.id;
        let newElement = document.body;
        newElement.insertAdjacentHTML('afterbegin', container); 

        let containerAlert = document.querySelector('.containerAlert');
        let a = document.createElement('div');
        let styleTag = document.createElement('style');
        
        styleTag.innerHTML = alerts[index].style;
        a.innerHTML = alerts[index].iconHTML;
        a.appendChild(styleTag);
        containerAlert.appendChild(a);
        a = document.createElement('div');
        a.classList.add('textTitleStyle');
        a.innerText = alerts[index].title;
        containerAlert.appendChild(a);
        a = document.createElement('div');
        a.classList.add('textMessageStyle');
        a.innerText = alerts[index].text;
        containerAlert.appendChild(a);
        
        if (alerts[index].timer !== 0)
            setTimeout(() => {
                containerAlert = document.querySelector('.overlay');
                containerAlert.remove();
            }, alerts[index].timer);
    }
});