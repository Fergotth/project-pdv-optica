import menu from "./menu3.js";
import renderCalendar from "./calendar.js";
import clock from "./clock.js";

const app = document.getElementById('app');
const temporaryContent = document.getElementById('temporaryContent');
const calendar = document.getElementById('calendar');
const clockTimer = document.getElementById('timer');

const loadMenu = () => {
    fetch('/templates/template-menu3.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            menu();
        })
        .catch(error => console.error("Error al cargar el menu: ", error));
}

loadMenu();

document.addEventListener('click', (event) => {
    const calendarIcon = event.target.closest('.calendarIcon'); // Detecta el SVG clicado

    if (calendarIcon) {
        const calendar = document.getElementById('calendar');
        calendar.classList.toggle('showCalendar'); // Alternar la clase para mostrar u ocultar el calendario
    }
});

const loadCalendar = () => {
    fetch('/templates/template-calendar.html')
    .then(response => response.text())
        .then(html => {
            calendar.innerHTML = html;
            renderCalendar();
        })
        .catch(error => console.error("Error al cargar el calendario: ", error));
}

loadCalendar();

const loadClock = () => {
    fetch('/templates/template-clock.html')
    .then(response => response.text())
        .then(html => {
            clockTimer.innerHTML = html;
            clock();
        })
        .catch(error => console.error("Error al cargar el reloj: ", error));
}

loadClock();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que la página se recargue
    }
});