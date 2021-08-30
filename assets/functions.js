var score = 0;
var currentQuestion = 1;
var timerElement = document.querySelector("#timer-count");
var gameWon = 1;

function clearContent(elementID) {
    // clears all elements within elementID argument
    // clear gameForm 
    // if (start) { clear form}
    // else if (correctAnswer) { clear form }
    // else if (missedQuestion) {clear form }
    while(elementID.firstChild){
    elementID.removeChild(elementID.firstChild);
    }
}

async function getQuestions() {
    let response = await fetch("assets/data.json");
    const data = await response.json();
    return data
}

function newSetQuestion (elementName,data,qNumber) {
    console.log(data);
    let questionContent = data[qNumber];
    let questionText = document.createTextNode(questionContent);
    let questionChoices = qNumber + "Choices";

    elementName.appendChild(questionText);
    
    for (const a of data[questionChoices]) {
        let ansButtons = document.createElement("div");
        elementName.appendChild(ansButtons);
        ansButtons.setAttribute("id", "answerButtons");
        ansButtons.textContent = a; 
    }
    
}

function setQuestion (elementName,qNumber,timerCount) {
    //function that populates the question to the screen and answer choices
    // get element that will hold the game form
    console.log(qNumber);

    let questionElement = document.getElementById(elementName);
    console.log(questionElement);
    let questionNumber = qNumber;
    var questionChoices = qNumber + "Choices";
    console.log(questionChoices);

    let getJson = fetch("assets/data.json")
    .then(response => {
       console.log(response);
       return response.json();
    });
   // add question based on questionNumber 
    getJson.then((message) => {
        let questionContent = message[questionNumber];
        console.log(questionContent);
        if (questionContent == undefined && timerCount >=0) {
            gameWon = 0;
            gameOver();
            return
        }
        else {
        console.log(questionContent);
        let questionText = document.createTextNode(questionContent);
        console.log(questionText);
        questionElement.appendChild(questionText);

        for (const a of message[questionChoices]) {
            let ansButtons = document.createElement("div");
            questionElement.appendChild(ansButtons);
            ansButtons.setAttribute("id", "answerButtons");
            ansButtons.textContent = a; 
        }
       }
    })
    .then(function(){
        setListeners(elementName,questionNumber);
    })
}

function newSetListeners(gameForm,qNumber) {
    let gameFormEl = document.getElementById(gameForm);
    console.log(gameFormEl);
    gameFormEl.querySelectorAll('#answerButtons').forEach(item => {
        console.log(item);
    });
}

function setListeners(gameForm,qNumber) {
    //console.log("running setListeners!");
    console.log(gameForm);
    //console.log(gameFormEl);
    //console.log(gameFormEl.querySelectorAll('#answerButtons'));
    gameForm.querySelectorAll('#answerButtons').forEach(item => {
    console.log(item);
    item.addEventListener('click', event => {
    var answerContent = item.textContent;
    let ansCorrect = checkAnswer(answerContent,qNumber);
    ansCorrect.then(function(value){
        if (value) {
            console.log("Answer correct returned true!!!!!!");
            score += 1;
            currentQuestion += 1;
            qNumber = "q" + currentQuestion;
            console.log(qNumber);
            clearContent(gameFormEl)
            setQuestion('gameForm',qNumber);
            console.log(score);
        }
        else if (!value){
            // subtract from timer
            console.log("wrong answer!");
        }
     });
   });
 });
}

function getAnswer(answer) {

}

function startTimer(timerCount) {
    let timer = setInterval(() => {
                        timerCount--;
                        timerElement.textContent = timerCount;
      console.log(timerCount);
      if (timerCount === 0) {
          clearInterval(timer);
          gameOver();
      }
    }, 1000);
}

function timer(timerElement,timerCount,subTime=1) {
    // function that runs the game timer
    //if answer is wrong subtract from the time
    //let missedQuestion = false;
    
    timer = setInterval(function() {
        // if missed a question subtract more time otherwise just decrement by one
        if (subTime) {
            timerCount -= subTime;
        }
        else {
        timerCount--;
        return timerCount
        }
        // set the content in the html to the timerCount value
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
          // Tests if win condition is met
          if (gameWon == 0) {
            // Clears interval and stops timer
            clearInterval(timer);
          }
        }
        // Tests if time has run out
        if (timerCount === 0) {
          // Clears interval
          clearInterval(timer);
          gameOver();
        }
      }, 1000);
      
    }


async function checkAnswer (answerText,qNumber) {
    // function to check the answer to the question and return right or wrong
    // get item from stored questions/answers then compare to user choice
    let qAnswer = qNumber + "Answer";
    answerText = answerText.trim();
    let answers = await fetch("assets/data.json");
    const data = await answers.json();
    let fetchAnswer = data[qAnswer];
    fetchAnswer = fetchAnswer.trim();

    if (fetchAnswer == answerText) {
        return true
    }
    else {
        return false
    }
}


function gameOver(elementID) {
    // function that runs when the timer hits zero or after last question answered
    // display form to enter initials and call store initials and score 
    console.log("You lost!");
    clearContent(elementID);
}

function storeScore (initials, score) {
    // function that saves initials and score
    localStorage.setItem(initials, score);
}
function getScore (initials, score) {
    // function that gets initials and score
    let userScore = localStorage.getItem(initials, score);
    // guard clause ?
    return userScore
}


function runGame() {
    // load on start button click
    return true
}


export {clearContent,startTimer, gameOver,timer, setQuestion, setListeners, storeScore,newSetQuestion,newSetListeners,checkAnswer, getQuestions};


