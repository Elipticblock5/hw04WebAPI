//setting initial variables baed on hmtl tags.

var doomTimeLeft = 75;
var doomTimerID;
var doomTimerEl = $('#timer');
var startDoomButton = $('#begin-btn');
var nextDoomButton = $('#next-btn');
var startDoomBoxEl = $('#doom-start-box');
var doomQuestionBoxEl = $('#doom-question-box');
var questionEl = $('#question');
var doomAnswersEl = $('#answer-buttons');
var checkAnswerEl = $('#check-answer');
var doomHighScores = $('#doomscores');
var submitDoom = $('#submit-btn');
var clearDoomBtn = $('#clear-btn');
var doomInitials = $('#player-name');
var restartDoom = $('#restart-btn');
var scoreDoom = $('#player-score');

//parsing scores, found answer https://www.w3schools.com/jsref/met_storage_getitem.asp
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var doomQuestions, currentDoomQuestions;

//start button to get first question


$(document).ready(function() {
  $("startDoomButton").click(startDoom());
  $("nextDoomButton").click {
  currentDoomQuestions++;
  gotoNextDoom();
};

//  DOOM timer functions, counts down, alert at 0 seconds left.

function doomTimer() {
  doomTimeLeft--;
  doomTimerEl.textContent = doomTimeLeft + " seconds until you are DOOMED...DOOMED I TELL YOU!!";
  if (doomTimeLeft <= 0) {
    saveDoomScore();
    window.alert("YOU REACHED DOOM!!")
  }
}



//  DOOM quiz starter

function startDoom() {
  doomTimerID = setInterval(doomTimer, 1000);
  startDoomBoxEl.classList.add("hide");
  doomQuestions = questions.sort(() => Math.random() - 0.5);
  currentDoomQuestions = 0;
  doomQuestionBoxEl.classList.remove("hide");

  doomTimer();
  gotoNextDoom();
}

// next doom question function

function gotoNextDoom() {
  resetDoom();
  showQuestion(doomQuestions[currentDoomQuestions]);
}

// dynamic to display questions and next button

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
    doomAnswersEl.appendChild(button);
  });
}

// reset questions
function resetDoom() {
  nextDoomButton.classList.add("hide");
  checkAnswerEl.classList.add("hide");
  while (doomAnswersEl.firstChild) {
    doomAnswersEl.removeChild(doomAnswersEl.firstChild);
  }
}

// answer selection correct, lose 10 seconds if wrong.

function selectDoomAnswer(e) {
  var doomSelection = e.target;
  var correct = doomSelection.dataset.correct;

  if (correct) {
    checkAnswerEl.innerHTML = "You got it right and avoided impending MASSIVE DOOM!";
  } else {
    checkAnswerEl.innerHTML = "WRONG!! You just DOOMED yourself! You're 10 seconds closer to DOOM!!";
    if (doomTimeLeft <= 10) {
      doomTimeLeft = 0;
    } else {
      doomTimeLeft -= 10;
    }
  }

  Array.from(doomAnswersEl.children).forEach((button) => {
    correctWrongClass(button, button.dataset.correct);
  });

  if (doomQuestions.length > currentDoomQuestions + 1) {
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
  clearInterval(doomTimerID);
  doomTimerEl.textContent = "Time " + doomTimeLeft;
  setTimeout(function () {
    // string the scores
    doomQuestionBoxEl.classList.add("hide");
    document.getElementById("score-box").classList.remove("hide");
    document.getElementById("your-score").textContent =
      "Your JavaScript Quiz O' Doom score is: " + doomTimeLeft;
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
    score: doomTimeLeft,
    initials: initials,
  };
  savedScores.push(newScore);
  console.log(savedScores);

  savedScores.forEach((score) => {
    doomInitials.innerText = score.initials;
    scoreDoom.innerText = score.score;
  });
};

// show high scores

function showDoomScores(initials) {
  document.getElementById("doomscores").classList.remove("hide");
  document.getElementById("score-box").classList.add("hide");
  startDoomBoxEl.classList.add("hide");
  doomQuestionBoxEl.classList.add("hide");
  if (typeof initials == "string") {
    var score = {
      initials,
      doomTimeLeft,
    };
    scores.push(score);
  }

  var highDoomScoreEl = document.getElementById("doomscore");
  highDoomScoreEl.innerHTML = "";

  for (i = 0; i < scores.length; i++) {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "name-div");
    div1.innerText = scores[i].initials;
    var div2 = document.createElement("div");
    div2.setAttribute("class", "score-div");
    div2.innerText = scores[i].doomTimeLeft;

    highDoomScoreEl.appendChild(div1);
    highDoomScoreEl.appendChild(div2);
  }

  localStorage.setItem("scores", JSON.stringify(scores));
}

// high score page  link load

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
