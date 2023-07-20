const rockPaperScissorGame = (() => {
    
    let userScore = 0;
    let machineScore = 0;
    const playerBtn = document.querySelectorAll('.player-Btn');
    const playerScore = document.querySelector('#player-score');
    const computerScore = document.querySelector('#computer-score');
    const startGameBtn = document.querySelector('#startGame-Btn');
    const restartGameBtn = document.createElement('button');

    const getComputerChoice = () => {
        const gameVals = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * gameVals.length);
        return gameVals[randomIndex];
    };

    const getUserChoice = (element) => {
        switch (element.textContent) {
            case '✊': return 'rock'; break;
            case '✋': return 'paper'; break;
            case '✌': return 'scissors'; break;
        }
    };

    const restartGame = () => {
        // open button for click
        startGameBtn.disabled = false;
        userScore = 0;
        machineScore = 0;
        playerScore.textContent = `playerScore: ${userScore}`;
        computerScore.textContent = `machineScore: ${machineScore}`;
        document.body.removeChild(restartGameBtn);
    };

    const togglePlayerButtons = (playerBtn, value) => {
        playerBtn.forEach((btn) => { btn.disabled = value; });
    };

    const playRound = (e) => {
        e.stopPropagation();
        const outcomes = {
            rock: {
                rock: 'Computer choosed rock, it is a Tie!',
                paper: 'You lose, paper beats rock',
                scissors: 'You won, rock beats scissors'
            },
            paper: {
                rock: 'You won, paper beats rock',
                paper: 'Computer choosed paper, it is a Tie!',
                scissors: 'You lose, scissors beats paper'
            },
            scissors: {
                rock: 'You lose, rock beats scissors',
                paper: 'You won, paper beats scissors',
                scissors: 'Computer choosed scissors, it is a Tie!'
            }
        };

        const computerChoice = getComputerChoice().toLowerCase();
        const userChoice = getUserChoice(e.target);

        if (outcomes[userChoice][computerChoice].includes('won')) {
            playerScore.textContent = `playerScore: ${++userScore}`;
        }
        else if (outcomes[userChoice][computerChoice].includes('lose')) {
            computerScore.textContent = `computerScore: ${++machineScore}`
        }

        // elimination condition, could be dynamic change if u want to
        if (userScore + machineScore >= 5) {
            togglePlayerButtons(playerBtn, true);
            restartGameBtn.textContent = 'Restart Game';
            restartGameBtn.setAttribute('style','font-size: 2rem;');
            document.body.appendChild(restartGameBtn);
        }
    };

    const game = () => {
        startGameBtn.disabled = true;
        // opening player button to capture click
        togglePlayerButtons(playerBtn, false);

        playerBtn.forEach((button) => {
            button.addEventListener('click', playRound);
        });

    };

    const init = () => {
        startGameBtn.addEventListener('click', game);
        restartGameBtn.addEventListener('click', restartGame);
    };

    return {
        init: init,
    }
})();

// intializing game
rockPaperScissorGame.init();
