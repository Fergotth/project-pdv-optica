import alerts from './elements.js';

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        let index = event.target.dataset.id;
        let newElement = document.body;
        newElement.insertAdjacentHTML('afterbegin', `
            <div class="overlay" style="height: 100vh; width: 100vw; background-color: #00000022; position: absolute;">    
                <div class="containerAlert"> 
                    <style>
                        .containerAlert {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 40vw;
                            border-radius: 15px;
                            background: #fff;
                            animation: ZoomIn 0.5s;
                        }

                        @keyframes ZoomIn {
                            0% {
                                transform: translate(-50%, -50%) scale(0);
                            }
                            70% {
                                transform: translate(-50%, -50%) scale(1.0);
                            } 
                            80% {
                                transform: translate(-50%, -50%) scale(0.9);
                            }
                            100% {
                                transform: translate(-50%, -50%) scale(1.0);
                            }
                        }
                    </style>
                </div>
            </div>
        `); 

        let container = document.querySelector('.containerAlert');
        let a = document.createElement('div');
        let styleTag = document.createElement('style');
        
        styleTag.innerHTML = alerts[index].style;
        a.innerHTML = alerts[index].iconHTML;
        a.appendChild(styleTag);
        container.appendChild(a);
        a = document.createElement('div');
        a.classList.add('textTitleStyle');
        a.innerText = alerts[index].title;
        container.appendChild(a);
        a = document.createElement('div');
        a.classList.add('textMessageStyle');
        a.innerText = alerts[index].text;
        container.appendChild(a);
        
        if (alerts[index].timer !== 0)
            setTimeout(() => {
                container = document.querySelector('.overlay');
                container.remove();
            }, alerts[index].timer);
    }
});