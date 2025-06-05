const menu = () => {
    document.addEventListener('click', function(event) {
        const elementClicked = event.target;
        const itemMenu = Array.from(elementClicked.classList).find(item => item.includes('item'));

        if (itemMenu) {
            if (temporaryContent.innerHTML != '') {
                temporaryContent.innerHTML = null;
                return;
            }
        
            const idItem = itemMenu.match(/item(\d)/);
            if (idItem[1] == 1) {
                loadTemplate('template-sales.html');
            } else if (idItem[1] == 2) {

            } else if (idItem[1] == 3) {

            } else if (idItem[1] == 4) {

            } else if (idItem[1] == 5) {

            } else if (idItem[1] == 6) {

            } else if (idItem[1] == 7) {
                loadTemplate('template-clients.html');
            }
        }
    });

    const loadTemplate = (templateName) => {
        fetch(`/templates/${templateName}`)
            .then(response => response.text())
            .then(html => {
                temporaryContent.innerHTML = html; 
            })
            .catch(error => console.error('Error al cargar el archivo: ', error));
    }
}

export default menu;