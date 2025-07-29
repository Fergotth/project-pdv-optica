import menu from "./menu4.js";
import renderCalendar from "./calendar.js";

const app = document.getElementById('app');
const temporaryContent = document.getElementById('temporaryContent');
const calendar = document.getElementById('calendar');

const loadMenu = () => {
    fetch('/templates/template-menu5.html')
    .then(response => response.text())
    .then(html => {
        app.innerHTML = html;
        menu();
    })
    .catch(error => console.error("Error al cargar el menu: ", error));
}

loadMenu();

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