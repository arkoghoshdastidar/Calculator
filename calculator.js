function calculator(firstOperand, secondOperand) {
    this.firstOperand = firstOperand.innerHTML;
    this.secondOperand = secondOperand.innerHTML;

    this.clear = function () {
        this.firstOperand = '';
        this.secondOperand = '';
        this.operation = undefined;
    }
    this.delete = function () {
        if(this.firstOperand.length === 0 && this.secondOperand.length === 0){
            return;
        }else if(this.secondOperand.length === 0 && this.firstOperand.length !== 0){
            this.secondOperand = this.firstOperand.slice(0, this.firstOperand.length-1);
            this.firstOperand = '';
            return;
        }
        this.secondOperand = this.secondOperand.slice(0,this.secondOperand.length-1);
    }
    this.appendNumber = function (number) {
        if (number === '.' && this.secondOperand.indexOf('.') !== -1) {
            return;
        }else if(number === '+' || number === '÷' || number === '*'){
            return;
        }else if(number === '-'){
            if(this.secondOperand.length === 0){
                this.secondOperand = '-';
            }
            return;
        }
        this.secondOperand = this.secondOperand + number;
    }
    this.chooseOperation = function (operation) {
        if (this.firstOperand.length !== 0 || this.secondOperand.length === 0 || this.secondOperand === '-' || this.secondOperand === '.') {
            return;
        }
        this.operation = operation;
        this.firstOperand = this.secondOperand + operation;
        this.secondOperand = '';
    }
    this.compute = function () {
        if (this.firstOperand.length === 0 || this.secondOperand.length === 0 || this.secondOperand === '-' || this.secondOperand === '.') {
            return;
        }
        num1 = undefined;
        num2 = undefined;
        switch (this.operation) {
            case '+':
                this.firstOperand = this.firstOperand.slice(0, this.firstOperand.length-1);
                num1 = parseFloat(this.firstOperand);
                num2 = parseFloat(this.secondOperand);
                this.firstOperand='';
                this.secondOperand=(num1+num2).toString();
                break;
            case '-':
                this.firstOperand = this.firstOperand.slice(0, this.firstOperand.length-1);
                num1 = parseFloat(this.firstOperand);
                num2 = parseFloat(this.secondOperand);
                this.firstOperand='';
                this.secondOperand=(num1-num2).toString();
                break;
            case '*':
                this.firstOperand = this.firstOperand.slice(0, this.firstOperand.length-1);
                num1 = parseFloat(this.firstOperand);
                num2 = parseFloat(this.secondOperand);
                this.firstOperand='';
                this.secondOperand=(num1*num2).toString();
                break;
            default:
                this.firstOperand = this.firstOperand.slice(0, this.firstOperand.length-1);
                num1 = parseFloat(this.firstOperand);
                num2 = parseFloat(this.secondOperand);
                this.firstOperand='';
                this.secondOperand=(num1/num2).toString();
        }
    }
    this.updateDisplay = function () {
        firstOperand.innerHTML = this.firstOperand;
        secondOperand.innerHTML = this.secondOperand;
    }
    this.clear();
}

let firstOperand = document.querySelector('[first-operand-text-element]');
let secondOperand = document.querySelector('[second-operand-text-element]');
let allClearButton = document.querySelector('[all-clear-button]');
let deleteButton = document.querySelector('[delete-button]');
let equalButton = document.querySelector('[equal-button]');
let numberButtons = document.querySelectorAll('[number-button]');
let operationButton = document.querySelectorAll('[operation-button]');

let calc = new calculator(firstOperand, secondOperand);

deleteButton.addEventListener("click", ()=>{
    calc.delete();
    calc.updateDisplay();
})

numberButtons.forEach(number => {
    number.addEventListener("click", () => {
        calc.appendNumber(number.innerHTML);
        calc.updateDisplay();
    });
});

operationButton.forEach(operation => {
    operation.addEventListener("click", () => {
        calc.appendNumber(operation.innerHTML);
        calc.chooseOperation(operation.innerHTML);
        calc.updateDisplay();
    });
})

allClearButton.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
});

equalButton.addEventListener("click", () => {
    calc.compute();
    calc.updateDisplay();
});