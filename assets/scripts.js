
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