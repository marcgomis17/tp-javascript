var pwdLengthField = document.getElementById('length-field');
var form = document.getElementById('form');
var errorDisplay = document.getElementById('error');
var btn = document.querySelector('#btn');
var copyBtn = document.getElementById('copy-btn');
copyBtn.disabled = true;
var pwdDisplay = document.getElementById('password-display')
// btn.disabled = true;
btn.onclick = () => {
    console.log('clicked');
}
btn.onmouseover = () => {
    if (btn.disabled) {
        btn.style.cursor = "default";
    } else {
        btn.style.cursor = "pointer";
    }
}

function checkForm() {
    checkbox = document.querySelectorAll('input');
    var checkedValues = 0
    if (pwdLengthField.value == "") {
        return "Password length empty!";
    } else {
        if (isNaN(parseInt(pwdLengthField.value))) {
            return "Not a number";
        } else {
            pwdLengthField.value = parseInt(pwdLengthField.value);
            if (pwdLengthField.value < 5 || pwdLengthField.value > 20) {
                return "La longueur doit être compris entre 5 et 20";
            }
        }
    }
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].type == 'checkbox' && checkbox[i].checked) {
            checkedValues++;
        }
    }
    if (checkedValues == 0) {
        return "Cochez au moins une case";
    }
    return "";
}


function checkValues() {
    var checkbox = document.getElementsByTagName('input');
    var checkedValues = [];
    var model = "";
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].type == 'checkbox' && checkbox[i].checked) {
            checkedValues.push(checkbox[i]);
        }
    }
    if (checkedValues.length == 0) {
        console.log("Choose a value");
    } else {
        for (let i = 0; i < checkedValues.length; i++) {
            switch (checkedValues[i].value) {
                case "capital":
                    model += "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
                    break;
                case "small":
                    model += "abcdefghiklmnopqrstuvwxyz"
                    break;
                case "number":
                    model += "0123456789";
                    break;
                case "special":
                    model += ".!$#@?_-"
                    break;
                default:
                    break;
            }
        }
    }
    return model;
}

function passGen(model) {
    var password = "";
    for (let i = 0; i < pwdLengthField.value; i++) {
        var rnum = Math.floor(Math.random() * model.length);
        password += model.substring(rnum, rnum + 1);
    }
    return password;
}

var checkboxes = document.querySelectorAll('input[type=checkbox]');
console.log(checkboxes);
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
       
   })
});

btn.addEventListener('click', () => {
    var errorMsg = checkForm();
    if (errorMsg != "") {
        errorDisplay.innerText = errorMsg;
    } else {
        var pwdDisplay = document.getElementById('show-password');
        pwdDisplay.innerText = passGen(checkValues());
        copyBtn.disabled = false;
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pwdDisplay.innerText);
            alert('Mot de passe copié!!');
        })
    }
})