var missedQuestion = false;
var questions = {
    q0:"What two values can a boolean be set as ?",
    q1:"What does DOM stand for ?"
}

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

function setQuestion (elementName,questionAnswers,number) {
    //function that populates the question to the screen and answer choices
    // get element that will hold the game form
    let questionElement = document.getElementById(elementName);
    
    let getJson = fetch("assets/data.json")
    .then(response => {
       console.log(response);
       return response.json();
    });

    var questionNumber = "q" + number;
    var questionChoices = "q" + number + "Choices"
   // add question based on questionNumber 
    getJson.then((message) => {
        let questionContent = message[questionNumber];
        let questionText = document.createTextNode(questionContent);
        questionElement.appendChild(questionText);
        for (const a of message[questionChoices]) {
            let ansButtons = document.createElement("div");
            questionElement.appendChild(ansButtons);
            ansButtons.setAttribute("id", "answerButtons");
            ansButtons.textContent = a; // iterate over mapQuestions values 
        }
        //setListeners(elementName);
    })
    .then(function(){
        setListeners(elementName,questionNumber);
    })
}

function setListeners(gameForm,qNumber) {
    console.log("running setListeners!");
    console.log(gameForm);
    let gameFormEl = document.getElementById(gameForm);
    console.log(gameFormEl);
    console.log(gameFormEl.querySelectorAll('#answerButtons'));
        gameFormEl.querySelectorAll('#answerButtons').forEach(item => {
        console.log("logged in forEach" + item);
        item.addEventListener('click', event => {
        console.log("You clicked an answer!!!");
        var answerContent = item.textContent;
        checkAnswer(answerContent,qNumber);
        // if answerContent = correctAnswer 
        console.log(answerContent);
        //check answer function
        });
    });
}

function timer(timerElement,isWin,subTime=1) {
    // function that runs the game timer
    //if answer is wrong subtract from the time
    var timerCount = 30;
    //let missedQuestion = false;
    
    timer = setInterval(function() {
        // if missed a question subtract more time otherwise just decrement by one
        if (subTime) {
            timerCount -= subTime;
        }
        else {
        timerCount--;
        }
        // set the content in the html to the timerCount value
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
          // Tests if win condition is met
          if (isWin && timerCount > 0) {
            // Clears interval and stops timer
            clearInterval(timer);
            winGame();
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
        console.log("Correct answer!!");
        //increment score
        //clear form
        //increment qNumber
        // call setQuestion
    }
    else {
        console.log("Incorrect answer");
        //subtract from timer
        // display wrong 
        // call setQuestion
    }
}


function gameOver() {
    // function that runs when the timer hits zero or after last question answered
    // display form to enter initials and call store initials and score 
    console.log("You lost!");
}

function storeScore (initials, score) {
    // function that saves initials and score
}

function storeQuestions () {
    // run on start store questions and answers in object key:value pair
    let qa = {
        "Does this work": 'yes',
        "What is the fastest land animal": "cheetah",
        "What is 2 + 2": "4"
    }
}

function runGame() {
    // load on start button click
    return true
}


export {clearContent, timer, setQuestion, setListeners};


