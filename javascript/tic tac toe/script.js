const Gameboard = (function () {

    const board = ["", "", "", "", "", "", "", "", ""]

    const placeMark = (mark, index) => {
        if (board[index] != "") {
            console.log("move failed")
            return
        }

        board[index] = mark

    }

    const getBoard = () => {

        return board
    }

    const resetBoard=()=>{
        for(let i=0;i<9;i++)
        {
            board[i]=""
        }
    }

    return {
        placeMark,
        getBoard,
        resetBoard
    }

})()