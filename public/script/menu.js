const menu = () => {
    const menuDisplay = document.querySelector('.item--close');
    const container = document.querySelector('.container');
    const sales = document.querySelector('.item--sales');

    menuDisplay.addEventListener('click', () => {
        container.classList.toggle('showMenu');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            container.classList.toggle('showMenu');
        }
    });

    sales.addEventListener('click', () => {
        if (temporaryContent.innerHTML != '') {
            temporaryContent.innerHTML = null;
            return;
        }
        
        loadTemplate('template-sales.html');
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