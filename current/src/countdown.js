

var finalDate = new Date("Nov 2, 2024 08:00:00").getTime();

var x = setInterval((function() {
    let now = new Date().getTime();

    let distance = finalDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    seconds = String(seconds).padStart(2, '0');

    document.getElementById("countdown").innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
}), 1000);