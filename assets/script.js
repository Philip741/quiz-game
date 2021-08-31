import * as gameFunc from './functions.js';

var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#quizStart");
var score = 0;
var timerCount = 30;
var qNumber = 'q1';
var isWin = false;
var isCorrect;
var defaultInitials = "aaa";


function init () {
    let currentQuestion = 1;
    var gameFormEl = document.getElementById('gameForm');
    var ansStatEl = document.getElementById('answerStatus');
    //setup timer
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
        // set initial question
        gameFunc.newSetQuestion(gameFormEl,response,qNumber);
        //return the response data that is the contents of the objects in json file
        return response
    })
    .then(function(response){
        //add event listener for questions
        gameFormEl.addEventListener('click', event => {
            let qAns = qNumber + "Answer";
            let answer = response[qAns];
            let maxQuestions = response["numberQuestions"];
            var answerContent = event.target.textContent;
            //increment question number 
            currentQuestion++

            if (currentQuestion > maxQuestions) {
                isWin = true;
                //gameFunc.gameOver(gameFormEl);
                return
            }
            //check correct answer
            if (answer === answerContent) {
                gameFunc.displayResult(ansStatEl,!isCorrect)
                setTimeout(() =>{
                    gameFunc.clearContent(ansStatEl);
                }, 1000);
                gameFunc.clearContent(gameFormEl);
                //increment current question number
                score++;
                gameFunc.storeScore(defaultInitials,score);
                qNumber = "q" + currentQuestion
                gameFunc.newSetQuestion(gameFormEl,response,qNumber);
                gameFunc.getScore(defaultInitials);
            }
            else if (answer !== answerContent) {
                console.log("wrong answer!")
                gameFunc.displayResult(ansStatEl,isCorrect)
                setTimeout(() =>{
                    gameFunc.clearContent(ansStatEl);
                }, 1000);
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
                gameFunc.clearContent(gameFormEl);
                qNumber = "q" + currentQuestion
                gameFunc.newSetQuestion(gameFormEl,response,qNumber);
            }
            //var sleep = function (ms) {
             //   let now = Date.now(), end = now + ms;
              //  while (now < end) { now = Date.now(); }
             // };
            //sleep(2000)
            var myTarget = event.target;
            myTarget.dataset.id = "Correct";

        })
    })
    
}

startButton.addEventListener('click', init);





