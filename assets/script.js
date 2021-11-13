// Created an array for the quiz questions, choices, and correct answer
let questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "scripting", "javascript", "js"],
    answer: "script"
    },
    {
    title: "Where is the correct place to insert the JavaScript?",
    choices: ["Both the head section and the body section are correct", "The head section", "The body section"],
    answer: "The body section"
    },
    {
    title: 'What is the correct syntax for reffering to an external script called "xxx.js"?',
    choices: ['script src="xxx.js"', 'script name="xxx.js"', 'script href="xxx.js"'],
    answer: 'script src="xxx.js"'
    },
    {
    title: "How does a FOR loop start?",
    choices: ["for i = 1 to 5", "for (i <= 5; i++)", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)"
    },
    {
    title: "JavaScript is the same as Java?",
    choices: ["True", "False"],
    answer: "False"
    },
]

// Set variables with starting values
let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
//proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

//stop the timer to end the game
function endGame() {
    clearInterval(timer);

    let quizContent = `
    <h2>Game over!</h2>
    <h3>You got ` + score +  `/100!</h3>
    <input type="text" id="name" placeholder="Your name!">
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// Stores scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    let quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>

    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

// This function will reset the quiz to its initial state
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz
    </h1>
    <h3>
        Click the button below to begin~
    </h3>
    <button onclick="start()">Let's Go!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// This function will deduct 15 seconds if the user chooses the incorrect answer
function incorrect() {
    timeLeft -= 15;
    next();
}

// This function will deduct 15 seconds if the user chooses the incorrect answer
function correct() {
    score += 20;
    next();
}

// This function will loop through all questions
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}
