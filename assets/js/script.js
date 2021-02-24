// Initial working timer, need to add onclick, penalty and sytle. 
//working on onclick function
//countdown and alrt working


function startTimer(){
  var counter = 45;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter === 0) {
        alert('sorry, out of time');
        clearInterval(counter);
    }
  }, 1000);
}
function start()
{
    document.getElementById("count").style="color:green";
    startTimer();
};

//adding initial js question array

var jsQuestions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Is JavaScript fun to work with?",
    choices: ["No", "Sometimes", "What is Javascript", "Not just yes, but HELL YES!"],
    answer: "Not just yes, but HELL YES!"
  },
  {
    title: "DOM is an abreviation for ____",
    choices: ["Data Object Mode", "Dumb Old Man", "Document Object Model", "Dutle Opo Mipsy"],
    answer: "Document Object Model"
  },
  {
    title: "JavaScript is Textile Mark Up (TML) version of Java?",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    title: "JavaScript is strongly typed language",
    choices: ["True", "False"],
    answer: "False"
  }
];


