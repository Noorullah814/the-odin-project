const Gameboard = (function () {

    const board = ["", "", "", "", "", "", "", "", ""]

    const placeMark = (mark, index) => {
        if (board[index] != "") {
            console.log("move failed")
            return false
        }

        board[index] = mark
        return true

    }

    const getBoard = () => {

        return board
    }

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = ""
        }
    }

    return {
        placeMark,
        getBoard,
        resetBoard
    }

})()

function Player(name, mark) {
    return { name, mark }
}

const GameController = (function () {

    const playerOne = Player("Noor", "X")
    const playerTwo = Player("Yar", "O")

    let activePlayer = playerOne

    let isGameOver = false

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const switchPlayerTurn = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo
        }
        else {
            activePlayer = playerOne
        }
    }

    const checkWin = () => {
        const board = Gameboard.getBoard()
        for (let i = 0; i < winningCombinations.length; i++) {
            const combo = winningCombinations[i]
            if (board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]] && board[combo[0]] !== "") {
                return true
            }
        }

        return false
    }

    function playRound(index) {
        if (isGameOver === true) {
            return
        }
        else {

            const validMove = Gameboard.placeMark(activePlayer.mark, index)

            if (!validMove) {
                return
            }

            if (checkWin()) {
                isGameOver = true
                console.log(`${activePlayer.name} wins!`)
                return
            }
            if (!Gameboard.getBoard().includes("")) {

                isGameOver = true
                console.log("It's tie")
                return
            }


        }
        switchPlayerTurn()
    }

    const getActivePlayer = () => {
        return activePlayer
    }

    return {
        playRound,
        getActivePlayer
    }


})()

const DisplayController = (function(){
    const game_board=document.querySelector("#game-board")

    function render()
    {
        game_board.textContent = ""
       const currentBoard = Gameboard.getBoard()
        for(let i=0;i<9;i++)
        {
            const container=document.createElement("div")
            container.textContent=currentBoard[i]
            container.dataset.index=i
            container.classList.add("square")
            game_board.appendChild(container)

        }
    }

    return {
        render
    }
 
})()