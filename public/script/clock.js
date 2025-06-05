const clock = () => {
    moment.locale('es');
    requestAnimationFrame(updateTime);

    function updateTime() {
        document.documentElement.style.setProperty('--timer-hours', "'" + moment().format("k") + "'");
        document.documentElement.style.setProperty('--timer-minutes', "'" + moment().format("mm") + "'");
        document.documentElement.style.setProperty('--timer-seconds', "'" + moment().format("ss") + "'");
        requestAnimationFrame(updateTime);
    }
}

export default clock;