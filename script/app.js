import menu from "./menu3.js";
import renderCalendar from "./calendar.js";

const app = document.getElementById('app');
const temporaryContent = document.getElementById('temporaryContent');
const calendar = document.getElementById('calendar');

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

// document.addEventListener('click', (event) => {
//     event.stopPropagation(); // Evita que el evento se propague a otros elementos
//     const calendarIcon = event.target.closest('.calendarIcon'); // Detecta el SVG clicado

//     if (calendarIcon) {
//         const calendar = document.getElementById('calendar');
//         calendar.classList.toggle('showCalendar'); // Alternar la clase para mostrar u ocultar el calendario
//     }
// });

const loadCalendar = () => {
    fetch('/templates/template-calendar.html')
    .then(response => response.text())
    .then(html => {
        calendar.innerHTML = html;
        renderCalendar();
    })
    .catch(error => console.error("Error al cargar el calendario: ", error));
};

loadCalendar();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que la página se recargue
    }
});