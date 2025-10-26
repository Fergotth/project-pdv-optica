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

    fileInput.addEventListener('change', () => {
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
    });

    // Al pasar el mouse sobre el botón de zoom
    zoom.addEventListener('mouseenter', () => {
        if (!imgSrc) return;
        const floatBox = document.createElement('div');
        floatBox.classList.add('image--preview');
        floatBox.innerHTML = `<img src="${imgSrc}">`;
        section.appendChild(floatBox);
    });

    // Al salir del botón de zoom
    zoom.addEventListener('mouseleave', () => {
        const floatBox = section.querySelector('.image--preview');
        if (floatBox) floatBox.remove();
    });

    const keydownPriceWithoutIVA = function(event) {
        const iva = Number(IVA.value);
        const price = event.target.value * (1 + (iva > 0 ? iva / 100 : 0));
        priceWithIVA.value = price.toFixed(2);
    };

    const keydownPriceWithIVA = function(event) {
        const iva = Number(IVA.value);
        const price = event.target.value / (1 + (iva > 0 ? iva / 100 : 0));
        priceWithoutIVA.value = price.toFixed(2);
    };

    const keydownUtility = function(event) {
    const value = Number(priceWithIVA.value) * (1 + event.target.value / 100);
    priceToSale.value = utility.value !== "" ? value.toFixed(2) : "";
    };

    const keydownPriceToSale = function(event) {
        const value = (event.target.value - priceWithIVA.value) / priceWithIVA.value * 100;
        utility.value = priceToSale.value !== "" && priceWithIVA.value !== "" && Number(priceWithIVA.value) !== 0 ? value.toFixed(2) + "%" : "";
    };

    priceWithoutIVA.addEventListener('input', keydownPriceWithoutIVA);
    priceWithIVA.addEventListener('input', keydownPriceWithIVA);
    utility.addEventListener('input', keydownUtility);
    priceToSale.addEventListener('input', keydownPriceToSale);

    IVA.addEventListener('change', () => {
        if (priceWithoutIVA.value !== "") {
            const iva = Number(IVA.value);
            const price = priceWithoutIVA.value * (1 + iva / 100);
            priceWithIVA.value = price.toFixed(2);
        } 
    });
};

export default productSctipt;