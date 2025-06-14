const grid = document.querySelector('.container-operations');

grid.addEventListener('click', async (e) => {
    const path = e.composedPath();
    const item = path.find(el => el.classList?.contains('grid-item'));
    const closeIcon = path.find(el => el.classList?.contains('close-icon'));

    if (!item) return;

    if (closeIcon) {
        // Colapsar
        item.classList.add('collapsing');
        item.classList.remove('expanded');

        setTimeout(() => {
            item.classList.remove('collapsing');
        }, 300); // duración igual que el CSS
    } else {
        if (!item.classList.contains('expanded')) {
            item.classList.add('expanding');
            item.classList.add('expanded');

            setTimeout(() => {
                item.classList.remove('expanding');
            }, 300);
        }
    }
});