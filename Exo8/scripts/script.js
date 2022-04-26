var d_days = document.getElementById('days');
var d_hours = document.getElementById('hours');
var d_minutes = document.getElementById('minutes');
var d_seconds = document.getElementById('seconds');

setInterval(() => {
    var nextYear = moment().year() + 1;
    var finalDate = moment(nextYear.toString() + '-01-01', 'YYYY MM DD');
    var nextDay = moment().add(1, 'd').set({ 'hour': 0, 'minute': 0, 'second': 0 });
    var nextHour = moment().add(1, 'h').set({ 'minute': 0, 'second': 0 });
    var nextMin = moment().add(1, 'm').set('second', 0);

    var days = finalDate.diff(moment(), 'days');
    var hours = nextDay.diff(moment(), 'hours');
    var minutes = nextHour.diff(moment(), 'minutes');
    var seconds = nextMin.diff(moment(), 'seconds');

    d_days.innerText = days;
    d_hours.innerText = hours;
    d_minutes.innerText = minutes;
    d_seconds.innerText = seconds;
    if (seconds == 60) {
        d_seconds.innerText = "00";
    }
    if (minutes == 60) {
        d_minutes.innerText = "00";
    }
    if (days.toString().length == 1) {
        d_days.innerText = '0' + days;
    }
    if (hours.toString().length == 1) {
        d_hours.innerText = '0' + hours;
    }
    if (minutes.toString().length == 1) {
        d_minutes.innerText = '0' + minutes;
    }
    if (seconds.toString().length == 1) {
        d_seconds.innerText = '0' + seconds;
    }
}, 1000);