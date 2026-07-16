let firstNumber = ""
let secondNumber = ""
let currentOperator = ""
let shouldResetDisplay = false


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
decimalButton.addEventListener('click', (e) => {
    let text = e.target.textContent
    let parts = span.textContent.split(/[\+\-\*\/\%]/)
    let currentNumber = parts[parts.length - 1]
    const ops = "+-*/%"
    let lastChar = span.textContent.slice(-1)

    if (currentNumber.includes('.')) {
        return
    }
    if (ops.includes(lastChar) || currentNumber == "") {
        span.textContent += '0.'
        return
    }
    else {
        span.textContent += text
    }
})

for (const operator of operatorButtons) {

    operator.addEventListener('click', (e) => {
        const ops = "+-*/%"
        let lastChar = span.textContent.slice(-1)
        let text = e.target.textContent
        if (ops.includes(lastChar)) {
            span.textContent = span.textContent.slice(0, -1)
        }
        span.textContent += text
    })
}


clearButton.addEventListener('click', () => {
    span.textContent = "0"
})

deleteButton.addEventListener('click', (e) => {
    let text = e.target.textContent
    if (span.textContent === '0') {
        return
    }
    else {
        span.textContent = span.textContent.slice(0, -1)
    }
    if (span.textContent === "") {
        span.textContent = "0"
    }
})
