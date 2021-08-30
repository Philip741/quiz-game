import * as gameFunc from './functions.js';

var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#quizStart");
var score = 0;
var timerCount = 30;
var qNumber = 'q1';
var isWin = false;

function init () {
    let currentQuestion = 1;
    var gameFormEl = document.getElementById('gameForm');
    let timer = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
           clearInterval(timer);
           timerElement.textContent = timerCount;
           gameFunc.gameOver(gameFormEl);
        }
        if (timerCount > 0 && isWin) {
           clearInterval(timer)
           timerCount = 0;
           timerElement.textContent = timerCount;
           gameFunc.gameOver(gameFormEl);
        }
    }, 1000);
    //initial clear of game form    
    gameFunc.clearContent(gameFormEl);

    gameFunc.getQuestions()
    .then(function(response) {
        console.log(response);
        gameFunc.newSetQuestion(gameFormEl,response,qNumber);
        return response
    })
    .then(function(response){
        gameFormEl.addEventListener('click', event => {
            let qAns = qNumber + "Answer";
            let answer = response[qAns];
            let maxQuestions = response["numberQuestions"];
            console.log(maxQuestions);
            var answerContent = event.target.textContent;
            //increment question number 
            currentQuestion++
            //correct answer
            if (answer === answerContent) {
                console.log("Answer Correct");
                gameFunc.clearContent(gameFormEl);
                //increment current question number
                score++
                console.log("Current question number: " + currentQuestion);
                console.log("Current score: " + score);
                qNumber = "q" + currentQuestion
                if (currentQuestion > maxQuestions) {
                    isWin = true;
                    gameFunc.gameOver(gameFormEl);
                }
                else {
                    gameFunc.newSetQuestion(gameFormEl,response,qNumber);
                }
            }
            else if (answer !== answerContent) {
                console.log("wrong answer!")
                if (timerCount > 0) {
                    let subtractAmt = timerCount - 5
                    if (subtractAmt < 0) {
                        isWin = true;
                    }
                    else {
                        timerCount -= 5;
                    }
                timerElement.textContent = timerCount;
                }
            }
            var myTarget = event.target;
            myTarget.dataset.id = "Correct";

        })
    })
    
}

startButton.addEventListener('click', init);





