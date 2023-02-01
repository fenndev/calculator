/* DOM Objects */

let displayText = document.querySelector(".results-text");
let numBody = document.querySelector(".num-body");
let numButtons = numBody.querySelectorAll("button");
let opBody = document.querySelector(".operator-container");
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

numButtons.forEach(numButton => {numButton.addEventListener('click', () => addNumberButtonFunctions(numButton))});

opButtons.forEach(opButton => { opButton.addEventListener('click', () => addOperatorButtonFunctions(opButton))});

/* Main Functions */

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
            if(secondNum != 0) resultNum = divide(firstNum, secondNum);
            else {
                alert("Can't divide by zero! What were you thinking?!");
                clearCalc();
                return;
            }
            break;
    }
    if(resultNum.toString().length > 9) resultNum = resultNum.toExponential(4);
    storedNum1 = resultNum.toString();
    displayText.textContent = storedNum1;
    operationString = storedNum1;
    currentNum = "";
    storedNum2 = "";
    operatorSelected = "";
}

function clearCalc() {
    displayText.textContent = "Results Here";
    operationString = "";
    currentNum = "";
    storedNum1 = "";
    storedNum2 = "";
    operatorSelected = "";
}

/* Basic Math Functions */

const add = (firstNum, secondNum) => +(firstNum + secondNum);

const subtract = (firstNum, secondNum) => firstNum - secondNum;

const multiply = (firstNum, secondNum) => firstNum * secondNum;

const divide = (firstNum, secondNum) => firstNum / secondNum;

/* Abstracted Button Functions */

function addNumberButtonFunctions(numButton) {
    if(!currentNum && storedNum1) {
        if(!operatorSelected) return;
        else {
            currentNum += numButton.textContent;
            operationString += numButton.textContent;
            displayText.textContent = operationString;
        }
    }
    else {
        if(currentNum[0] == "0" && !currentNum.includes(".")) return;
        if(currentNum.length < 9) {
            currentNum += numButton.textContent;
            operationString += numButton.textContent;
            displayText.textContent = operationString;
        }
    }
}

function addOperatorButtonFunctions(opButton) {
    switch(opButton.id) {
        case "backspace":
            if(currentNum) {
                let newNum = currentNum.slice(0, -1);
                currentNum = newNum;
                operationString = operationString.slice(0, -1);
                displayText.textContent = operationString;
            }
            break;
        case "clear":
            clearCalc();
            break;
        case "add":
            onOperatorClick(opButton, "+");
            break;
        case "subtract":
            onOperatorClick(opButton, "-");
            break;
        case "multiply":
            onOperatorClick(opButton, "\u00D7");
            break;
        case "divide":
            onOperatorClick(opButton, "\u00F7");
            break;
        case "equals":
            if(!storedNum1 && !storedNum2)
                return;
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
            if(currentNum.includes(".")) return;
            else if(!currentNum) {
                if(storedNum1 && !operatorSelected) return;
                currentNum = "0";
                operationString += "0";
            }
            currentNum += ".";
            operationString += ".";
            displayText.textContent = operationString;
            break;
    }
}

function onOperatorClick(opButton, operatorSymbol) {
    if(!currentNum && !storedNum1) return;
    if(currentNum || storedNum1) {
        if(currentNum && storedNum1) {
            storedNum2 = currentNum;
            operatorSelected = opButton.id;
            operate(operatorSelected, storedNum1, storedNum2);
            operationString += ` ${operatorSymbol} `;
            displayText.textContent = operationString;
            operatorSelected = opButton.id;
        }
        else if(currentNum && !storedNum1) {
            if(operatorSelected) return;
            storedNum1 = currentNum;
            operatorSelected = opButton.id;
            currentNum = "";
            operationString += ` ${operatorSymbol} `;
            displayText.textContent = operationString;
        }
        else {
            if(operatorSelected) return;
            operatorSelected = opButton.id;
            operationString += ` ${operatorSymbol} `;
            displayText.textContent = operationString;
        }
    }
}

