function playGame() {
    let humanScore = 0
    let computerScore = 0
    let tieScore = 0
    let round = 0

    for (let i = 0; i < 5; i++) {

        round++
        const computer = getComputerChoice()
        const human = getHumanChoice()
        playRound(computer, human)

    }

    if (humanScore === computerScore) {
        console.log(`Match tie`)
    }
    else if (humanScore > computerScore) {
        console.log(`Human wins with score of ${humanScore}`)
    }
    else {
        console.log(`Computer wins with score of ${computerScore}`)
    }

    console.log(`Overall result:\n HumanScore:${humanScore}\n ComputerScore:${computerScore}\n TotalTie:${tieScore}`)

    function playRound(computer, human) {
        if ((human === "rock" && computer === "rock") || (human === "paper" && computer === "paper") || (human === "scissors" && computer === "scissors")) {
            tieScore++
            return console.log(`Round ${round}\nHuman: ${human}\nComputer: ${computer}\nResult: match tie`)

        }
        else if (human === "rock" && computer === "scissors") {
            humanScore++
            return console.log(`Round ${round}\nHuman: ${human}\nComputer: ${computer}\nResult: You win!`)

        }
        else if (human === "scissors" && computer === "paper") {
            humanScore++
            return console.log(`Round ${round}\nHuman: ${human}\nComputer: ${computer}\nResult: You win!`)
        }
        else if (human === "paper" && computer === "rock") {
            humanScore++
            return console.log(`Round ${round}\nHuman: ${human}\nComputer: ${computer}\nResult: You win!`)
        }
        else  {
            computerScore++
            return console.log(`Round ${round}\nHuman: ${human}\nComputer: ${computer}\nResult: You lose!`)
        }
       
    }

}

function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1

    if (randomChoice === 1) {

        return "rock"
    }
    else if (randomChoice === 2) {

        return "paper"
    }
    else {

        return "scissors"
    }

}


function getHumanChoice() {
    while (true) {
        let userChoice = prompt("Enter your choice (rock, paper, or scissors):").toLowerCase();

        if (userChoice === "rock" || userChoice === "paper" || userChoice === "scissors") {

            return userChoice;
        }
        else {

            alert("Invalid choice! Please try again.");
        }
    }
}

playGame()
