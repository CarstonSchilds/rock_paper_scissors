const startButton = document.querySelector('#start');
const roundsInput = document.querySelector('#number-of-rounds');
const buttonsDiv = document.querySelector('#buttons');
const buttons = document.querySelectorAll('#buttons > .button');
const formDiv = document.querySelector('#user-entry');
const form = document.querySelector('#user-entry > form');
const roundResults = document.querySelector('#round-results > h2');
const paraCompScore = document.querySelector('#computer-score');
const paraPlayScore = document.querySelector('#player-score');
const continueBtn = document.createElement('button');
const gameResults = document.querySelector('#game-results');
let createdButton = false;
let madeSelection = true;
let gameRounds;
let playerSelection;
let computerSelection;
let result;
let timeOut;
let playerScore;
let computerScore;
let i = 0;



startButton.addEventListener('click', checkStartConditions);

function createButton() {
   continueBtn.textContent = 'Continue';
   continueBtn.classList.add('button');
   continueBtn.id = 'continue';
   createdButton = true;
}

function playGame() {
   i = 0;
   gameResults.textContent = '';
   playerScore = 0;
   computerScore = 0;
   paraPlayScore.textContent = playerScore;
   paraCompScore.textContent = computerScore;
   removeForm();
   startTimeOut();
}

function playStart(e) {
   madeSelection = true;
   playerSelection = e.target.id;
   buttons.forEach(button => {
      button.removeEventListener('click', playStart)
   });
   endTimeOut();
   computerPlay();
}

function checkStartConditions() {
   gameRounds = parseInt(roundsInput.value);
   if(isNaN(gameRounds)) {
      alert('You didn\'t enter an integer!');
   } else {
      playGame();
   }
}

function endTheGame() {
   roundResults.textContent = '';
   addForm();
   if(playerScore == computerScore) {
      gameResults.textContent = 'Looks like no one wins this game, maybe try again?';
   } else if(playerScore > computerScore) {
      gameResults.textContent = 'Congrats! You win the game, your reward is absolutely nothing but you can play again if you want.';
   } else {
      gameResults.textContent = 'Sorry but the computer beat you in a game of luck, don\'t worry we won\'t judge you if you play again.';
   }
}

function removeForm() {
   formDiv.removeChild(form);
}

function addForm() {
   formDiv.insertBefore(form, buttonsDiv);
}

function endTimeOut() {
   clearTimeout(timeOut);
}

function startTimeOut() {
   if(i < gameRounds && madeSelection == true) {
      buttons.forEach(button => {
         button.addEventListener('click', playStart)
      });
      roundResults.textContent = 'Which will you choose...';
      playerSelection = '';
      computerSelection = '';
      result = '';
      i += 1;
      timeOut = setTimeout(queryTheUsersPresence, 20000);
   } else if (i == gameRounds) {
      endTheGame();
   } else {
      timeOut = setTimeout(queryTheUsersPresence, 20000);
   }
}

function resetTimeOut() {
   continueBtn.removeEventListener('click', startTimeOut);
   buttonsDiv.removeChild(continueBtn);
   startTimeOut();
}

function queryTheUsersPresence() {
   alert('Are you still there?');
   madeSelection = false;
   startTimeOut();
}

function prepareForNextRound() {
   if(createdButton) {
      buttonsDiv.appendChild(continueBtn);
      continueBtn.addEventListener('click', resetTimeOut);
   } else {
      createButton();
      buttonsDiv.appendChild(continueBtn);
      continueBtn.addEventListener('click', resetTimeOut);
   }
}

function displayAndCalcScores() {
   if(result == 'win') {
      playerScore += 1;
      paraPlayScore.textContent = playerScore;
      roundResults.textContent = 'Congrats! The computer picked ' + computerSelection + ' so you win this round!';
   } else if(result =='lose') {
      computerScore += 1;
      paraCompScore.textContent = computerScore;
      roundResults.textContent = 'Sorry, the computer picked ' + computerSelection + ' so you lose this round, better luck next time.';
   } else {
      roundResults.textContent = 'You both picked the same one! Nobody wins this round...';
   }
   prepareForNextRound();
}

function seeWhoWins() {
   if(playerSelection == computerSelection) {
      result = 'tie';
   } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
      result = 'win';
   } else if (playerSelection == 'rock' && computerSelection == 'paper') {
      result = 'lose';
   } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
      result = 'lose';
   } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
      result = 'win';
   } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
      result = 'lose';
   } else {
      result = 'win';
   }
   displayAndCalcScores();
}

function computerPlay() {
   randNum = Math.floor((Math.random() * 3) + 1);
   switch(randNum){
      case 1:
      computerSelection = 'rock';
      break;
      case 2:
      computerSelection = 'paper';
      break;
      case 3:
      computerSelection = 'scissors';
      break;
   }
   seeWhoWins();
}
