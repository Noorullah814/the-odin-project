const gridContainer = document.querySelector(".grid-container")
const gridBtn = document.querySelector(".grid-btn")

gridBtn.addEventListener('click', () => {

    const input = prompt('Enter grid size (max 100)')
    if (input === null) return

    let gridSize = Number(input)
    if ((gridSize < 1) || (gridSize > 100) || (isNaN(gridSize))) {
        alert("Please enter a number between 1 and 100.")
    }
    else {
        createGrid(gridSize)

    }


})

function createGrid(gridSize) {

    const totalSize = gridSize ** 2
    const containerSize = gridContainer.clientWidth

    gridContainer.innerHTML = ""
    for (let i = 0; i < totalSize; i++) {
        const cell = document.createElement('div')

        cell.classList.add("dynamic-cell")



        const cellSize = containerSize / gridSize

        cell.style.width = `${cellSize}px`
        cell.style.height = `${cellSize}px`

        cell.dataset.hoverCount = "0"

        cell.addEventListener('mouseenter', () => {

            let hover = Number(cell.dataset.hoverCount)
            hover++
            cell.dataset.hoverCount = hover
            const opacity = Math.min(hover / 10, 1);

            let color = cell.dataset.color

            if (!color) {

                color = getRandomColor()
                cell.dataset.color = color
            }
            cell.style.backgroundColor = `rgba(${color}, ${opacity})`
        })

        gridContainer.appendChild(cell)
    }
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    return `${r},${g},${b}`

}

createGrid(16)