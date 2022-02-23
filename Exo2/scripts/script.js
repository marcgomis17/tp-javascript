var items = [
    { name: "Mon Premier", selected: 0, location: 0 },
    { name: "Mon Deuxieme", selected: 0, location: 0 },
    { name: "Mon Troisième", selected: 0, location: 0 },
    { name: "Mon Quatrième", selected: 0, location: 0 }
];
var leftGroup = document.getElementById('left-group');
var rightGroup = document.getElementById('right-group');
var toRightBtn = document.getElementById('to-right');
var toLeftBtn = document.getElementById('to-left');
toLeftBtn.disabled = true;

function buildList() {
    items.forEach(item => {
        var p = document.createElement('p');
        p.innerText = item.name;
        leftGroup.appendChild(p);
    });
}

function setEvents() {
    elements = document.querySelectorAll('p');
    elements.forEach(element => {
        element.onmouseover = () => {
            element.classList.add('mouseover');
        }
        element.onmouseout = () => {
            element.classList.remove('mouseover');
        }
        element.onclick = () => {
            element.classList.toggle('active');
            items.forEach(item => {
                if (element.classList.contains('active')) {
                    if (leftGroup.childElementCount == 0 || rightGroup.childElementCount == 0) {
                        if (element.innerText == item.name) {
                            if (item.location == 0) {
                                toLeftBtn.disabled = true;
                                toRightBtn.disabled = false;
                            } else {
                                toLeftBtn.disabled = false;
                                toRightBtn.disabled = true;
                            }
                        }
                    } else {
                        toRightBtn.disabled = false;
                        toLeftBtn.disabled = false;
                    }
                }
            });
        }
    })
}

function moveItems(grpFrom, grpTo) {
    var elements = grpFrom.querySelectorAll('p');
    elements.forEach(element => {
        if (element.classList.contains('active')) {
            items.forEach(item => {
                if (item.name == element.innerText) {
                    var p = document.createElement('p');
                    p.innerText = item.name;
                    grpTo.append(p);
                    grpFrom.removeChild(element);
                    setEvents();
                    item.location = !item.location;
                }
            });
        }
    });
}

buildList();
setEvents();
toRightBtn.onclick = () => {
    moveItems(leftGroup, rightGroup);
}

toLeftBtn.onclick = () => {
    moveItems(rightGroup, leftGroup);
}