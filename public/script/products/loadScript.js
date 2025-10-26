const productSctipt = () => {
    const priceWithoutIVA = document.querySelector('.priceWithoutIVA--input');
    const priceWithIVA = document.querySelector('.priceWithIVA--input');
    const fileInput = document.querySelector('.image--input');
    const preview = document.querySelector('.image--container');
    const zoom = document.querySelector('.image--zoom');
    const utility = document.querySelector('.utility--input');
    const priceToSale = document.querySelector('.priceSale--input');
    const IVA = document.querySelector('.IVA--input');
    const section = document.querySelector('.ra--section3');
    let imgSrc = undefined;

    // Seleccionar y previsualizar imagen
    const selectImage = function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgSrc = e.target.result;
                preview.innerHTML = `<img src="${e.target.result}" alt="Imagen cargada">`;
                preview.style.border = 'none';
            };
            reader.readAsDataURL(file);
        }
    };

    // Mostrar el cuadro de zoom al pasar el mouse
    const mouseEnterZoom = function() {
        if (!imgSrc) return;
        const floatBox = document.createElement('div');
        floatBox.classList.add('image--preview');
        floatBox.innerHTML = `<img src="${imgSrc}">`;
        section.appendChild(floatBox);
    };

    // Eliminar el cuadro de zoom al salir
    const mouseLeaveZoom = function() {
        const floatBox = section.querySelector('.image--preview');
        if (floatBox) floatBox.remove();
    };

    // Calculo del precio sin IVA
    const keydownPriceWithoutIVA = function(event) {
        const iva = Number(IVA.value);
        const price = event.target.value * (1 + (iva > 0 ? iva / 100 : 0));
        priceWithIVA.value = price.toFixed(2);
    };

    // Calculo del precio con IVA
    const keydownPriceWithIVA = function(event) {
        const iva = Number(IVA.value);
        const price = event.target.value / (1 + (iva > 0 ? iva / 100 : 0));
        priceWithoutIVA.value = price.toFixed(2);
    };

    // Calculo de la utilidad
    const keydownUtility = function(event) {
        const value = Number(priceWithIVA.value) * (1 + event.target.value / 100);
        priceToSale.value = utility.value !== "" ? value.toFixed(2) : "";
    };

    // Calculo del precio de venta
    const keydownPriceToSale = function(event) {
        const value = (event.target.value - priceWithIVA.value) / priceWithIVA.value * 100;
        utility.value = priceToSale.value !== "" && priceWithIVA.value !== "" && Number(priceWithIVA.value) !== 0 ? value.toFixed(2) : "";
    };

    // Calculo del IVA
    const keydownIVA = function(event) {
        if (priceWithoutIVA.value !== "") {
            const iva = event.target.value;
            const price = priceWithoutIVA.value * (1 + iva / 100);
            priceWithIVA.value = price.toFixed(2);
        }
    };

    // Mapeo de todos los eventos en un array
    const eventBindings = [
        { element: fileInput, type: 'change', handler: selectImage },
        { element: zoom, type: 'mouseenter', handler: mouseEnterZoom },
        { element: zoom, type: 'mouseleave', handler: mouseLeaveZoom },
        { element: priceWithoutIVA, type: 'input', handler: keydownPriceWithoutIVA },
        { element: priceWithIVA, type: 'input', handler: keydownPriceWithIVA },
        { element: utility, type: 'input', handler: keydownUtility },
        { element: priceToSale, type: 'input', handler: keydownPriceToSale },
        { element: IVA, type: 'input', handler: keydownIVA },
    ];

    // funcion para agregar los listeners
    const addListeners = () => {
        eventBindings.forEach(({ element, type, handler }) => 
            element.addEventListener(type, handler)
        );
    };

    // se inicializan los listeners
    addListeners();

    // funcion para eliminar los listeners
    const removeListeners = () => {
        eventBindings.forEach(({ element, type, handler }) => 
            element.removeEventListener(type, handler)
        );
    };
    
    // se retorna la funcion para eliminar los listeners
    return {
        removeListeners
    };
};

export default productSctipt;