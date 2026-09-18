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


    const setPlayerName=(name1,name2)=>{
        playerOne.name=name1 || "Player1"
        playerTwo.name=name2 || "Player2"

    }
    const playerOne = Player("Noor", "X")
    const playerTwo = Player("Yar", "O")

    let activePlayer = playerOne

    let isGameOver = false
    let resultMessage = ""

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
                resultMessage = `${activePlayer.name} wins!`
                return
            }
            if (!Gameboard.getBoard().includes("")) {

                isGameOver = true
                resultMessage = "It's tie"
                return
            }


        }
        switchPlayerTurn()
    }

    const getActivePlayer = () => {
        return activePlayer
    }

    const getMessage = () => {
        return resultMessage
    }

    const restartGame = () => {
        Gameboard.resetBoard()
        activePlayer = playerOne
        resultMessage = ""
        isGameOver = false
    }

    return {
        setPlayerName,
        playRound,
        getActivePlayer,
        getMessage,
        restartGame
    }


})()

const DisplayController = (function () {
    const game_board = document.querySelector("#game-board")
    const displayStatus = document.querySelector("#status-display")
    const restartBtn = document.querySelector("#restart-btn")
    const player1=document.querySelector("#player-one")
    const player2=document.querySelector("#player-two")

    function render() {
        game_board.textContent = ""
        const currentBoard = Gameboard.getBoard()
        for (let i = 0; i < 9; i++) {
            const container = document.createElement("div")
            container.textContent = currentBoard[i]
            container.dataset.index = i
            container.classList.add("square")
            game_board.appendChild(container)

        }
        const message = GameController.getMessage();

        if (message !== "") {
            displayStatus.textContent = message;
        }
        else {
            displayStatus.textContent = `${GameController.getActivePlayer().name}'s turn!`;
        }
    }

    const handleBoardClick = (e) => {
        if (!e.target.classList.contains("square")) {
            return
        }
        const index = e.target.dataset.index
        GameController.playRound(parseInt(index))

        render()
    }
    game_board.addEventListener("click", handleBoardClick)

    restartBtn.addEventListener("click", () => {
        GameController.restartGame()
        render()
    })

   player1.addEventListener("input", () => {
        GameController.setPlayerName(player1.value, player2.value)
        render()
    })

    player2.addEventListener("input", () => {
        GameController.setPlayerName(player1.value, player2.value)
        render()
    })

    return {
        render
    }

})()

DisplayController.render()