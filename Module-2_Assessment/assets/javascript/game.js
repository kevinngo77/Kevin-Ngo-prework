const wordBank = [
  "rappel",
  "anchor",
  "approach",
  "arete",
  "autolock",
  "barndoor",
  "belay",
  "belayer",
  "beta",
  "bolt",
  "bouldering",
  "carabiner",
  "chalk",
  "chimney",
  "clean",
  "crag",
  "crux",
  "dyno",
  "edging",
  "jamming",
  "flash",
  "harness",
  "holds",
  "hook",
  "jug",
  "layback",
  "lead",
  "mantel",
  "nut",
  "overhang",
  "pitch",
  "pinch",
  "crimp",
  "sloper",
  "smear",
  "send",
  "undercling",
  "crack",
  "wall"
];

let startRef = document.querySelector("#start");
let gameOver = document.querySelector("#gameOver");
let randomNumber = Math.floor(Math.random() * wordBank.length);
let randomWord = wordBank[randomNumber];
let wordSplit = randomWord.split("");
let attempts = randomWord.length + 5;
let lettersGuessed = [];
let blanks = [];
let winCount = 0;
let winText = document.querySelector("#winText");
let guessText = document.querySelector("#guessText");
let questword = document.querySelector("#question");
let guessesRef = document.querySelector("#guesses");
let remaining = document.querySelector("#guessNumber");
let winNumber = document.querySelector("#winCount");
let isGameStarted = false;

const generateWord = function() {
  randomNumber = Math.floor(Math.random() * wordBank.length);
  randomWord = wordBank[randomNumber];
  wordSplit = randomWord.split("");
  attempts = randomWord.length + 5;
  remaining.innerText = attempts;
  winNumber.innerText = winCount;
  winText.innerText = "Wins";
  guessText.innerText = "# of guesses left";
};

const startGame = function(event) {
  if (!!event.key == true) {
    resetScreen();
    startRef.innerText = "";
    gameOver.innerText = "";
    isGameStarted = true;
    generateWord();
    showHint();
  }
};

document.addEventListener("keyup", function(event) {
  if (isGameStarted) {
    checkGuess(event);
  } else {
    startGame(event);
  }
});

const showHint = function() {
  for (let i = 0; i < randomWord.length; i++) {
    blanks.push("_");
  }
  questword.innerText = blanks;
  questword.innerText = blanks.join("  ");
};

const checkGuess = function(event, callback) {
  if (event.key.match(/^[a-zA-Z]$/)) {
    if (
      !wordSplit.includes(event.key.toLowerCase()) &&
      !lettersGuessed.includes(event.key.toLowerCase())
    ) {
      attempts = attempts - 1;
      lettersGuessed.push(event.key.toLowerCase());
      guessesRef.innerText = lettersGuessed;
      guessesRef.innerText = lettersGuessed.join("  ");
      remaining.innerText = attempts;
      loseGame();
    } else {
      for (let i = 0; i < wordSplit.length; i++) {
        if (event.key.toLowerCase() === wordSplit[i]) {
          blanks[i] = event.key.toLowerCase();
          questword.innerText = blanks;
          questword.innerText = blanks.join("  ");
          winGame();
        }
      }
    }
  }
};

const winGame = function() {
  if (blanks.join() === wordSplit.join()) {
    winCount = winCount + 1;
    winNumber.innerText = winCount;
    isGameStarted = false;
    gameOver.innerText = `You win! Press any key to continue playing`;
    new Audio("assets/images/victory.mp3").play();
  }
};

const loseGame = function() {
  if (attempts == 0) {
    isGameStarted = false;
    gameOver.innerText = `The word was ${randomWord}. Press any key to continue playing`;
  }
};

const resetScreen = function() {
  blanks = [];
  lettersGuessed = [];
  questword.innerText = blanks;
  questword.innerText = blanks.join("  ");
  guessesRef.innerText = lettersGuessed;
  guessesRef.innerText = lettersGuessed.join("  ");
};
