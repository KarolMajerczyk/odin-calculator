const calculatorKeyboard = document.querySelector(".keyboard");
const calculatorDisplay = document.querySelector(".display");

let firstNumber, secondNumber;
let operator;

const calculator = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": modulo,
};

calculatorKeyboard.addEventListener("click", (event) => handleUserInput(event));

function handleUserInput(event) {
  const userInput = event.target.textContent;

  if (isNumber(userInput) || userInput === ".") {
    displayUserInput(userInput);
  } else if (isOperator(userInput)) {
    firstNumber = Number(calculatorDisplay.textContent);
    operator = userInput;
    resetCalculatorDisplayValue();
  } else if (userInput === "=") {
    secondNumber = Number(calculatorDisplay.textContent);
    const result = operate(firstNumber, operator, secondNumber);
    displayOperationResult(result);
  } else if (userInput.toLowerCase() === "ac") {
    resetCalculatorOperation();
  } else if (userInput === "+ / -") {
    switchNumberSign();
  }
}

function operate(a, sign, b) {
  return calculator[sign](a, b);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function switchNumberSign() {
  if (calculatorDisplay.textContent.includes("-")) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.replace(
      "-",
      ""
    );
  } else {
    calculatorDisplay.textContent = `-${calculatorDisplay.textContent}`;
  }
}

function resetCalculatorOperation() {
  firstNumber = null;
  secondNumber = null;
  operator = null;

  resetCalculatorDisplayValue();
}

function isNumber(input) {
  return "0123456789".includes(input);
}

function isOperator(input) {
  return "+-*/%".includes(input);
}

function resetCalculatorDisplayValue() {
  calculatorDisplay.textContent = "";
}

function displayUserInput(input) {
  if (input === "." && calculatorDisplay.textContent.includes(".")) return;
  calculatorDisplay.textContent += input;
}

function displayOperationResult(result) {
  calculatorDisplay.textContent = result;
}
