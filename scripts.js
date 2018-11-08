const startButton = document.querySelector('#start');
const roundsInput = document.querySelector('#number-of-rounds');
const buttonsDiv = document.querySelector('#buttons');
const buttons = document.querySelectorAll('#buttons > .button');
const formDiv = document.querySelector('#user-entry');
const form = document.querySelector('#user-entry > form');
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

function playGame() {
   i = 0;
   playerScore = 0;
   computerScore = 0;
   removeForm();
   buttons.forEach(button => {
      button.addEventListener('click', playStart)
   });
   
   startTimeOut();
}

function playStart(e) {
   madeSelection = true;
   playerSelection = e.target.id;
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

function queryTheUsersPresence() {
   alert('Are you still there?');
   madeSelection = false;
   startTimeOut();
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
}

function computerPlay() {
   randNum = Math.floor((Math.random() * 3) + 1);
   switch(randNum){
      case 1:
      computerSelection = 'rock';

      case 2:
      computerSelection = 'paper';

      case 3:
      computerSelection = 'scissors';
   }
   seeWhoWins();
}
