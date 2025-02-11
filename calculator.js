const numBtns = document.querySelectorAll(".numButtons button");
const symBtns  =document.querySelectorAll(".symbols");
const clearBtn = document.querySelector(".clear");
const mainDisplay = document.querySelector(".calculation");



function add(a, b){

    return a + b;
}

function subtract(a, b){

    return a - b ; 
}

function multiply(a, b){

    return a * b; 
}

function divide(a, b){

    return a/b; 
}

function operate(a, b, operator){

    switch (operator){
        
        case '+':
            return add(a,b);

        case '-':
            return subtract(a,b);

        case '*':
            return multiply(a,b);

        case '÷':
            return divide(a,b);
    } 
}


