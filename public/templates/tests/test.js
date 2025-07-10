const slider = document.querySelector('.sliderCarousel');
const backButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const listHTML = document.querySelector('.sliderCarousel .list');

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
        
        listHTML.appendChild(items[0]);
        slider.classList.add('next');
    } else {
    listHTML.prepend(items[items.length - 1]);
    slider.classList.add('prev');
    }

    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
        backButton.style.pointerEvents = 'auto';
        nextButton.style.pointerEvents = 'auto';
    }, 2000);
};