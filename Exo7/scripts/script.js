var images =
    [
        './images/img1.jpg',
        './images/img2.jpg',
        './images/img3.jpg',
        './images/img4.jpg',
        './images/img5.jpg',
        './images/img6.jpg',
        './images/img7.jpg',
        './images/img8.jpg',
        './images/img9.jpg',
        './images/img10.jpg'
    ];
var slides = document.querySelectorAll('.slide');
var indicators = document.querySelectorAll('.carousel-indicators button');
var buttons = document.querySelectorAll('.btn');
var img = document.getElementById('image');
var index = 0;
setBackground(0);

function setBackground(i) {
    var url = images[i];
    var background = document.getElementById('background-container');
    // document.body.style.backgroundImage = "url('" + url + "')";
    background.style.backgroundImage = "url('" + url + "')";
}

function next() {
    index++;
    if (index == images.length) {
        index = 0;
    }
}

function prev() {
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
}

function slide() {
    img.setAttribute('src', images[index]);
    setBackground(index);
    index++;
    if (index == images.length) {
        index = 0;
    }
}

buttons.forEach(btn => {
    btn.onclick = () => {
        if (btn.getAttribute('data-slide') == "prev") {
            prev();
        }
        if (btn.getAttribute('data-slide') == "next") {
            next();
        }
        img.setAttribute('src', images[index]);
        setBackground(index);
    }
});

setInterval(slide, 5000);