
const container = document.querySelector(".action-container")
const currentRound = document.querySelector(".current-round")

const scoreBoard = document.querySelector(".scoreboard")
const humanResult = document.createElement('p')

const computerResult = document.createElement('p')
const tieResult = document.createElement('p')
const roundResult = document.createElement('p')

let humanScore = 0
let computerScore = 0
let tieScore = 0
let round = 0

const finalResult = document.querySelector(".final-result")
const finalMsg = document.createElement('p')
const winner = document.createElement('p')
const finalScore = document.createElement('p')
const playAgain = document.createElement('button')


container.addEventListener("click", (event) => {

    const button = event.target.closest('button')

    if (!button) return;

    const action = button.className;

    if (round < 5) {
        const computerChoice = getComputerChoice()
        playRound(computerChoice, action)

    }

    if (round == 5) {
        const buttons = document.querySelectorAll(".action-container button")

        buttons.forEach(button => {
            button.disabled = true;
        })

        finalMsg.textContent = "Game Over"

        if (humanScore > computerScore) {
            winner.textContent = "Winner is Human"
            finalScore.textContent = `HumanScore: ${humanScore}  ComputerScore: ${computerScore}`
        }
        else if (humanScore == computerScore) {
            winner.textContent = "Game tie"
            finalScore.textContent = `HumanScore: ${humanScore} ComputerScore: ${computerScore}`
        }
        else {
            winner.textContent = "Winner is computer"
            finalScore.textContent = `HumanScore: ${humanScore} ComputerScore: ${computerScore}`
        }

        playAgain.textContent = "Play Again"
        playAgain.addEventListener("click", () => {

            actionPlayAgian()
        })

        displayFinalResult()
    }

    displayScoreBoard()

})

function playRound(computer, human) {

    let youChoose = document.createElement('p')
    let computerChoose = document.createElement('p')
    let result = document.createElement('p')

    youChoose.textContent = `You choose: ${human}`
    computerChoose.textContent = `Computer Chose: ${computer}`
    round++
    roundResult.textContent = `Round: ${round}`


    if ((human === "rock" && computer === "rock") || (human === "paper" && computer === "paper") || (human === "scissors" && computer === "scissors")) {
        result.textContent = "Result: Match tie"
        tieScore++
        tieResult.textContent = `Tie: ${tieScore}`
    }
    else if ((human === "rock" && computer === "scissors") || (human === "scissors" && computer === "paper") || (human === "paper" && computer === "rock")) {
        result.textContent = "Result: You win!"
        humanScore++
        humanResult.textContent = `Human: ${humanScore}`
    }
    else {
        result.textContent = "Result: You lose!"
        computerScore++
        computerResult.textContent = `Computer: ${computerScore}`
    }

    currentRound.innerHTML = ''

    currentRound.appendChild(youChoose)
    currentRound.appendChild(computerChoose)
    currentRound.appendChild(result)

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

function displayScoreBoard() {
    scoreBoard.appendChild(roundResult)
    scoreBoard.appendChild(humanResult)
    scoreBoard.appendChild(computerResult)
    scoreBoard.appendChild(tieResult)

}


function displayFinalResult() {

    finalResult.appendChild(finalMsg)
    finalResult.appendChild(winner)
    finalResult.appendChild(finalScore)
    finalResult.appendChild(playAgain)

}


function actionPlayAgian() {
    humanScore = 0
    computerScore = 0
    round = 0
    tieScore = 0

    currentRound.innerHTML = ''
    scoreBoard.innerHTML = ''
    finalResult.innerHTML = ''

    const buttons = document.querySelectorAll(".action-container button")

    buttons.forEach(button => {
        button.disabled = false;
    })

}





