
function clearContent(elementID) {
    // clears all elements within elementID argument
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
        ansButtons.textContent = a; 
    }
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
    elementID.appendChild(questionStatus);
}

function gameOver(elementID) {
    // function that runs when the timer hits zero or after last question answered
    clearContent(elementID);
    // create end game html elements
    let gameForm = document.createElement('div')
    let endTitle = document.createElement('h3');
    let initialsForm = document.createElement('div');
    let formInput = document.createElement('input');
    let formLabel = document.createElement('span');
    let scorePageButton = document.createElement('button');
    endTitle.textContent = "Congrats you have completed the questions !";
    formLabel.textContent = "Please input your initials";
    scorePageButton.textContent = "Submit";
    gameForm.setAttribute("id", "gameForm");
    scorePageButton.setAttribute("class", "shadow-sm btn btn-primary");
    initialsForm.setAttribute("class", "input-group mb-3")
    formLabel.setAttribute("class", "input-group-text");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("id", "initialInput");
    elementID.appendChild(gameForm);
    gameForm.appendChild(endTitle);
    gameForm.appendChild(initialsForm);
    initialsForm.appendChild(formLabel);
    initialsForm.appendChild(formInput);
    gameForm.appendChild(scorePageButton);

    //formInput.addEventListener('focus', function(event) {
     //   event.preventDefault();
      //  let text = formInput.value;
      //  if (text.length > 0 && text.length == 3) {
      //  let finalScore = localStorage.getItem('currentScore');
      //  localStorage.clear();
      //  storeFinalScore(text, finalScore);
      //  console.log('Your initials are ' + text);
      //  }
   // })
    // set listener for submit button
    scorePageButton.addEventListener('click', function () {
        var gameFormEl = document.getElementById('gameForm');
        var inputVal = document.getElementById("initialInput").value;
        let finalScore = localStorage.getItem('currentScore');
        storeFinalScore(inputVal, finalScore);
        clearContent(gameFormEl);
        displayScorePage(gameFormEl);
    },{once: true}); //the once: true may not work with all browsers 
}

function getInitials (inputValue) {
    console.log(inputValue)
}

function displayScorePage(element) {
    
    console.log('logged from displayScorePage');
    let scoreTitle = document.createElement('h1');
    let userScore = document.createElement('p');
    let scoreContainer = document.createElement('div');

    scoreTitle.textContent = "HIGH SCORES";
    scoreTitle.setAttribute("id", "scoreTitle");
    scoreContainer.setAttribute("class", "scoreParent");
    element.appendChild(scoreTitle);
    element.appendChild(scoreContainer);
    let allScores = getScore();
            for (const i in allScores) {
                let scoreName = document.createElement('div');
                let scoreValue = document.createElement('div');
                scoreName.setAttribute('class', 'scoreChild');
                scoreValue.setAttribute('class', 'scoreChild');
                console.log(i);
                for (const j in allScores[i]){
                    let scoreKey = j;
                    if (scoreKey === "currentScore") {
                        scoreKey = '';
                    }
                    let scoreValue = allScores[i][j];
                    console.log(typeof(scoreValue));
                    scoreName.textContent = scoreKey;
                    scoreContainer.appendChild(scoreName);
                    scoreValue.textContent = scoreValue;
                    scoreValue.appendChild(scoreValue);

                }
            }
    let testing = [...allScores];
    //console.log(testing);
    //console.log(allScores)
}

function clearScores () {
    localStorage.clear();
}

function storeFinalScore(initials, score) {
    localStorage.setItem(initials, score);
}


function storeScore (score) {
    // function that saves initials and score
    localStorage.setItem('currentScore', score);
    console.log(localStorage)
}

function getScore () {
    // function that gets initials and score
    let testData = localStorage;
    // get all localstorage keys
    const scoreKeys = Object.keys(testData);
    const scoreValues = Object.values(testData);
    const allScores = [];
    for (let i=0; i<scoreKeys.length; i++) {
        console.log(scoreKeys[i]);
        var keys = scoreKeys[i];
        var getValues = localStorage.getItem(keys);
        let allUserScore = {[keys]: getValues};
        allScores.push(allUserScore);
    }
    return allScores
}


export {clearContent, displayResult, gameOver, 
    storeScore,getScore,newSetQuestion,newSetListeners,checkAnswer, getQuestions};


