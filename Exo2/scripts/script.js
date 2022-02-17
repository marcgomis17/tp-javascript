var items = [
    { name: "Mon Premier", selected: 0, location: "leftGroup" },
    { name: "Mon Deuxieme", selected: 0, location: "leftGroup" },
    { name: "Mon Troisième", selected: 0, location: "leftGroup" },
    { name: "Mon Quatrième", selected: 0, location: "leftGroup" }
];
var leftGroup = document.getElementById('items');
var rightGroup = document.getElementById('new-items');
var toRightBtn = document.getElementById('to-right');
var toLeftBtn = document.getElementById('toLeft');

function buildItems() {
    items.forEach(item => {
        var p = document.createElement('p');
        p.innerText = item.name;
        leftGroup.appendChild(p);

        p.onclick = () => {
            p.classList.toggle("selected");
            if (item.selected == false) {
                item.selected = true;
                toLeftBtn.toggleAttribute("disabled");
                if (toRightBtn.hasAttribute("disabled")) {
                    toRightBtn.toggleAttribute("disabled");
                }
            } else {
                item.selected = false;
                toLeftBtn.toggleAttribute("disabled");
            }
        }
    });
}

function removeNode(item, dest) {
    if (dest.id == "new-items") {
        leftGroup.querySelectorAll('p').forEach(node => {
            if (node.innerText == item.name) {
                leftGroup.removeChild(node);
            }
        });
    } else {
        rightGroup.querySelectorAll('p').forEach(node => {
            if (node.innerText == item.name) {
                rightGroup.removeChild(node);
            }
        });
    }
}

function moveItem(item, dest) {
    var p = document.createElement('p');
    p.innerText = item.name;
    item.selected = false;
    p.onclick = () => {
        p.classList.toggle("selected");
        if (item.selected == false) {
            item.selected = true;
            if (item.selected) {
                toRightBtn.toggleAttribute("disabled");
                if (toLeftBtn.hasAttribute("disabled")) {
                    toLeftBtn.toggleAttribute("disabled");
                }
            }
        } else {
            item.selected = false;
        }
    }
    dest.appendChild(p);
    removeNode(item, dest);
}

buildItems();

toRightBtn.onclick = () => {
    items.forEach(item => {
        if (item.selected == true) {
            moveItem(item, rightGroup);
            item.location = "rightGroup";
        }
    });
}

toLeftBtn.onclick = () => {
    items.forEach(item => {
        if (item.selected == true) {
            moveItem(item, leftGroup);
            item.location = "leftGroup";
        }
    });
}