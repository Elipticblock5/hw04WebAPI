const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');


function buildQuiz(){}

function showResults(){}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);

const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript tag?",
      answers: {
        a: "html",
        b: "img",
        c: "funtcion"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to view console logs in Chrome?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "Chrome DevTools"
      },
      correctAnswer: "d"
    }
  ];