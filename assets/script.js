// Created an array for the quiz questions, choices, and correct answer
const questions = [{
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

// start function
function start() {
    // time will start off at 100s
    timeLeft = 100;
    // we'll get the timeLeft id from index and set it to timeLeft
    document.getElementById("timeLeft").innerHTML = timeLeft;
    // we'll create our timer function using setInterval for every second
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        // if time left is less than zero clearInterval in timer and end game
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
        // delay set at 1000ms=1sec
    }, 1000);
    // then next function will run
    next();
}

//end game function
function endGame() {
    // cancels timed, repeating action that was previously called by setInterval
    clearInterval(timer);
    // following jsx will be rendered in the #quizBody set to quizContent
    // finalscore out of 100 is displayed along
    // input field create, user can then submit their name, and save their score
    const quizContent = `
    <h2>Game over!</h2>
    <h3>You got ${score}/100!</h3>
    <input type="text" id="name" placeholder="Your name!">
    <button onclick="setScore()">Set score!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;
}

// setScore function
function setScore() {
    // localStorage setItems with key value pairs
    // highscore being the score
    // highscoreName being the users input name
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}
// getScore function
function getScore() {
    const highscoreName = localStorage.getItem("highscoreName");
    const highscore = localStorage.getItem("highscore");
  
    const quizContent = `
      <h2>${highscoreName}'s highscore is:</h2>
      <h1>${highscore}</h1><br>
      <button onclick="clearScore()">Clear score!</button>
      <button onclick="resetGame()">Play Again!</button>
    `;
  
    document.getElementById("quizBody").innerHTML = quizContent;
  }

//creates function to clear score, used in quizContent JSX above
function clearScore() {
    // clearScore will set the value pairs to empty strings
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    resetGame();
}

// This function will reset the quiz to its initial state
function resetGame() {
    // clearInterval function called
    clearInterval(timer);
    // score is set to 0
    score = 0;
    // current questions is set back to the first on in our array
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    // resetGame will create JSX copy of our original HTML and display it when called
    const quizContent = `
    <h1>
        JavaScript Quiz
    </h1>
    <h3>
        Click the button below to begin~
    </h3>
    <button onclick="start()">Let's Go!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;
}

// incorrect function will deduct 15 seconds if the user chooses the incorrect answer
function incorrect() {
    timeLeft -= 15;
    next();
}

// correct function adds 20 points for every correct answer
function correct() {
    score += 20;
    next();
}

// next function allows us to go onto the next question
function next() {
    currentQuestion++;
    if (currentQuestion > questions.length - 1) {
      endGame();
      return;
    }
    const { title, choices, answer } = questions[currentQuestion];
    const quizContent = `
      <h2>${title}</h2>
      ${choices.map((choice) => {
        const isCorrect = choice === answer;
        return `<button onclick="${isCorrect ? 'correct()' : 'incorrect()'}">${choice}</button>`;
      }).join('')}
    `;
    document.getElementById("quizBody").innerHTML = quizContent;
  }
