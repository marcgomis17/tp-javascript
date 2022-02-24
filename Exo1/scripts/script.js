var addBtn = document.getElementById('addBtn');
var notes = document.getElementById('notes');

function setNoteTitle() {

}

function buildSheet() {
    var sheet = document.createElement('div');
    var actionBar = document.createElement('div');
    var blankSpace = document.createElement('div');
    var btn = document.createElement('div');
    var editBtn = document.createElement('input');
    var deleteBtn = document.createElement('input');
    var textArea = document.createElement('textarea');
    textArea.disabled = true;

    sheet.className = "sheet";
    blankSpace.className = "blank";
    actionBar.className = "action-bar";
    btn.className = "btn";
    editBtn.className = "action-btn";
    editBtn.setAttribute('type', 'image');
    editBtn.setAttribute('src', './icons/edit.svg');
    editBtn.addEventListener('click', () => {
        textArea.toggleAttribute("disabled");
        if (!textArea.disabled) {
            blankSpace.style.visibility = "hidden";
        } else {
            blankSpace.style.visibility = "visible";
        }
    })

    deleteBtn.className = "action-btn";
    deleteBtn.setAttribute('type', 'image');
    deleteBtn.setAttribute('src', './icons/trash.svg');
    deleteBtn.addEventListener('click', () => {
        var sheet = deleteBtn.parentElement.parentElement.parentElement;
        sheet.parentElement.removeChild(sheet);
    })

    textArea.setAttribute('rows', '20');
    textArea.setAttribute('cols', '30');
    textArea.className = "edit";


    btn.append(deleteBtn, editBtn);
    blankSpace.addEventListener('click', () => {
        if (textArea.style.display == "block") {
            textArea.style.display = "none";
            sheet.style.border = "none";
            editBtn.disabled = true;
        } else {
            textArea.style.display = "block";
            sheet.style.border = "1px solid rgb(25, 199, 25)";
            editBtn.disabled = false;
        }
    });
    actionBar.append(blankSpace, btn);
    sheet.append(actionBar, textArea);
    return sheet;
}

function addNote() {
    notes.append(buildSheet());
}

addBtn.addEventListener('click', addNote);
