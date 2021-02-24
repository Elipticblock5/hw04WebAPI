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


