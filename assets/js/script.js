var timeLeft = 75;
var timerID;
var doomTimerEl = document.getElementById("timer");
var startDoomButton = document.getElementById("begin-btn");
var nextDoomButton = document.getElementById("next-btn");
var startBoxEl = document.getElementById("start-box");
var questionBoxEl = document.getElementById("question-box");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var doomHighScores = document.getElementById("doomscores");
var submitDoom = document.getElementById("submit-btn");
var clearDoomBtn = document.getElementById("clear-btn");
var initialsBox = document.getElementById("player-name");
var restartDoom = document.getElementById("restart-btn");
var scoreDoom = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var doomQuestions, currentQuestions;

//start button to get first question

startDoomButton.addEventListener("click", startDoom);
nextDoomButton.addEventListener("click", () => {
  currentQuestions++;
  gotoNextDoom();
});

//  DOOM timer
function doomTimer() {
  timeLeft--;
  doomTimerEl.textContent = timeLeft + " until DOOM";
  if (timeLeft <= 0) {
    saveDoomScore();
  }
}

//  doom quiz starter

function startDoom() {
  timerID = setInterval(doomTimer, 1000);
  startBoxEl.classList.add("hide");
  doomQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestions = 0;
  questionBoxEl.classList.remove("hide");

  doomTimer();
  gotoNextDoom();
}

// next doom question function

function gotoNextDoom() {
  resetDoom();
  showQuestion(doomQuestions[currentQuestions]);
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

    button.addEventListener("click", selectDoomAnswer);
    answerButtonsEl.appendChild(button);
  });
}

// reset questions
function resetDoom() {
  nextDoomButton.classList.add("hide");
  checkAnswerEl.classList.add("hide");
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

// answer selection correct, lose 10 seconds if wrong.

function selectDoomAnswer(e) {
  var doomSelection = e.target;
  var correct = doomSelection.dataset.correct;

  if (correct) {
    checkAnswerEl.innerHTML = "You got it right and avoided MASSIVE DOOM!";
  } else {
    checkAnswerEl.innerHTML = "DOOM yourself!, you are 10 seconds closer to DOOM!";
    if (timeLeft <= 10) {
      timeLeft = 0;
    } else {
      timeLeft -= 10;
    }
  }

  Array.from(answerButtonsEl.children).forEach((button) => {
    correctWrongClass(button, button.dataset.correct);
  });

  if (doomQuestions.length > currentQuestions + 1) {
    nextDoomButton.classList.remove("hide");
    checkAnswerEl.classList.remove("hide");
  } else {
    startDoomButton.classList.remove("hide");
    saveDoomScore();
  }
}

// check answers for correct and wrong 
function correctWrongClass(element, correct) {
  clearcorrectWrongClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// clearing correct or wrong

function clearcorrectWrongClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// saving score to local storage


function saveDoomScore() {
  clearInterval(timerID);
  doomTimerEl.textContent = "Time " + timeLeft;
  setTimeout(function () {
    // string the scores
    questionBoxEl.classList.add("hide");
    document.getElementById("score-box").classList.remove("hide");
    document.getElementById("your-score").textContent =
      "Your javaScript Quiz O' Doom score is: " + timeLeft;
  }, 2000);
}



// load the score function



var loadDoomScores = function () {


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

function showDoomScores(initials) {
  document.getElementById("doomscores").classList.remove("hide");
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

doomHighScores.addEventListener("click", showDoomScores);

submitDoom.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials-field").value;
  showDoomScores(initials);
});

// reload the page
restartDoom.addEventListener("click", function () {
  window.location.reload();
});

// clear local storage

clearDoomBtn.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("doomscores").innerHTML = "";
});
