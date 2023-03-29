const inputDisplay = document.querySelector(".input")
const buttons = document.querySelector(".buttons")

let displayValue = 0;
let firstValue = null;
let operator = null;
let secondValue = false;


function updateValue(){
    inputDisplay.value = displayValue;
}

buttons.addEventListener("click", (e) => {
    const element = e.target
    //console.log(element);
    const value = element.value;

    if(!buttons.matches("button")) return;

    switch(value){
        case  "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value)
            break;
        case ".":
            inputDecimal()
            break;
        case "clear":
            clear()
            break;
        default:
            inputNumber(element.value)

    }
    updateValue();
})

function inputNumber(num){
    if(secondValue){
        displayValue = num;
        secondValue = false;
    }
    displayValue = displayValue === "0" ? num :displayValue +  num;
}

function inputDecimal(){
    if (!displayValue.includes(".")){
        displayValue += "."
    }
}

function clear(){
    displayValue = "0"
}


function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && secondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue == null){
        firstValue = value;
    }

    else if(operator){
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result
    
    }

    secondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator){
    if(operator==="+"){
        return first + second
    }
    else if(operator==="-"){
        return first - second
    }
    else if(operator==="*"){
        return first * second
    }else if(operator==="/"){
        return first / second
    }
    return second;


}
