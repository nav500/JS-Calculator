// selecting the display element
let display = document.querySelector('input');
display.value = '';

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
        display.value += e.target.value;
        let val = parseInt(e.target.value);  // converting the string into int
        if (!isNaN(val)) {
            this.num = this.num*10 + parseInt(e.target.value);
        }
        else if(e.target.value == "+" || e.target.value == "-" || e.target.value == "*" || e.target.value == "/") {
            this.expression[++this.exprTop] = this.num;
            this.num = 0;
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
            while (this.stack.length > 0) {
                this.expression[++this.exprTop] = this.stack[this.stackTop].operator;
                this.stackTop--;
                this.stack.pop();
            }
            this.getCalculation(this.expression);
        }
    }
    getCalculation(expression) {

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
}

let calc = new Calc();
calc.loadEventListener();