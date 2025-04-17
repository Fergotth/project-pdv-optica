import sales from "./sales.js";

const menu = () => {
    document.addEventListener('click', function(event) {
        const elementClicked = event.target;
        const itemMenu = Array.from(elementClicked.classList).find(item => item.includes('menu--item'));
        
        if (itemMenu) {
            const idItem = itemMenu.match(/item(\d)/);

            document.querySelectorAll('[class^="menu--item"]').forEach(item => { 
                item.style.backgroundColor = "";
            });

            if (idItem[1] == 1) {
                elementClicked.style.backgroundColor = '#509ec7';
                elementClicked.style.borderRadius = '25px 0 0 25px';
                loadTemplate('template-sales.html');
                
            } else if (idItem[1] == 2) {
                elementClicked.style.backgroundColor = '#509ec7';
            } else if (idItem[1] == 3) {
                elementClicked.style.backgroundColor = '#509ec7';
            } else if (idItem[1] == 4) {
                elementClicked.style.backgroundColor = '#509ec7';
            } else if (idItem[1] == 5) {
                elementClicked.style.backgroundColor = '#509ec7';
            } else if (idItem[1] == 6) {
                elementClicked.style.backgroundColor = '#509ec7';
            } else if (idItem[1] == 7) {
                elementClicked.style.backgroundColor = '#509ec7';
            } else if (idItem[1] == 8) {
                elementClicked.style.backgroundColor = '#509ec7';
                elementClicked.style.borderRadius = '0 25px 25px 0';
            }
        }
    });

    const loadTemplate = (templateName) => {
        fetch(`/templates/${templateName}`)
            .then(response => response.text())
            .then(html => {
                temporaryContent.innerHTML = html;
                sales();
            })
            .catch(error => console.error('Error al cargar el archivo: ', error));
    }
}

export default menu;