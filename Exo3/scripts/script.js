var pwdLengthField = document.getElementById('pwd-length');
var form = document.getElementById('form');
var errorDisplay = document.getElementById('error');
var btn = document.querySelector('#btn');
var copyBtn = document.getElementById('copy-btn');
copyBtn.disabled = true;
var pwdDisplay = document.getElementById('pwd-display')
btn.disabled = true;
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
var checkbox = document.querySelectorAll('input[type=checkbox]');
checkbox.forEach(check => {
    check.addEventListener('change', () => {
        if (check.checked) {
            console.log('checked');
            if (btn.disabled == true) {
                btn.disabled = false;
            }
            btn.disabled = false;
        } else {
            btn.disabled = true;
            console.log('unchecked');
        }
    })
});

function checkForm() {
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
                    // console.log(model);
                    break;
                case "small":
                    model += "abcdefghiklmnopqrstuvwxyz"
                    // console.log(model);
                    break;
                case "numbers":
                    model += "0123456789";
                    // console.log(model);
                    break;
                case "special":
                    model += ".!$#@"
                    // console.log('special');
                    break;
                default:
                    // console.log('Choose a value');
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

btn.addEventListener('click', () => {
    var errorMsg = checkForm();
    if (errorMsg != "") {
        errorDisplay.innerText = errorMsg;
    } else {
        var pwdDisplay = document.getElementById('show-pwd');
        pwdDisplay.innerText = passGen(checkValues());
        copyBtn.disabled = false;
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pwdDisplay.innerText);
            alert('Mot de passe copié!!');
        })
    }
})