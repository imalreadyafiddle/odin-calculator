function activateComponents() {
    // group calc elements on page using class selectors
    let buttons = Array.from(document.querySelectorAll('.key'));
    let displayScreen = document.querySelector('.display-readout')
    
    // create appropriate event listeners for each group of elements
    buttons.forEach(button => button.addEventListener('click', buttonClicked));
    displayScreen.innerText = displayValue;   
    }

function buttonClicked () {
    // figure out what button got clicked, run the right function
    if (this.classList.contains('number')) {
        if (displayValue.length >= 10) {return}
        displayValue += this.innerText.toString()
        updateDisplay();
    } else if (this.classList.contains('operator')) {
        // perform operations
    } else if (this.classList.contains('clear')) {
        // perform correct deletion
    }
}

function operate (num1, num2, operator) {
    // accepts two numbers and an operator
    // calls the correct function with num1 & num 2
}

function updateDisplay () {
    let displayScreen = document.querySelector('.display-readout')
    displayScreen.innerText = displayValue;
        // show total if operator was pressed
        // show new number being input otherwise
}

// wait for the DOM to load, then apply event listeners to the buttons
addEventListener('DOMContentLoaded', activateComponents);

// intialize the displayValue and num1/num2 variables globally
let displayValue = '', firstOperand, secondOperand, firstOperator, secondOperator, result;
