var d_days = document.getElementById('days');
var d_hours = document.getElementById('hours');
var d_minutes = document.getElementById('minutes');
var d_seconds = document.getElementById('seconds');

var currentTimestamp = new Date().getTime();
var nextTimestamp = Date.parse('01 January 2023 00:00:00');
var currentDate = new Date(currentTimestamp);
var nextDate = new Date(nextTimestamp);

console.log(currentTimestamp);

/* d_days.innerText = days;
d_hours.innerText = hours;
d_minutes.innerText = minutes;
d_seconds.innerText = seconds; */