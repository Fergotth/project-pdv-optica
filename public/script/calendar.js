const renderCalendar = () => {
    const currentDate = new Date(); 
    const monthTitle = document.querySelector(".calendar__picture h3");
    const dayTitle = document.querySelector(".calendar__picture h2");
    const daysContainer = document.querySelector(".calendar__date");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();
    const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });

    monthTitle.textContent = currentDate.toLocaleString('default', { month: 'long' });
    dayTitle.textContent = `${today}, ${dayOfWeek}`;

    daysContainer.innerHTML = `
        <div class="calendar__day">D</div>
        <div class="calendar__day">L</div>
        <div class="calendar__day">M</div>
        <div class="calendar__day">M</div>
        <div class="calendar__day">J</div>
        <div class="calendar__day">V</div>
        <div class="calendar__day">S</div>
    `;

    // Primer día del mes (ajustado para que domingo sea 0)
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Días del mes anterior en gris
    const prevLastDay = new Date(year, month, 0).getDate();
    const emptyCells = (firstDay === 0) ? 0 : firstDay;
    
    for (let i = emptyCells - 1; i >= 0; i--) {
        const prevDay = document.createElement("div");
        prevDay.classList.add("calendar__number", "calendar__number--inactive");
        prevDay.textContent = prevLastDay - i;
        daysContainer.appendChild(prevDay);
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar__number");
        dayDiv.textContent = i;

        if (i === today) {
            dayDiv.classList.add("calendar__number--current");
        }

        daysContainer.appendChild(dayDiv);
    }

    // Días del siguiente mes en gris para completar la cuadrícula
    const totalCells = emptyCells + lastDay;
    const remainingDays = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);

    for (let i = 1; i <= remainingDays; i++) {
        const nextDay = document.createElement("div");
        nextDay.classList.add("calendar__number", "calendar__number--inactive");
        nextDay.textContent = i;
        daysContainer.appendChild(nextDay);
    }
};

export default renderCalendar;