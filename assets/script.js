import * as gameFunc from './functions.js';

var timerElement = document.querySelector("#timer-count");
var mainForm = document.querySelector("#mainForm");
var startButton = document.querySelector("#quizStart");
var score = 0;
var timerCount = 30;
var qNumber = 'q1';
var isWin = false;
var isCorrect;
var currentQuestion = 0;


function init () {
    //localStorage.clear();
    var gameFormEl = document.getElementById('gameForm');
    var ansStatEl = document.getElementById('answerStatus');
    //setup timer
    let timer = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
           clearInterval(timer);
           timerElement.textContent = timerCount;
           gameFunc.gameOver(mainForm, init);
           
        }
        else if (timerCount > 0 && isWin) {
           clearInterval(timer)
           timerCount = 0;
           timerElement.textContent = timerCount;
           gameFunc.gameOver(mainForm, init);
        }
    }, 1000);

    //initial clear of game form    
    gameFunc.clearContent(gameFormEl);
     
    // run fetch to get questions from json file returns promise
    gameFunc.getQuestions()
    .then(function(response) {
        // set initial question
        gameFunc.newSetQuestion(gameFormEl,response,qNumber);
        //increment number after first question set 
        currentQuestion++;
        //return the response data that is the contents of the objects in json file
        return response
    })
    .then(function(response){
        //add event listener for questions
        let maxQuestions = response["numberQuestions"];
        gameFormEl.addEventListener('click', event => {
            currentQuestion++;
            let qAns = qNumber + "Answer";
            let answer = response[qAns];
            var answerContent = event.target.textContent;
            //increment question number 

            //check correct answer
            if (answer === answerContent) {
                console.log("Correct answer!!!");
                gameFunc.displayResult(ansStatEl,!isCorrect)
                score++;
                //store current score
                gameFunc.storeScore(score);
            }
            else if (answer !== answerContent) {
                console.log("wrong answer!")
                gameFunc.displayResult(ansStatEl,isCorrect)
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
                qNumber = "q" + currentQuestion
                setTimeout(() =>{
                gameFunc.clearContent(ansStatEl);
                }, 1000);
                if (currentQuestion > maxQuestions) {
                    isWin = true;
                    gameFunc.clearContent(mainForm);
                    return isWin
                }
                else {
                gameFunc.clearContent(gameFormEl);
                gameFunc.newSetQuestion(gameFormEl,response,qNumber);
                }
        })
    })
    
}

startButton.addEventListener('click', init);





