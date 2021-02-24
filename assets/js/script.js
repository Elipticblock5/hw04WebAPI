const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

var questions = [
  {
      title: "Javascript can run in?",
      choices: ["browser", "CPU", "low level memory", "earphones"],
      answer: "browser"
  },
  {
      title: "The inventor of Javascript is?",
      choices: ["Brad Eichen", "Bill Gates", "Tec Cruz", "Steve Jobs"],
      answer: "Brad Eichen"
  },
  {
      title: "A goot tool for debugging javascipt is:",
      choices: ["Javascript", "terminal / bash", "for loops", "console log"],
      answer: "console log"
  },

];


var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#quizQuestions");
var wrapper = document.querySelector("#wrapper");


var secondsLeft = 60;

var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");


