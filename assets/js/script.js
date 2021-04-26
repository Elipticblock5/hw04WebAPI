// used prettier to clean up code spacing

var doomTimeLeft = 75;
var doomTimerID;
var doomTimerEl = document.getElementById("timer");
var startDoomButton = document.getElementById("begin-btn");
var nextDoomButton = document.getElementById("next-btn");
var startDoomBoxEl = document.getElementById("doom-start-box");
var doomQuestionBoxEl = document.getElementById("doom-question-box");
var questionEl = document.getElementById("question");
var doomAnswersEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var doomHighScores = document.getElementById("doomscores");
var submitDoom = document.getElementById("submit-btn");
var clearDoomBtn = document.getElementById("clear-btn");
var doomInitials = document.getElementById("player-name");
var restartDoom = document.getElementById("restart-btn");
var scoreDoom = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var doomQuestions, currentDoomQuestions;

//start button to get first question

startDoomButton.addEventListener("click", startDoom);
nextDoomButton.addEventListener("click", function () {
  currentDoomQuestions++;
  gotoNextDoom();
});

//  DOOM timer

function doomTimer() {
  doomTimeLeft--;
  doomTimerEl.textContent =
    doomTimeLeft + " seconds until you are DOOMED...DOOMED I TELL YOU!!";
  if (doomTimeLeft <= 0) {
    window.alert("HAHA,.....YOU HAVE MET YOUR DOOM!!!")
    saveDoomScore();
  }
}
// want to add else statement here ot trigger message of DOOM, similar to module 4 timer solution could not get working


//  DOOM quiz starter

function startDoom() {

  //starts teh timer by second
  doomTimerID = setInterval(doomTimer, 1000);

  //pulls up the question box into HTML when quiz starts

  startDoomBoxEl.classList.add("hide");


//this sorts the array, https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540

  doomQuestions = questions.sort(() => Math.random() - 0.5);
  currentDoomQuestions = 0;
  doomQuestionBoxEl.classList.remove("hide");

  doomTimer();
  gotoNextDoom();
}

// next doom question function, resets 

function gotoNextDoom() {
  resetDoom();
  showDoomQuestion(doomQuestions[currentDoomQuestions]);
}

// dynamic to display questions after clickig next button

function showDoomQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
//goes to next even after clicking answer button

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
// event listener, using default (e) for eveent

function selectDoomAnswer(e) {
  var doomSelection = e.target;
  var correct = doomSelection.dataset.correct;

  //listens to answer, if correct alerts answer is right

  //if wrong then deduct 10 seconds from timer
  if (correct) {
    checkAnswerEl.innerHTML =
      "You got it right and avoided impending MASSIVE DOOM!";
  } else {
    checkAnswerEl.innerHTML =
      "WRONG!! You just DOOMED yourself! You're 10 seconds closer to DOOM!!";
    if (doomTimeLeft <= 10) {
      doomTimeLeft = 0;
    } else {
      doomTimeLeft -= 10;
    }
  }

  // using arrow functions could also write function correctWrongClass


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
  var newDoomScore = {
    score: doomTimeLeft,
    initials: initials,
  };

  //pushes new score for 
  savedScores.push(newDoomScore);
  console.log(savedScores);

  savedScores.forEach((score) => {
    doomInitials.innerText = score.initials;
    scoreDoom.innerText = score.score;
  });
};

// show high scores fumction

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

  //creates save boces based on conditions of time, win, lose
  
 

  for (i = 0; i < scores.length; i++) {
    var div1 = document.createElement("div");

    //div 1 scores, initials
    div1.setAttribute("class", "name-div");
    div1.innerText = scores[i].initials;

 //div 2 scores, time left 
    var div2 = document.createElement("div");
    div2.setAttribute("class", "score-div");
    div2.innerText = scores[i].doomTimeLeft;


    //appens high score box, based on above
    highDoomScoreEl.appendChild(div1);
    highDoomScoreEl.appendChild(div2);
  }
//sets scores to local storage 
  localStorage.setItem("scores", JSON.stringify(scores));
}

// high score page  link load

doomHighScores.addEventListener("click", showDoomScores);

//submit scores sections, on click event to save initial for high score list

submitDoom.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials-field").value;
  showDoomScores(initials);
});

// reload the page on click function
restartDoom.addEventListener("click", function () {
  window.location.reload();
});

// clear local storage to reset

clearDoomBtn.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("doomscores").innerHTML = "";
});
