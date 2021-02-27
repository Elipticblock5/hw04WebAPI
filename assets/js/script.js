//add build quiz function

//add show results function




var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('startBtn');

var message =
  'You are out of time';
var words = message.split(' ');

// add event listener for start button

document.getElementById("startBtn").addEventListener("click", function() {
  var quiz =document.getElementById("questions");
});

// worked with tutor Sierra Chapman on hide element problem.

document.getElementById("questContainer").style.display = "none";
document.getElementById("highScorecontainer").style.display = "none";










// starting question array 4 questions
var questions = 
[
  {
    question: "What is the capital of United Kingdom?",
    choices: ["Manchester", "Birmingham", "London", "Birmingham"],
    answer: 2
  },
  
  {
    question: "What is the capital of United States?",
    choices: ["California", "WashingtonDC", "Miami", "Florida"],
    answer: 1
  }


  
];





// Timer that counts down from 75  Lesson 4 solved problems. 
function countdown() {
  var timeLeft = 75;
 // startn button redo from lesson 4 solved examples
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
  var msgInterval = setInterval(function() {
    if (words[wordCount] === undefined) {
      clearInterval(msgInterval);
    } else {
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 300);
}

startBtn.onclick = countdown;









