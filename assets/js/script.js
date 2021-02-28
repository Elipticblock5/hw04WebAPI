var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("begin-btn");
var nextButton = document.getElementById("next-btn");
var startBoxEl = document.getElementById("start-box");
var questionBoxEl = document.getElementById("question-box");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores");
var submitButton = document.getElementById("submit-btn");
var clearDoomBtn = document.getElementById("clear-btn");
var initialsBox = document.getElementById("player-name");
var restartDoom = document.getElementById("restart-btn");
var scoreDoom = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var randomQuestions, currentQuestions;

//start button to get first question

startButton.addEventListener("click", startDoom);
nextButton.addEventListener("click", () => {
  currentQuestions++;
  gotoNextQuestion();
});

//  doom timer
function countDown() {
  timeLeft--;
  timerEl.textContent = timeLeft + " until DOOM";
  if (timeLeft <= 0) {
    saveScore();
  }
}

//  doom quiz starter

function startDoom() {
  timerID = setInterval(countDown, 1000);
  startBoxEl.classList.add("hide");
  randomQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestions = 0;
  questionBoxEl.classList.remove("hide");

  countDown();
  gotoNextQuestion();
}

// next question function

function gotoNextQuestion() {
  resetState();
  showQuestion(randomQuestions[currentQuestions]);
}

// dynamic to display questions

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}

// reset questions
function resetState() {
  nextButton.classList.add("hide");
  checkAnswerEl.classList.add("hide");
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

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

  Array.from(answerButtonsEl.children).forEach((button) => {
    correctWrongClass(button, button.dataset.correct);
  });

  if (randomQuestions.length > currentQuestions + 1) {
    nextButton.classList.remove("hide");
    checkAnswerEl.classList.remove("hide");
  } else {
    startButton.classList.remove("hide");
    saveScore();
  }
}

// check answers, change button colors
function correctWrongClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// class clear

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// saving score to local storage
function saveScore() {
  clearInterval(timerID);
  timerEl.textContent = "Time: " + timeLeft;
  setTimeout(function () {
    //localStorage.setItem("scores", JSON.stringify(scores));
    questionBoxEl.classList.add("hide");
    document.getElementById("score-box").classList.remove("hide");
    document.getElementById("your-score").textContent =
      "Your final score is " + timeLeft;
  }, 2000);
}



// loadscore function
var loadScores = function () {


  if (!savedScores) {
    return false;
  }

  // convert scores into array

  savedScores = JSON.parse(savedScores);
  var initials = document.querySelector("#initials-field").value;
  var newScore = {
    score: timeLeft,
    initials: initials,
  };
  savedScores.push(newScore);
  console.log(savedScores);

  savedScores.forEach((score) => {
    initialsBox.innerText = score.initials;
    scoreDoom.innerText = score.score;
  });
};

// show high scores

function showHighScores(initials) {
  document.getElementById("highscores").classList.remove("hide");
  document.getElementById("score-box").classList.add("hide");
  startBoxEl.classList.add("hide");
  questionBoxEl.classList.add("hide");
  if (typeof initials == "string") {
    var score = {
      initials,
      timeLeft,
    };
    scores.push(score);
  }

  var highScoreEl = document.getElementById("highscore");
  highScoreEl.innerHTML = "";

  for (i = 0; i < scores.length; i++) {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "name-div");
    div1.innerText = scores[i].initials;
    var div2 = document.createElement("div");
    div2.setAttribute("class", "score-div");
    div2.innerText = scores[i].timeLeft;

    highScoreEl.appendChild(div1);
    highScoreEl.appendChild(div2);
  }

  localStorage.setItem("scores", JSON.stringify(scores));
}

// high score  link load

viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials-field").value;
  showHighScores(initials);
});

// reload the page
restartDoom.addEventListener("click", function () {
  window.location.reload();
});

// clear local storage

clearDoomBtn.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscores").innerHTML = "";
});
