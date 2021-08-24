import * as gameFunc from './functions.js';

var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#quizStart");
let questions = {
    q0:"What two values can a boolean be set as ?",
    q0Ans: "true of false",
    q1:"What does DOM stand for ?"
}

function init () {
    console.log("started init");
    gameFunc.timer(timerElement)
    gameFunc.clearContent(gameForm);
    gameFunc.setQuestion('gameForm', questions.q0, questions.q0Ans)
}
console.log(startButton);
startButton.addEventListener('click', init);
