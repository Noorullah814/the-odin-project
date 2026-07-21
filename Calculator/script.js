let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetDisplay = false;
const resetDisplay = "0";

const display = document.querySelector(".display-container");
const span = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".ac");
const decimalButton = document.querySelector(".floating-point");

// 1. DIGIT BUTTONS
for (const digit of digitButtons) {
    digit.addEventListener('click', (e) => {
        let text = e.target.textContent;

        // If an operator or equals was just pressed, clear screen for the new number
        if (shouldResetDisplay === true) {
            span.textContent = "";
            shouldResetDisplay = false;
        }
        
        // Prevent leading zero bugs
        if (span.textContent === "0") {
            span.textContent = "";
        }

        span.textContent += text;
    });
}

// 2. DECIMAL BUTTON
decimalButton.addEventListener('click', () => {
    // If an operator was just clicked, a decimal press should start a new "0." number
    if (shouldResetDisplay === true) {
        span.textContent = "0.";
        shouldResetDisplay = false;
        return;
    }
    
    // Prevent multiple decimals in a single number
    if (span.textContent.includes('.')) {
        return;
    }
    
    if (span.textContent === "" || span.textContent === "0") {
        span.textContent = "0.";
        return;
    }
    
    span.textContent += ".";
});

// 3. OPERATOR BUTTONS & CHAINING LOGIC
for (const operator of operatorButtons) {
    operator.addEventListener('click', (e) => {
        const text = e.target.textContent;
        setOperator(text);
    });
}

function setOperator(operator) {
    // FIX FOR PROBLEM #2: If user presses '25 + ' and then immediately presses '+', 
    // shouldResetDisplay is still true. They are just changing the operator. Do not calculate!
    if (currentOperator !== "" && !shouldResetDisplay) {
        secondNumber = span.textContent;

        let result = operate(currentOperator, Number(firstNumber), Number(secondNumber));

        // FIX FOR PROBLEM #1: Handle division by zero break gracefully
        if (result === "Error") {
            handleErrorState();
            return;
        }

        // Handle floating-point precision rounding (e.g., 0.1 + 0.2)
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = Math.round(result * 100000) / 100000;
        }

        span.textContent = result;
        firstNumber = result.toString();
    } else {
        firstNumber = span.textContent;
    }

    currentOperator = operator;
    shouldResetDisplay = true;
}

// 4. EQUAL BUTTON
equalButton.addEventListener('click', () => {
    // No operation pending or missing numbers, exit early
    if (!currentOperator || firstNumber === "") return;

    secondNumber = span.textContent;
    let result = operate(currentOperator, Number(firstNumber), Number(secondNumber));

    if (result === "Error") {
        handleErrorState();
        return;
    }

    if (typeof result === 'number' && !Number.isInteger(result)) {
        result = Math.round(result * 100000) / 100000;
    }

    span.textContent = result;
    
    // Reset state completely back to clean slate after '='
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    shouldResetDisplay = true;
});

// 5. CLEAR BUTTON (AC)
clearButton.addEventListener('click', () => {
    resetAllStates();
});

// Helper functions to manage state changes cleanly
function resetAllStates() {
    span.textContent = resetDisplay;
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    shouldResetDisplay = false;
}

function handleErrorState() {
    span.textContent = "Error";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    shouldResetDisplay = true; // Next digit press completely clears "Error"
}

// 6. DELETE BUTTON (DEL)
deleteButton.addEventListener('click', () => {
    // If the display currently shows "Error", clear it completely
    if (span.textContent === 'Error' || span.textContent === '0') {
        resetAllStates();
        return;
    }
    
    span.textContent = span.textContent.slice(0, -1);
    
    if (span.textContent === "") {
        span.textContent = "0";
    }
    
    // Ensure typing after deleting appends to the current text instead of wiping it
    shouldResetDisplay = false; 
});

// 7. OPERATE MATHEMATICAL CORE
function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 === 0 ? "Error" : num1 / num2;
        case '%': return num1 % num2;
        default: return num2;
    }
}


// 8. KEYBOARD SUPPORT
window.addEventListener('keydown', (e) => {
    // Prevent default browser behaviors (like page scrolling on Spacebar or Arrow keys)
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
    }

    // Find the button that matches the key pressed
    const buttonToClick = findMatchingButton(e.key);

    if (buttonToClick) {
        e.preventDefault(); // Prevent accidental form submissions or scrolling
        buttonToClick.classList.add('active'); // Optional: visual feedback class
        buttonToClick.click(); // Trigger the click event listener we already wrote!
        
        // Remove the visual active state quickly
        setTimeout(() => buttonToClick.classList.remove('active'), 100);
    }
});

function findMatchingButton(key) {
    // Handle standard digits (0-9)
    if (key >= '0' && key <= '9') {
        return Array.from(digitButtons).find(btn => btn.textContent === key);
    }

    // Map specific keyboard keys to your layout buttons
    switch (key) {
        case '.':
        case ',':
            return decimalButton;
        case '+':
        case '-':
        case '%':
            return Array.from(operatorButtons).find(btn => btn.textContent === key);
        case '*':
        case 'x':
        case 'X':
            // Maps common multiplication key inputs to your '*' button
            return Array.from(operatorButtons).find(btn => btn.textContent === '*' || btn.textContent === '×');
        case '/':
            return Array.from(operatorButtons).find(btn => btn.textContent === '/');
        case 'Enter':
        case '=':
            return equalButton;
        case 'Backspace':
            return deleteButton;
        case 'Escape':
        case 'c':
        case 'C':
            return clearButton;
        default:
            return null; // Ignore any other irrelevant keys
    }
}
