const rockPaperScissorGame = (() => {
    let userScore = 0;
    let machineScore = 0;
    let userName = '';
    const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/11');
    const textBox = document.querySelector('#textBox');
    const finalResult = document.querySelector('#finalResult');
    const playerName = document.querySelector('#playerName');
    const playerBtn = document.querySelectorAll('.player-Btn');
    const computerBtn = document.querySelectorAll('.pc-player-Btn');
    const playerScore = document.querySelector('#player-score');
    const computerScore = document.querySelector('#computer-score');
    const startGameBtn = document.querySelector('.Game-Btn'); // same class name as restart button check later for bugs
    const restartGameBtn = document.createElement('button');

    const displayMessageIfPcButtonClicked = ()=>{
        alert(`apne dabe mai khel le bro (don't click pc butons)`);
    };

    const getComputerChoice = () => {
        const gameVals = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * gameVals.length);
        return{
            gameVals,  
            randomIndex
        }
    };

    const getPlayerName = ()=>{
        // make this only return a valid name, it should just contain a character.
        let name='';
        while(!(name)){
            name = prompt('whats your name');
        }
        return name;
    };

    const getUserChoice = (element) => {
        switch (element.textContent) {
            case '✊': return 'rock'; break;
            case '✋': return 'paper'; break;
            case '✌': return 'scissors'; break;
        }
    };
    const playAudio = () => {
        audio.play();
    };

    const restartGame = () => {
        // open button for click
        startGameBtn.disabled = false;
        userScore = 0;
        machineScore = 0;
        textBox.textContent = '';
        finalResult.textContent = '';
        playerScore.textContent = `${userName}: ${userScore}`;
        computerScore.textContent = `Pc: ${machineScore}`;
        // removing color classes which were used to add colors to button, on clicking.
        resetColorClasses(computerBtn);
        resetColorClasses(playerBtn);
        //remove restart button
        document.querySelector('footer').removeChild(restartGameBtn);
        // show start button
        startGameBtn.classList.remove('hide');
    };

    const togglePlayerButtons = (playerBtn, value) => {
        playerBtn.forEach((btn) => { btn.disabled = value; });
    };

    const addNonexistentClass = (NodeList, nameOfClass, placeToadd) => {
        NodeList.forEach((node)=>{
            if(node.classList.contains(nameOfClass)){
                node.classList.remove(nameOfClass);
            }
        });
        placeToadd.classList.add(nameOfClass);
    };

    const resetColorClasses = (NodeList)=>{
        // not added strict conditions as there were no extra class apart from color ones.
        NodeList.forEach((element)=>{
            element.removeAttribute('class');
        });
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
        const compIndex = getComputerChoice().randomIndex;
        const computerChoice = getComputerChoice().gameVals[compIndex].toLowerCase();
        const userChoice = getUserChoice(e.target);

        // added beep sound on clicking the button
        playAudio();

        addNonexistentClass(playerBtn,'yellowColor',e.target);
        addNonexistentClass(computerBtn,'redColor',computerBtn[compIndex]);


        if (outcomes[userChoice][computerChoice].includes('won')) {
            textBox.textContent = outcomes[userChoice][computerChoice];
            playerScore.textContent = `${userName}: ${++userScore}`;
        }
        else if (outcomes[userChoice][computerChoice].includes('lose')) {
            textBox.textContent = outcomes[userChoice][computerChoice];
            computerScore.textContent = `Pc: ${++machineScore}`
        }
        else if(outcomes[userChoice][computerChoice].includes('Tie')){
            textBox.textContent = outcomes[userChoice][computerChoice];
        }

        // elimination condition, could be dynamic change if u want to, make a function for this.
        if (userScore + machineScore >= 5) {
            togglePlayerButtons(playerBtn, true);
            restartGameBtn.textContent = 'Restart Game';
            restartGameBtn.className = 'Game-Btn';
            restartGameBtn.setAttribute('style','color: red; background-color: #4e4343;');
            document.querySelector('footer').appendChild(restartGameBtn);
            if(userScore > machineScore){
                finalResult.style.color = 'green';
                finalResult.textContent = `Ultimately ${userName} won the series of 5 game! congratulations`;
            }
            else{
                finalResult.style.color = 'red';
                finalResult.textContent = `Alas ${userName} lose the series of 5 game, but you can surely beat it next time!`;
            }
        }
    };

    const game = () => {

        startGameBtn.disabled = true;
        startGameBtn.classList.add('hide'); 
        // opening player button to capture click
        togglePlayerButtons(playerBtn, false);
        playerBtn.forEach((button) => {
            button.addEventListener('click', playRound);
        });
        computerBtn.forEach((btn)=>{btn.addEventListener('click',displayMessageIfPcButtonClicked)});
    };

    const init = () => {
        document.addEventListener('DOMContentLoaded',()=>{
            userName = getPlayerName();
            playerName.textContent = userName;
            playerScore.textContent = userName;
        });
        startGameBtn.addEventListener('click', game);
        restartGameBtn.addEventListener('click', restartGame);
    };

    return {
        init: init,
    }
})();

// intializing game
rockPaperScissorGame.init();
