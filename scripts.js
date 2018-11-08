const startButton = document.querySelector('#start');
const roundsInput = document.querySelector('#number-of-rounds');
let gameRounds;

startButton.addEventListener('click', checkStartConditions);

function checkStartConditions() {
   gameRounds = parseInt(roundsInput.value);
   if(isNaN(gameRounds)) {
      alert('You didn\'t enter an integer!');
   } else {
      playGame(gameRounds);
   }
}


function computerPlay() {
   randNum = Math.floor((Math.random() * 3) + 1);
   switch(randNum){
      case 1:
      return 'rock';

      case 2:
      return 'paper';

      case 3:
      return 'scissors';
   }
}
