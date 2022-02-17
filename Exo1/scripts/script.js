var addBtn = document.getElementById('addBtn');
var notes = document.getElementById('notes');

function buildSheet() {
    var sheet = document.createElement('div');
    var actionBar = document.createElement('div');
    var btn = document.createElement('div');
    var editBtn = document.createElement('input');
    var deleteBtn = document.createElement('input');
    var textArea = document.createElement('textarea');
    textArea.disabled = true;

    sheet.className = "sheet";
    actionBar.className = "action-bar";
    btn.className = "btn";
    editBtn.className = "action-btn";
    editBtn.setAttribute('type', 'image');
    editBtn.setAttribute('src', './icons/edit.svg');
    editBtn.addEventListener('click', () => {
        textArea.toggleAttribute("disabled");
    })

    deleteBtn.className = "action-btn";
    deleteBtn.setAttribute('type', 'image');
    deleteBtn.setAttribute('src', './icons/trash.svg');
    deleteBtn.addEventListener('click', () => {
        var sheet = deleteBtn.parentElement.parentElement.parentElement;
        sheet.parentElement.removeChild(sheet);
    })

    textArea.setAttribute('rows', '10');
    textArea.setAttribute('cols', '30');
    textArea.className = "edit";


    btn.append(deleteBtn, editBtn);

    actionBar.appendChild(btn);
    sheet.append(actionBar, textArea);
    return sheet;
}

function addNote() {
    var sheet = buildSheet();
    notes.append(sheet);
}

addBtn.addEventListener('click', addNote);
