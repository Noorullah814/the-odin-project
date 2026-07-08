
const container=document.querySelector(".action-container")
const currentRound=document.querySelector(".current-round")

const scoreBoard=document.querySelector(".scoreboard")
const humanScore=document.createElement('p').textContent="0"
const computerScore=document.createElement('p').textContent="0"
const tie=document.createElement('p').textContent="0"
const round=document.createElement('p')


    container.addEventListener("click",(event)=>{

    const button = event.target.closest('button')

    if (!button) return; 
         
        
        const action = button.className;
        let computerChoice=getComputerChoice()
       playRound(computerChoice,action)
        
       round.textContent+=`${action}`
  
})



function playRound(computer, human) {
          
            let youChoose=document.createElement('p')
            let computerChoose=document.createElement('p')
            let result=document.createElement('p')

            youChoose.textContent=`You choose: ${human}`
            computerChoose.textContent=`Computer Chose: ${computer}`
            
           
   
        if ((human === "rock" && computer === "rock") || (human === "paper" && computer === "paper") || (human === "scissors" && computer === "scissors")) {
           result.textContent="Result: Match tie"
        }
        else if ((human === "rock" && computer === "scissors")||(human === "scissors" && computer === "paper")||(human === "paper" && computer === "rock")) {
            result.textContent="Result: You win!"
        }
        else  {
            result.textContent="Result: You lose!"
        }

         currentRound.innerHTML=''

         currentRound.appendChild(youChoose)
         currentRound.appendChild(computerChoose)
         currentRound.appendChild(result) 
         currentRound.appendChild(round)
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


// function playGame() {
     

//     for (let i = 0; i < 5; i++) {
//         playRound(computer, human)
//     }

//     if (humanScore === computerScore) {
//         console.log(`Match tie`)
//     }
//     else if (humanScore > computerScore) {
//         console.log(`Human wins with score of ${humanScore}`)
//     }
//     else {
//         console.log(`Computer wins with score of ${computerScore}`)
//     }

//     console.log(`Overall result:\n HumanScore:${humanScore}\n ComputerScore:${computerScore}\n TotalTie:${tieScore}`)


// }







