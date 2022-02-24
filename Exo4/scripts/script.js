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
        correct: "c"
    },
    {
        question: "Lequel des quatre langages suivants est le plus ancien?",
        a: "Java",
        b: "JavaScript",
        c: "Visual Basic",
        d: "C#",
        correct: "c"
    },
    {
        question: "Le langage que l'ordinateur comprend est",
        a: "Java",
        b: "Assembly",
        c: "Binaire",
        d: "Algol",
        correct: "c"
    }
];

var answerAp = document.querySelector('.status');
var questionDisplay = document.getElementById('question-display');
var questionContainer = document.querySelector('.question');
var labels = document.querySelectorAll('label');
var inputs = document.querySelectorAll('input[type=radio]');
var scoreDisplay = document.querySelector('.score');
var scoreDisplayText = document.querySelector('.score-display');
var index = 0;
var score = 0;
var answer = "";

var nextBtn = document.getElementById('next');
nextBtn.disabled = true;
nextBtn.onmouseover = () => {
    if (nextBtn.disabled) {
        nextBtn.style.cursor = "default";
    } else {
        nextBtn.style.cursor = "pointer";
    }
}

labels.forEach(label => {
    label.onmouseover = () => {
        label.classList.add('hover');
    }
    label.onmouseout = () => {
        label.classList.remove('hover');
    }
    label.onclick = () => {
        label.classList.add('active');
        answer = label.parentElement.querySelector('input').id;
        getAnswer(answer, questionList[index]);
    }
});

function displayQuestion(s_question) {
    questionDisplay.innerText = s_question.question;
    var i = 0
    var j = 1;
    while (i < labels.length) {
        labels[i].innerText = Object.values(s_question)[j];
        inputs[i].value = Object.values(s_question)[j];
        i++;
        j++;
    }
}

function getAnswer(answer, question) {
    if (answer == question.correct) {
        answerAp.innerText = "Correct!";
        answerAp.classList.add('status-correct');
        score++;
    } else {
        answerAp.innerText = "Incorrect!";
        answerAp.classList.add('status-false');
    }
    nextBtn.disabled = false;
}

function disableAll() {
    answer = "";
    labels.forEach(label => {
        label.classList.remove('active');
        var input = label.parentElement.querySelector('input');
        if (input.checked) {
            input.checked = false;
        }
    });
}

displayQuestion(questionList[index]);

nextBtn.onclick = () => {
    answerAp.innerText = "";
    answerAp.classList.remove('status-correct', 'status-false');
    disableAll();
    index++;
    if (index < questionList.length) {
        displayQuestion(questionList[index]);
    } else {
        questionContainer.style.display = "none";
        scoreDisplayText.innerText = `Vous avez trouvé ${score}/4 questions`;
        scoreDisplay.style.display = "block";
    }
}

var restartBtn = document.getElementById('restart');
restartBtn.onclick = () => {
    scoreDisplay.style.display = "none";
    questionContainer.style.display = "block";
    index = 0;
    score = 0;
    displayQuestion(questionList[index]);
}