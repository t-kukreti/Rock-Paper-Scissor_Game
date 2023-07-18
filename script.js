
let userScore = 0;
let computerScore = 0;
function getComputerChoice(){
    const gameVals = ['Rock','Paper','Scissors'];
   const randomIndex = Math.floor(Math.random()*gameVals.length);
   return gameVals[randomIndex];
}

function playRound(){
    // key-value pair to avoid writing so many if else
    const outcomes = {
        rock: {
            rock: 'Tie',
            paper: 'You Lose! paper beats rock',
            scissors: 'You Won! rock beats scissors'
        },
        paper: {
            rock: 'You Won! paper beats rock',
            paper: 'Tie',
            scissors: 'You Lose! scissors beats paper'
        },
        scissors: {
            rock: 'You Lose! rock beats scissors',
            paper: 'You Won! paper beats scissors',
            scissors: 'Tie'
        }
    };

    const userSelection = prompt('Rock, Paper or Scissors').toLowerCase();
    const computerSelection = getComputerChoice().toLowerCase();

    if(userSelection === ''){
        return `Don't leave the field empty`;
    }
    if(!outcomes[userSelection]){
        return `Insert correct value in the field`;
    }

    const result = outcomes[userSelection][computerSelection];
    if(result.includes('Won')){
        userScore++;
    }
    else if(result.includes('Lose')){
        computerScore ++;
    }
    return result;

}
function game(){
    while((userScore + computerScore) < 5){
        let ans = playRound();
        console.log(ans);
        console.log(displayScores(userScore,computerScore));
    }
    if(userScore > computerScore){
        console.log('You Won!');
    }
    else if(userScore === computerScore){
        console.log(`It's a tie`);
    }
    else{
        console.log('You lose!');
    }
}
function displayScores(userScore,computerScore){
    return `userScore: ${userScore} computerScore: ${computerScore}`;
}

game();