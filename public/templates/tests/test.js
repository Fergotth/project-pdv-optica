const grid = document.querySelector('.container-operations');

grid.addEventListener('click', async (e) => {
    const path = e.composedPath();
    const item = path.find(el => el.classList?.contains('grid-item'));
    const closeIcon = path.find(el => el.classList?.contains('close-icon'));

    if (!item) return;

    if (closeIcon) {
        // Cerrar/colapsar el item
        item.classList.add('active');

        // Simular animación con clases y timeout
        item.classList.add('collapsing');
        item.classList.remove('expanded');

        setTimeout(() => {
            item.classList.remove('collapsing');
            item.classList.remove('active');
        }, 300); // duración de la animación
    } else {
        // Expandir si no está expandido
        if (!item.classList.contains('expanded')) {
            item.classList.add('active');

            item.classList.add('expanding');
            item.classList.add('expanded');

            setTimeout(() => {
                item.classList.remove('expanding');
                item.classList.remove('active');
            }, 300); // duración de la animación
        }
    }
});
