// initial variables
var timeLeft = 75;
var timerID
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var startBoxEl = document.getElementById("start-box");
var questionBoxEl = document.getElementById("question-box");
var questionEl = document.getElementById("question");
var answerButtonsEl = getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScore = document.getElementById("clear-btn");
var initialsBox = document.getElementById("player-name");
var restartDoom = document.getElementById("restart-btn");
var scoreDoom = document.getElementById("player-score");




var randomQuestions, currentQuestions

//start button to get first question
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestions++
  setNextQuestion()
});

//  doom timer
function doomClock() {
  timeLeft--;
  timerEl.textContent = timeLeft + " until DOOM";
  if (timeLeft <= 0) {
    saveScore();
  }
}

//  doom quiz starter

function doomQuiz() {
  timerID = setInterval(timeTick, 1000);
  startBoxEl.classList.add("hide");
  randomQuestions = questions.sort(() => Math.random() - .5)
  currentQuestions = 0
  questionBoxEl.classList.remove("hide");

  timeTick();
  setNextQuestion();
}

// next question function

function setNextQuestion() {
  resetState();
  showQuestion(randomQuestions[currentQuestions]);
}

// dynamic to display questions

function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }

    button.addEventListener("click", selectAnswer)
    answerButtonsEl.appendChild(button)
    
  });
};


// reset questions
function resetState() {
  nextButton.classList.add("hide")
  checkAnswerEl.classList.add("hide")
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild
      (answerButtonsEl.firstChild)
  }
};

// answer selection function

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;

  if (correct) {
    checkAnswerEl.innerHTML = "You got it right and avoided DOOM";

  } else {
    checkAnswerEl.innerHTML = "DOOM, you lose 10 seconds";
     if (timeLeft <= 10) {
       timeLeft = 0;

     } else {
       timeLeft -= 10;
     }
  }

   Array.from(answerButtonsEl.children).forEach(button => {
     setStatusClass(button, button.dataset.correct)
   })

   if (randomQuestions.length > currentQuestions +1) {
     nextButton.classList.remove("hide")
     checkAnswerEl.classList.remove("hide")
   } else {
     startButton.classList.remove("hide")
     saveScore();
   }
};


































