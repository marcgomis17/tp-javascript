var menu = [
    { icon: ["fa-gauge-high"], name: "Dashboard", submenu: [] },
    { icon: ["fa-table-cells"], name: "Widgets", submenu: [] },
    { icon: ["fa-copy"], name: "Layout Options", submenu: [] },
    { icon: ["fa-chart-pie"], name: "Charts", submenu: ["ChartJS", "Flot", "Inline", "Unflot"] },
    { icon: ["fa-tree"], name: "UI Elements", submenu: [] },
    { icon: ["fa-pen-to-square"], name: "Forms", submenu: [] },
    { icon: ["fa-table"], name: "Tables", submenu: [] },
];
var menuToggler = document.getElementById('menu-btn');
var searchBar = document.querySelector('.search');

function buildSection(classList, name) {
    var sectionLink = document.createElement('a');
    var sectionName = document.createElement('li');
    var sectionIcon = document.createElement('i');
    var sectionNameText = document.createElement('span');

    sectionNameText.className = "menu-text";
    sectionNameText.innerText = name;
    sectionName.classList.add('minimized');
    sectionNameText.classList.add('hidden');

    sectionLink.href = "#";
    for (let i = 0; i < classList.length; i++) {
        sectionIcon.classList.add(classList[i]);
    }
    sectionName.append(sectionIcon, sectionNameText);
    sectionLink.appendChild(sectionName);
    return sectionLink;
}

function buildMenu(menu) {
    var sideMenu = document.querySelector('.side-menu');
    var ul = document.createElement('ul');
    ul.id = "menu-list";
    menu.forEach(section => {
        section.icon.unshift("fa-solid", "fa-xl");
        var menuSection = buildSection(section.icon, section.name);
        if (section.submenu.length != 0) {
            var subSection = document.createElement('ul');
            subSection.classList.add('submenu');
            var submenuClasses = ['fa-regular', 'fa-circle'];
            section.submenu.forEach(submenu => {
                subSection.append(buildSection(submenuClasses, submenu));
            });
            menuSection.append(subSection);
        }
        ul.appendChild(menuSection);
    });
    sideMenu.append(ul);
}

buildMenu(menu);

menuToggler.onclick = () => {
    var sideMenu = document.querySelector('.side-menu');
    var submenu = document.querySelector('.submenu');
    var spans = sideMenu.querySelectorAll('span');
    var lis = sideMenu.querySelectorAll('li');
    var icons = sideMenu.querySelectorAll('i');
    sideMenu.classList.toggle('show');
    spans.forEach(span => {
        if (sideMenu.classList.contains('show')) {
            submenu.classList.add('hidden');
            span.classList.remove('hidden');
        } else {
            submenu.classList.remove('hidden');
            span.classList.add('hidden');
        }
    });
    lis.forEach(li => {
        if (sideMenu.classList.contains('show')) {
            li.classList.remove('minimized');
        } else {
            li.classList.add('minimized');
        }
    });
    icons.forEach(icon => {
        icon.classList.remove()
    });
}

/* var iconSpan = document.createElement('span');
            var icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-chevron-right');
            iconSpan.append(icon);
            section.append(iconSpan); */