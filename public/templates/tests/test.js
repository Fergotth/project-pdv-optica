const slider = document.querySelector('.sliderCarousel');
const backButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const listHTML = document.querySelector('.sliderCarousel .list');
const labelDate = document.querySelector('.header-right span:nth-child(2)');
const typeOfPayment = ['Dolar','Tarjeta','Transferencia','Cupon','Efectivo'];
let index = 0;

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() +1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

labelDate.textContent = getCurrentDate();

backButton.onclick = function() {
    showSlider('back');
}

nextButton.onclick = function() {
    showSlider('next');
}

let unAcceptClick;

const showSlider = (type) => {
    slider.classList.remove('next', 'prev');
    const items = document.querySelectorAll('.sliderCarousel .list .item');

    if (type === 'next') {
        index = index >= 4 ? 0 : ++index;
        listHTML.appendChild(items[0]);
        slider.classList.add('next');
    } else {
        index = index <= 0 ? 4 : --index;
        listHTML.prepend(items[items.length - 1]);
        slider.classList.add('prev');
    }

    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
        backButton.style.pointerEvents = 'auto';
        nextButton.style.pointerEvents = 'auto';
    }, 2000);
};