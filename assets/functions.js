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
    let questionContent = data[qNumber];
    let questionText = document.createElement('h3');
    let questionContainer = document.createElement('div');
    let questionChoices = qNumber + "Choices";
    let separateButtons = document.createElement("br");
    //questionContainer.setAttribute('id', "questionContainer");
    questionContainer.setAttribute('class', "d-grid gap-2");
    questionText.textContent = questionContent;

    elementName.appendChild(questionText);
    elementName.appendChild(questionContainer);
    //elementName.appendChild(separateButtons);
    
    for (const a of data[questionChoices]) {
        let questionContainEl = document.getElementById("questionContainer");
        let ansButtons = document.createElement("p");
        elementName.appendChild(questionContainer);
        questionContainer.appendChild(ansButtons);
        ansButtons.setAttribute("class", "btn btn-primary");
        //ansButtons.setAttribute("id", "answerButtons");
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

function displayResult(elementID, isCorrect) {
    // Function creates html element to display if the answer was correct or wrong to the screen
    let pText;
    let questionStatus = document.createElement("p");
    console.log(isCorrect);
    if (isCorrect) {
        pText = "Correct Answer!!";
    }
    else {
        pText = "Wrong Answer!!";
    }
    questionStatus.textContent = pText;
    console.log(questionStatus);
    elementID.appendChild(questionStatus);
}

function gameOver(elementID) {
    // function that runs when the timer hits zero or after last question answered
    console.log("Game Over !");
    clearContent(elementID);
    // create end game html elements
    let endTitle = document.createElement('h3');
    let initialsForm = document.createElement('div');
    let formInput = document.createElement('input');
    let formLabel = document.createElement('span');
    let scorePageButton = document.createElement('button');
    endTitle.textContent = "Congrats you have completed the questions !";
    formLabel.textContent = "Please input your initials";
    scorePageButton.textContent = "Submit";
    elementID.appendChild(endTitle);
    elementID.appendChild(initialsForm);
    initialsForm.appendChild(formLabel);
    initialsForm.appendChild(formInput);
    elementID.appendChild(scorePageButton);
    scorePageButton.setAttribute("class", "btn btn-primary");
    initialsForm.setAttribute("class", "input-group mb-3")
    formLabel.setAttribute("class", "input-group-text");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("id", "initialInput");
    // set listener for submit button
    scorePageButton.addEventListener('click', function () {
        var gameFormEl = document.getElementById('gameForm');
        clearContent(gameFormEl);
        displayScorePage(gameFormEl);
    },{once: true}); //the once: true may not work with all browsers 
}

function displayScorePage(element) {
    console.log('logged from displayScorePage');
    let scoreTitle = document.createElement('h1');
    scoreTitle.textContent = "SCORE";
    scoreTitle.setAttribute("id", "scoreTitle");
    element.appendChild(scoreTitle);
    getScore('aaa');
}


function storeScore (initials, score) {
    // function that saves initials and score
    localStorage.setItem(initials, score);
}
function getScore (initials) {
    // function that gets initials and score
    let userScore = localStorage.getItem(initials, score);
    console.log(userScore);
    // guard clause ?
    return userScore
}

export {clearContent, displayResult, gameOver, setQuestion, 
    storeScore,getScore,newSetQuestion,newSetListeners,checkAnswer, getQuestions};


