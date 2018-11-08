const startButton = document.querySelector('#start');
const roundsInput = document.querySelector('#number-of-rounds');
const buttons = document.querySelectorAll('#buttons > .button');
let gameRounds;
let playerSelection;
let computerSelection;
let timeOut;

startButton.addEventListener('click', checkStartConditions);

function playGame(rounds) {
   for(let i = 0; i < rounds; i++){
      playerSelection = '';
      computerSelection = '';
      buttons.forEach(button => {
         button.addEventListener('click', playStart)
      });

      startTimeOut();
   }
}

function playStart(e) {
   playerSelection = e.target.id;
   computerPlay();
}

function checkStartConditions() {
   gameRounds = parseInt(roundsInput.value);
   if(isNaN(gameRounds)) {
      alert('You didn\'t enter an integer!');
   } else {
      playGame(gameRounds);
   }
}

function endTimeOut() {
   clearTimeout(timeOut);
}

function startTimeOut() {
   timeOut = setTimeout(queryTheUsersPresence, 20000);
}

function queryTheUsersPresence() {
   alert('Are you still there?');
   startTimeOut();
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
}
