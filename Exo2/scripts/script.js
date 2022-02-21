var items = [
    { name: "Mon Premier", selected: 0, location: "leftGroup" },
    { name: "Mon Deuxieme", selected: 0, location: "leftGroup" },
    { name: "Mon Troisième", selected: 0, location: "leftGroup" },
    { name: "Mon Quatrième", selected: 0, location: "leftGroup" }
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
                var selectedItems = [];
                if (element.classList.contains('active')) {
                    if (leftGroup.querySelectorAll('p').length == 0 || rightGroup.querySelectorAll('p').length == 0) {
                        if (element.innerText == item.name) {
                            item.selected == true;
                            if (item.location == "leftGroup") {
                                toLeftBtn.disabled = true;
                                toRightBtn.disabled = false;
                            } else {
                                if (item.location == "rightGroup") {
                                    toRightBtn.disabled = true;
                                    toLeftBtn.disabled = false;
                                }
                            }
                            console.log(item.name + ' selected');
                        }
                    } else {
                        toRightBtn.disabled = false;
                        toLeftBtn.disabled = false;
                    }
                } else {
                    if (element.innerText == item.name) {
                        item.selected == false;
                        if (item.location == "leftGroup") {
                            toLeftBtn.disabled = false;
                        } else {
                            if (item.location == "rightGroup") {
                                toRightBtn.disabled = true;
                            }
                        }
                        console.log(item.name + ' unselected');
                    }
                }
            });
        }
    });
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
                    if (item.location == "leftGroup") {
                        item.location = "rightGroup";
                    } else {
                        if (item.location = "rightGroup") {
                            item.location = "leftGroup";
                        }
                        console.log(item.location);
                    }
                    console.log(items);
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