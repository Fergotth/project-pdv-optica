const productSctipt = () => {
    const priceWithoutIVA = document.querySelector('.priceWithoutIVA--input');
    const priceWithIVA = document.querySelector('.priceWithIVA--input');
    const utility = document.querySelector('.utility--input');
    const priceToSale = document.querySelector('.priceSale--input');
    const IVA = document.querySelector('.IVA--input');
    const fileInput = document.querySelector('.image--input');
    const preview = document.querySelector('.image--container');
    const zoom = document.querySelector('.image--zoom');
    const radioInput = document.querySelector('.kindOfArticle--input');
    const selectInput = document.querySelector('.input--description-category');
    const section = document.querySelector('.ra--section3');

    let imgSrc;

    selectInput.disabled = true;

    /* ======================================
       FUNCIÓN CENTRAL REACTIVA DE CÁLCULO
       ====================================== */
    const recalculate = (source) => {
        const iva = parseFloat(IVA.value) || 0;
        let base = parseFloat(priceWithoutIVA.value) || 0;
        let total = parseFloat(priceWithIVA.value) || 0;
        let util = parseFloat(utility.value) || 0;
        let sale = parseFloat(priceToSale.value) || 0;
    
        // función auxiliar para recalcular utilidad
        const updateUtility = () => {
            if (sale > 0 && total > 0) {
                const newUtil = ((sale - total) / total) * 100;
                utility.value = newUtil.toFixed(2);
            }
        };
    
        // función auxiliar para recalcular precio de venta
        const updatePriceToSale = () => {
            if (utility.value !== "" && total > 0) {
                const newSale = total * (1 + util / 100);
                priceToSale.value = newSale.toFixed(2);
            }
        };
    
        switch (source) {
            case "priceWithoutIVA":
                total = base * (1 + iva / 100);
                priceWithIVA.value = total.toFixed(2);
                updatePriceToSale();
                updateUtility();
                break;
    
            case "priceWithIVA":
                base = total / (1 + iva / 100);
                priceWithoutIVA.value = base.toFixed(2);
                updatePriceToSale();
                updateUtility();
                break;
    
            case "utility":
                updatePriceToSale();
                updateUtility(); // recalcula si hay inconsistencia
                break;
    
            case "priceToSale":
                updateUtility();
                break;
    
            case "IVA":
                if (priceWithoutIVA.value !== "") {
                    total = base * (1 + iva / 100);
                    priceWithIVA.value = total.toFixed(2);
                } else if (priceWithIVA.value !== "") {
                    base = total / (1 + iva / 100);
                    priceWithoutIVA.value = base.toFixed(2);
                }
                updatePriceToSale();
                updateUtility();
                break;
        }
    };
    
    /* ==============================
       IMAGEN Y ZOOM
       ============================== */
    const selectImage = () => {
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

    const mouseEnterZoom = () => {
        if (!imgSrc) return;
        const floatBox = document.createElement('div');
        floatBox.classList.add('image--preview');
        floatBox.innerHTML = `<img src="${imgSrc}">`;
        section.appendChild(floatBox);
    };

    const mouseLeaveZoom = () => {
        const floatBox = section.querySelector('.image--preview');
        if (floatBox) floatBox.remove();
    };

    /* ==============================
       RADIO INPUTS
       ============================== */
    const selectRadioInput = (event) => {
        if (event.target.type === 'radio') {
            const radioValue = event.target.closest('label').querySelector('.radiobutton--text').textContent;
            const selectOption = document.querySelector('.category--option');
            
            if (event.target.value !== "glasses") {
                selectInput.selectedIndex = 0;
                selectOption.value = radioValue;
                selectOption.textContent = radioValue;
                selectInput.disabled = true;
            } else {
                selectOption.value = "Monofocal";
                selectOption.textContent = "Monofocal";
                selectInput.disabled = false;
            }
        }
    };

    /* ==============================
       EVENTOS REACTIVOS
       ============================== */
    const eventBindings = [
        { element: fileInput, type: 'change', handler: selectImage },
        { element: zoom, type: 'mouseenter', handler: mouseEnterZoom },
        { element: zoom, type: 'mouseleave', handler: mouseLeaveZoom },
        { element: priceWithoutIVA, type: 'input', handler: () => recalculate("priceWithoutIVA") },
        { element: priceWithIVA, type: 'input', handler: () => recalculate("priceWithIVA") },
        { element: utility, type: 'input', handler: () => recalculate("utility") },
        { element: priceToSale, type: 'input', handler: () => recalculate("priceToSale") },
        { element: IVA, type: 'input', handler: () => recalculate("IVA") },
        { element: radioInput, type: 'change', handler: selectRadioInput }
    ];

    const addListeners = () => {
        eventBindings.forEach(({ element, type, handler }) =>
            element.addEventListener(type, handler)
        );
    };

    const removeListeners = () => {
        eventBindings.forEach(({ element, type, handler }) =>
            element.removeEventListener(type, handler)
        );
    };

    addListeners();

    return { removeListeners };
};

export default productSctipt;