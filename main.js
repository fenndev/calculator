/* DOM Objects */

let displayText = document.querySelector(".results-text");
let numBody = document.querySelector(".num-body");
let numButtons = numBody.querySelectorAll("button");
let opBody = document.querySelector(".operator-buttons");
let opButtons = opBody.querySelectorAll("button");

let backspaceButton = document.querySelector("#backspace");
let clearButton = document.querySelector("#clear");
let addButton = document.querySelector("#add");
let subtractButton = document.querySelector("#subtract");
let multiplyButton = document.querySelector("#multiply");
let divideButton = document.querySelector("#divide");
let equalsButton = document.querySelector("#equals");
let decimalButton = document.querySelector("#decimal");

/* Global Variables */

let currentNum = "";
let storedNum1 = "";
let storedNum2 = "";
let operatorSelected = "";
let operationString = "";

/* Event Listeners */

numButtons.forEach(numButton => {
    numButton.addEventListener('click', () => {
        if(!currentNum && storedNum1) {
            if(!operatorSelected)
                return;
            else {
                if(currentNum.length < 9) {
                    currentNum += numButton.textContent;
                    displayText.textContent = currentNum;
                }
            }
        }
        else {
            if(currentNum.length < 9) {
                currentNum += numButton.textContent;
                displayText.textContent = currentNum;
            }
        }
        
    })
});

opButtons.forEach(opButton => {
    opButton.addEventListener('click', () => {
        switch(opButton.id) {
            case "backspace":
                if(currentNum) {
                    let backspacedNum = currentNum.slice(0, -1);
                    currentNum = backspacedNum;
                    displayText.textContent = backspacedNum;
                }
                break;
            case "clear":
                clearCalc();
                break;
            case "add":
                onOperatorClick(opButton);
                break;
            case "subtract":
                onOperatorClick(opButton);
                break;
            case "multiply":
                onOperatorClick(opButton);
                break;
            case "divide":
                onOperatorClick(opButton);
                break;
            case "equals":
                if(!storedNum1 && !storedNum2) {
                    return;
                };
                if(storedNum1) {
                    if(storedNum2)
                        operate(operatorSelected, +storedNum1, +storedNum2);
                    else if(currentNum) {
                        storedNum2 = currentNum;
                        operate(operatorSelected, +storedNum1, +storedNum2);
                    }
                    else
                        return;
                }
                break;
            case "decimal":
                if(currentNum.includes("."))
                    return;
                if(currentNum.length == 0) {
                    currentNum = "0";
                }
                currentNum = currentNum + ".";
                displayText.textContent = currentNum;
                break;
        }
    })
});

function operate(operator, firstNum, secondNum) {
    let resultNum = 0;
    switch(operator.toLowerCase()) {
        case "add":
            resultNum = add(firstNum, secondNum);
            break;
        case "subtract":
            resultNum = subtract(firstNum, secondNum);
            break;
        case "multiply":
            resultNum = multiply(firstNum, secondNum);
            break;
        case "divide":
            if(secondNum != 0)
                resultNum = divide(firstNum, secondNum);
            else {
                alert("Can't divide by zero! What were you thinking?!");
                clearCalc();
                return;
            }
            break;
    }
    if(resultNum.toString().length > 9) {
        resultNum = resultNum.toExponential(4);
    }
    storedNum1 = resultNum.toString();
    displayText.textContent = storedNum1;
    currentNum = "";
    storedNum2 = "";
    operatorSelected = "";
}

function add(firstNum, secondNum) {
    return +(firstNum + secondNum);
}

function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
    return firstNum / secondNum;
}

function onOperatorClick(opButton) {
    if(!currentNum && !storedNum1)
        return;
    if(currentNum || storedNum1) {
        if(currentNum && storedNum1) {
            storedNum2 = currentNum;
            operatorSelected = opButton.id;
            operate(operatorSelected, storedNum1, storedNum2);
        }
        else if(currentNum && !storedNum1) {
            storedNum1 = currentNum;
            operatorSelected = opButton.id;
            currentNum = "";
            displayText.textContent = `${opButton.textContent}`
        }
        else {
            operatorSelected = opButton.id;
            displayText.textContent = `${opButton.textContent}`
        }
    }
}

function clearCalc() {
    displayText.textContent = "Results Here";
    currentNum = "";
    storedNum1 = "";
    storedNum2 = "";
    operatorSelected = "";
}