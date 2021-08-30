
// Set Up Questions and Initial Variables
var questions = [
  {
    title: "Commonly used data-types do NOT include which:",
    multiChoice: ["1) strings", "2) booleans", "3) alerts", "4) numbers"],
    answer: "2) booleans"
  },

  {
    title: "Within a loop, the 'break' keyword may be used to do what?",
    multiChoice: ["1) break your competitors code", "2) exit the loop immediately", "3) repeat the loop", "4) indicate a stopping condition"],
    answer: "2) exit the loop immediately"
  },

  {
    title: "The conditions in an if/ else statement is enclosed with:",
    multiChoice: ["1) quotes", "2) curly brackets", "3) parenthesis", "4) square brackets"],
    answer: "2) curly brackets"
  },

  {
    title: "Which array method inserts an element at the end of the array?",
    multiChoice: ["1) .pop()", "2) .push()", "3) .length", "4) .join()"],
    answer: "2) .push()"
  },

  {
    title: "What is a callback function?",
    multiChoice: ["1) a function that accepts an array as an argument", "2) I function that performs an HTTP request", "3) a data type similar to a string or a boolean", "4) a function that is passed into another function as an argument"],
    answer: "1) a function that is passed into another function as an argument"
  }
];

let secondsLeft = 75;

let timer = document.getElementById("timer");

let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")

let viewScoresBtn = document.getElementById("view-scores")

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);

var questionDiv = document.getElementById("question-div");

let results = document.getElementById("results");

var choices = document.getElementById("choices");

let emptyArray = [];

let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

var questionCount = 0;

let score = 0

function setTime() {
  displayQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}

function displayQuestions() {
  removeEls(startButton);

  if (questionCount < questions.length) {
    questionDiv.innerHTML = '<div class = "title-centered"> ' + questions[questionCount].title + '</div>';
    choices.textContent = "";

    for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
      let el = document.createElement("button");
      el.innerText = questions[questionCount].multiChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[questionCount].answer) {
          score += secondsLeft;
        } else {
          score -= 10;
          secondsLeft = secondsLeft - 10;
        }
        
        questionDiv.innerHTML = "";

        if (questionCount === questions.length) {
          return;
        } else {
          questionCount++;
          displayQuestions();
        }
      });
      choices.append(el);
    }
  }
}


function captureUserScore() {
  timer.remove();
  choices.textContent = "";

  let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  results.innerHTML = '<div class = "youScored-center">' + `You scored ${score} points!` + "</br>" + `Enter initials:` + '</div>'
  initialsInput.setAttribute("type", "text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post My Score!");
  postScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    };

    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
  });
  results.append(initialsInput);
  results.append(postScoreBtn);
}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function displayAllScores() {
  removeEls(timer, startButton, results);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach(obj => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoresDiv.append(resultsP);
  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startButton);
    displayAllScores();
    removeEls(viewScoresBtn);
    clearScoresBtn();
    goBackBtn();
  });
}

function clearScoresBtn() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoresDiv);
    window.localStorage.removeItem("highScores");
  })
  scoresDiv.append(clearBtn)
}

function goBackBtn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}

viewScores();