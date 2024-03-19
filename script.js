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
  if (b === 0) {
    alert("Don't divide by 0!");
    return;
  }

  return a / b;
}

function modulo(a, b) {
  return a % b;
}

calculatorKeyboard.addEventListener("click", (event) => handleUserInput(event));

let isTyping = false;

function handleUserInput(event) {
  const userInput = event.target.textContent;

  if (!isTyping) {
    resetCalculatorDisplayValue();
  }

  if (isNumber(userInput) || userInput === ".") {
    displayUserInput(userInput);
    isTyping = true;
  } else if (userInput.toLowerCase() === "ac") {
    resetCalculatorDisplayValue();
    resetCalculatorOperation();
  } else if (userInput === "+ / -") {
    switchNumberSign();
  } else if (isOperator(userInput)) {
    if (!firstNumber) {
      firstNumber = Number(calculatorDisplay.textContent);
    } else {
      secondNumber = Number(calculatorDisplay.textContent);
      const result = operate(firstNumber, operator, secondNumber);
      displayOperationResult(result);
      firstNumber = result;
    }

    operator = userInput;
    isTyping = false;
  } else if (userInput === "=" && operator) {
    secondNumber = Number(calculatorDisplay.textContent);
    const result = operate(firstNumber, operator, secondNumber);
    displayOperationResult(result);
    firstNumber = result;

    isTyping = false;
  }
}

function operate(a, sign, b) {
  return calculator[sign](a, b);
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
  const displayText = calculatorDisplay.textContent;

  if (input === "." && displayText.includes(".")) return;
  if (input === "." && displayText.length === 0) return;

  if (
    displayText.length < 2 &&
    displayText.split("")[0] === "0" &&
    input !== "."
  )
    return;

  calculatorDisplay.textContent += input;
}

function displayOperationResult(result) {
  calculatorDisplay.textContent = result;
}
