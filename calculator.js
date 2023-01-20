function activateComponents() {
    // group calc elements on page using class selectors
    let buttons = Array.from(document.querySelectorAll('.key'));
    let displayScreen = document.querySelector('.display-readout')
    
    // create appropriate event listeners for each group of elements
    buttons.forEach(button => button.addEventListener('click', buttonClicked));
    displayScreen.innerText = displayValue; 
    }


function buttonClicked () {
    // figure out what button was clicked, do the right things.
    if (this.classList.contains('number')) {
        inputNumber(this.innerText);
        updateDisplay();
    } else if (this.classList.contains('operator')) {
        inputOperator(this.innerText);
    } else if (this.classList.contains('equals')) {
        inputEquals();
        updateDisplay();
    } else if (this.classList.contains('decimal')) {
        inputDecimal(this.innerText);
        updateDisplay();
    } else if (this.classList.contains('sign')) {
        inputSign(displayValue);
        updateDisplay();
    } else if (this.classList.contains('clear')) {
        if (this.classList.contains('clear-all')) {
            inputClear('all');
            updateDisplay();
        } else if (this.classList.contains('clear-entry')) {
            inputClear('entry');
            updateDisplay();
        } else {
            inputClear('delete');
            updateDisplay();
        } return;
    } return;
}

function inputClear (level) {
    if (level == 'all') {
        // reset all vars to initial state
        displayValue = "0", 
        firstNumber = null, 
        secondNumber = null,
        firstOperator = null,
        secondOperator = null,
        result = null
    } else if (level == 'entry') {
        // clear current display value
        displayValue = ""
    } else if (level == 'delete') {
        // split display value into array, pop off the end, join it back together
        let tempBackSpace = displayValue.split("")
        tempBackSpace.pop()
        displayValue = tempBackSpace.join("")
    } else {
        // should've turned left at albuquerque
        console.log("how did you get here?, go check inputClear()")
        return;
    }
}

function inputDecimal (dot) {
    if(displayValue === firstNumber || displayValue === secondNumber) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputEquals () {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        if(result === 'wat') {
            displayValue = 'wat';
        } else {
            displayValue = roundAccurately(result, 5).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        if(result === 'wat') {
            displayValue = 'wat';
        } else {
            displayValue = roundAccurately(result, 5).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputOperator (operator) {
    if(firstOperator != null && secondOperator === null) {
        // handles input of second operator
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        displayValue = roundAccurately(result, 10).toString();
        firstNumber = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        // new secondOperator
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 5).toString();
        firstNumber = displayValue;
        result = null;
    } else { 
        // handles first operator input
        firstOperator = operator;
        firstNumber = displayValue;
    }
}

function inputNumber (number) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            // handles first number input
            displayValue = number;
        } else if(displayValue === firstNumber) {
            //starts new operation after inputEquals()
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        // inputs to secondNumber
        if(displayValue === firstNumber) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
}

function inputSign(number) {
    displayValue = (number * -1).toString();
}

function operate(num1, num2, operator) {
    if (operator == "+") {
        return num1 + num2;
    } else if (operator == "−") {
        return num1 - num2;
    } else if (operator == "×") {
        return num1 * num2;
    } else if (operator == "÷") {
        if (num2 === 0) {
            return "wat"
        } else {
            return num1 / num2;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function updateDisplay () {
    let display = document.querySelector('.display-readout');
    if (display.innerText.length >= 10) {
        displayValue = "wat"
    } if (displayValue == "") {
        displayValue = "0"
    }
    display.innerText = displayValue;
}

// wait for the DOM to load, then apply event listeners to the buttons
addEventListener('DOMContentLoaded', activateComponents);

// intialize the displayValue and num1/num2 variables globally
let displayValue = "", 
firstNumber = null,
secondNumber = null,
firstOperator = null,
secondOperator =  null,
result = null;