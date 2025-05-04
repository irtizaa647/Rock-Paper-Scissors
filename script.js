function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getHumanChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    let humanChoice = prompt("Enter your choice (rock, paper, scissors):").toLowerCase();
    while (!choices.includes(humanChoice)) {
        alert("Invalid choice. Please enter rock, paper, or scissors.");
        humanChoice = prompt("Enter your choice (rock, paper, scissors):").toLowerCase();
    }
    return humanChoice;
}


// Function to determine the winner of the game
let humanScore = 0;
let computerScore = 0;
// declare a function to play a round of rock-paper-scissors
function playRound(humanChoice,computerChoice) {
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

// Now actually play one round
let humanChoice = getHumanChoice();
let computerChoice = getComputerChoice();

let result = playRound(humanChoice, computerChoice);
alert(result);

console.log(`Human Score: ${humanScore}`);
console.log(`Computer Score: ${computerScore}`);


