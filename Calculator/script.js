const display = document.querySelector(".display-container")
const span = document.querySelector(".display")
const digitButtons = document.querySelectorAll(".digit")
const operatorButtons = document.querySelectorAll(".operator")
const equalButton = document.querySelector(".equal")
const deleteButton = document.querySelector(".delete")
const clearButton = document.querySelector(".ac")
const decimalButton = document.querySelector(".floating-point")

for (const digit of digitButtons) {
    digit.addEventListener('click', (e) => {
        let text = e.target.textContent
        if (span.textContent === '0') {
            span.textContent = ""
            span.textContent += text
        }
        else {
            span.textContent += text
        }
    })
}