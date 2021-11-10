$(document).ready(function() {

//Created an array for the quiz questions, choices, and correct answer
    const question = [{
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<scripting>", "<javascript>", "<js>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert the JavaScript?",
        choices: ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section"],
        answer: "The <body> section"
    },
    {
        title: 'What is the correct syntax for reffering to an external script called "xxx.js"?',
        choices: ['<script src="xxx.js">', '<script name="xxx.js">', '<script href="xxx.js">'],
        answer: '<script src="xxx.js">'
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

let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

//The following function will start the countdown timer once the user clicks the start button.
function start() {

    timeLeft = 60;
    $(timeLeft).innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        $(timeLeft).innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    next();
}

});
