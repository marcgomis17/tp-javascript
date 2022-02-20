var questionList = [
    {
        question: "Quel est le Meilleur Language de Programmation en 2022",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Quel était le premier langage de programmation numérique de l’histoire?",
        a: "Fortran",
        b: "Assembly",
        c: "Short Code",
        d: "Algol",
        correct: "Short Code"
    },
    {
        question: "Lequel des quatre langages suivants est le plus ancien?",
        a: "Java",
        b: "JavaScript",
        c: "Visual Basic",
        d: "C#",
        correct: "Visual Basic"
    },
    {
        question: "Le langage que l'ordinateur comprend est",
        a: "Java",
        b: "Assembly",
        c: "Binaire",
        d: "Algol",
        correct: "Binaire"
    }
];

var container = document.querySelector('.container');
var answerAp = document.querySelector('.status');
var score = 0;
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

var questionIndex = between(0, 3);
var question = questionList[questionIndex];

function buildForm() {
    //creation of the elements
    var nextBtn = document.createElement('input');
    var quizzDisplay = document.createElement('div');
    var questionDisplay = document.createElement('p');
    var formWrapper = document.createElement('div');
    var form = document.createElement('form');
    var bFormControl = document.createElement('div');

    //setting attributes and values of the elements
    quizzDisplay.className = "question";
    questionDisplay.id = "question-display";
    questionDisplay.innerText = question.question;
    formWrapper.className = "form-wrapper";
    form.id = "form";
    bFormControl.classList.add('form-control', 'submit');
    nextBtn.setAttribute('role', 'button');
    nextBtn.type = "submit"
    nextBtn.value = "Suivant";
    nextBtn.disabled = true;
    nextBtn.onmouseover = () => {
        if (nextBtn.disabled) {
            nextBtn.style.cursor = "default";
        } else {
            nextBtn.style.cursor = "pointer";
        }
    }

    for (let i = 1; i < 5; i++) {
        var formControl = document.createElement('div');
        var choice = document.createElement('input');
        var label = document.createElement('label');

        formControl.classList.add('form-control', 'answer');
        choice.type = "radio";
        choice.name = "answer";
        choice.id = `answer-${Object.keys(question)[i]}`;
        choice.value = Object.values(question)[i];
        label.htmlFor = `answer-${Object.keys(question)[i]}`;
        label.innerText = Object.values(question)[i];

        formControl.append(choice, label);
        form.append(formControl);
    }

    //Adding elements in the DOM tree
    bFormControl.appendChild(nextBtn);
    form.appendChild(bFormControl);
    formWrapper.appendChild(form);
    quizzDisplay.append(questionDisplay, formWrapper);
    return quizzDisplay;
}

function addClass(element) {
    element.classList.add('selected');
}

function displayQuestion() {
    container.append(buildForm());
    var formControls = document.querySelectorAll('.answer');
    formControls.forEach(selection => {
        var label = selection.querySelector('label');
        selection.onmouseover = () => {
            selection.classList.add('selected');
            label.classList.add('selected');
        }
        selection.onmouseout = () => {
            selection.classList.remove('selected');
            label.classList.remove('selected');
        }
        selection.onclick = () => {
            var answer = selection.querySelector('input').value;
            selection.classList.add('selected-answer');
            getAnswer(answer);
            disableAll(answer);
            console.log(score);
        }
    });
}

function getAnswer(answer) {
    if (answer == question.correct) {
        answerAp.innerText = 'Correct!';
        answerAp.classList.add('status-correct');
        score += 1;
        // score = score - 1;
    } else {
        answerAp.innerText = 'Incorrect!';
        answerAp.classList.add('status-false');
    }
}

function disableAll(answer) {
    var formControls = document.querySelectorAll('.answer');
    var formBtn = document.querySelector('input[type=submit]');
    formControls.forEach(element => {
        var elementLabel = element.querySelector('label');
        if (elementLabel.innerText != answer) {
            element.querySelector('input').disabled = true;
            element.onmouseover = () => {
                element.classList.remove('selected');
                elementLabel.classList.remove('selected');
            }
            element.onclick = () => {
                element.classList.remove('selected-answer');
            }
        }
    });
    formBtn.disabled = false;
}

displayQuestion();
