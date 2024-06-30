const questions = [
    {
        question: "What is Python?",
        answers: [
            { text: "A high-level programming language", correct: true},
            { text: "A type of snake", correct: false},
            { text: "A data structure", correct: false},
            { text: "A database management system", correct: false},
        ]
    },
    {
        question: "Which keyword is used to define a function in Python?",
        answers: [
            { text: "func", correct: false},
            { text: "define", correct: false},
            { text: "def", correct: true},
            { text: "function", correct: false},
        ]
    },
    {
        question: "What will be the output of print(2 + 3 * 4) in Python?",
        answers: [
            { text: "20", correct: false},
            { text: "18", correct: false},
            { text: "14", correct: false},
            { text: "32", correct: true},
        ]
    }, 
    {
        question: "Which of the following data types is mutable in Python?",
        answers: [
            { text: "Tuple", correct: false},
            { text: "Integer", correct: false},
            { text: "String", correct: false},
            { text: "List", correct: true},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.dispaly = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();