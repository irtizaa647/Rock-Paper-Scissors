// Inject CSS styles using JavaScript
const style = document.createElement('style');
style.textContent = `
      /* Happy Animation (human wins) */
    .happy-animation {
        animation: bounceResult 0.6s ease forwards;
        position: relative;
    }

    @keyframes bounceResult {
        0% { transform: translateY(0); }
        30% { transform: translateY(-15px); }
        60% { transform: translateY(5px); }
        100% { transform: translateY(0); }
    }

    .happy-animation::after {
        content: " 👑";
        font-size: 2rem;
        position: absolute;
        top: -30px;
        right: -20px;
        animation: fadeIn 1s ease;
    }

    /* Simple Sad Animation (computer wins) */
    .sad-animation {
        animation: shakeAndDim 0.5s ease forwards;
        position: relative;
    }

    @keyframes shakeAndDim {
        0% { transform: translateX(0); opacity: 1; }
        25% { transform: translateX(-5px); opacity: 0.8; }
        50% { transform: translateX(5px); opacity: 0.6; }
        75% { transform: translateX(-5px); opacity: 0.8; }
        100% { transform: translateX(0); opacity: 1; }
    }

    .sad-animation::after {
        content: " 🤖";
        font-size: 2rem;
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        animation: fadeIn 1s ease;
    }

    @keyframes fadeIn {
        0% { opacity: 0; transform: scale(0.5); }
        100% { opacity: 1; transform: scale(1); }
    }

     h1{
     font-size:45px;
}
    body {
        background-color:rgba(93, 125, 99, 0.48);
        text-align:center;
        margin-top:200px;
    }

    #rock,#paper,#scissors{
    background-color:rgb(91, 126, 138);
    border: 2px solid rgba(4, 39, 5, 0.93);
    padding:5px 15px;
    margin: 5px;
    }
    #reset {
        padding: 10px 20px;
        margin: 10px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        background-color:blue;
        background-color:rgb(194, 238, 236);

    }


    button:hover {
        background-color:rgba(176, 238, 82, 0.75);
        transform: scale(1.05);
    }

    
    

    #results {
        margin-top: 20px;
        background-color: rgba(113, 124, 104, 0.59);
        border-radius: 10px;
        box-shadow: inset 10px 10px 10px rgba(61, 60, 60, 0.78);
        width:50%;
        margin-left: auto;
        margin-right: auto; /* horizontally center the box itself */

    }

    strong {
        color:rgb(47, 98, 68);
    }
`;
document.head.appendChild(style);


const results = document.getElementById('results');
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateResults(resultText, humanChoice, computerChoice) {
    results.innerHTML = `
        <h2>Game Results</h2>
        <p>You chose: <strong>${humanChoice}</strong></p>
        <p>Computer chose: <strong>${computerChoice}</strong></p>
        <p>${resultText}</p>
        <p>Human Score: ${humanScore} | Computer Score: ${computerScore}</p>
    `;


    if (humanScore === 5 || computerScore === 5) {
        results.innerHTML += `
            <p><strong>${humanScore === 5 ? "You" : "Computer"} won the game!</strong></p>
        `;
       
        if (humanScore === 5) {
            results.classList.add('happy-animation');
        } else {
            results.classList.add('sad-animation');
        }
    
        setTimeout(() => {
            results.classList.remove('happy-animation');
            results.classList.remove('sad-animation');
        }, 1500);

        disableButtons();
    }
}

function disableButtons() {
    const buttons = document.querySelectorAll('.choice-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

['rock', 'paper', 'scissors'].forEach(choice => {
    const button = document.getElementById(choice);
    button.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        const resultText = playRound(choice, computerChoice);
        updateResults(resultText, choice, computerChoice);
    });
});

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        return `You win! ${humanChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        return `You lose! ${computerChoice} beats ${humanChoice}.`;
    }
}

// Reset button logic
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    results.innerHTML = `
        <h2>Game Results</h2>
        <p>Human Score: ${humanScore} | Computer Score: ${computerScore}</p>
        <p>Scores have been reset.</p>
        <p>Click a button to start playing!</p>
    `;
    const buttons = document.querySelectorAll('.choice-button');
    buttons.forEach(button => {
        button.disabled = false;
    });
});




