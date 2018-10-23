// the program uses postif to evaluate the expression
// the program converts infix to postfix for the evaluation 
// selecting the display element
let display = document.querySelector('input');
display.value = '';

// variable to check whether the result is displayed or not 
let isResultSet = false;  // initially result is not diplayed

class Calc {
    constructor() {
        // getting all the buttons
        this.buttons = document.getElementsByTagName('button');
        this.num = 0;  // to store temporary numbers
        this.result = 0;  // to store the result of operations
        this.stack = [];  // stack to hold the operator while forming the expression
        this.expression = [];  //to store the postfix notation
        this.stackTop = -1;   // top of stack
        this.exprTop = -1;  // top of the expression
    }

    // function to add event listeners to the buttons
    loadEventListener() {
        for (let i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].addEventListener('click',this.getExpression.bind(this));
        }
    }
    getExpression(e) {
        if (isResultSet === true) {
            this.reset();
        }
        display.value += e.target.value;
        let val = parseInt(e.target.value);  // converting the string into int
        if (!isNaN(val)) {
            this.num = this.num*10 + parseInt(e.target.value);  // num stores number temporarily before any operator is pressed
        }
        else if(e.target.value == "+" || e.target.value == "-" || e.target.value == "*" || e.target.value == "/") {
            this.expression[++this.exprTop] = this.num;
            this.num = 0;

            // here stack stores the object consisting operator and its precedence
            // check if stack is empty
            if (this.stack.length < 1) {
                this.stack[++this.stackTop] = {
                    "operator": e.target.value,
                    "priority": this.getPriority(e.target.value)
                }
            }
            else {
                if (this.stack[this.stackTop].priority <= this.getPriority(e.target.value)) {
                    this.expression[++this.exprTop] = this.stack[this.stackTop].operator;
                    this.stack[this.stackTop] = {
                        "operator": e.target.value,
                        "priority": this.getPriority(e.target.value)
                    }
                }
                else {
                    this.stack[++this.stackTop] = {
                        "operator": e.target.value,
                        "priority": this.getPriority(e.target.value)
                    }
                }
            }
        }
        else if (e.target.value == '=') {
            this.expression[++this.exprTop] = this.num;
            while (this.stack.length > 0) {
                this.expression[++this.exprTop] = this.stack[this.stackTop].operator;
                this.stackTop--;
                this.stack.pop();
                // when this.stack gets empty loop ends
            }
            this.getCalculation();
        }
        else if (e.target.value === "cl") {
            this.reset();
        }
    }
    getCalculation() {
        this.exprTop = 0;
        // now using the stack to evaluate postfix 
        while (this.exprTop < this.expression.length) {
            if (!isNaN(this.expression[this.exprTop])) {
                this.stack[++this.stackTop] = this.expression[this.exprTop];
                this.exprTop++;
            }
            else {
                let tempNum1 = this.stack[this.stackTop--];
                let tempNum2 = this.stack[this.stackTop--];
                let tempResult = eval(tempNum2+this.expression[this.exprTop++]+tempNum1);
                this.stack[++this.stackTop] = tempResult;
            }
        }
        display.value = this.stack[this.stackTop];
        isResultSet = true;   // setting the isResultSet to true indicate we have obatined result
    }
    getPriority(operator) {
        if (operator == "*")
            return 1;         // here 1 is used for greater preference
        if (operator == "/")
            return 1;
        if (operator == "+")
            return 2;         // greater the number less the preference
        if (operator == "-")
            return 2;
    }
    reset() {
        display.value = '';
        isResultSet = false;  // setting isResultSet to false indicate start of new expression

        // reset stack and expression
        this.stack = [];
        this.expression = [];
        this.stackTop = -1;   // top of stack
        this.exprTop = -1;
        this.num = 0;
    }
}

let calc = new Calc();
calc.loadEventListener();