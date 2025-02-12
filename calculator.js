//max number of number on display = 28 

const numBtns = document.querySelectorAll(".numButtons button");
const symBtns  =document.querySelectorAll(".symbols button");
const clearBtn = document.querySelector(".clear");
const mainDisplay = document.querySelector(".calculation");
const equalBtn = document.querySelector(".equals");
const numbers = ["1","2","3","4","5","6","7","8","9","0"];
const symbols = ['+','-','*','÷'];





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


function putNumbersOnScreen(){

    numBtns.forEach((button)=>{
 
     button.addEventListener("click", (btn)=>{
         mainDisplay.textContent = mainDisplay.textContent + button.textContent;

     })

    })
 
 }
 
 function clearDisplayBtn(){

    clearBtn.addEventListener("click", (button)=>{

        mainDisplay.textContent = '';
    });

 }

 function addSymbolsOnScreen(){

    //only put symbols when there is no symbols left and right 

    symBtns.forEach((button)=> {

        button.addEventListener("click",(Sbtn)=>{
            
            //prevents inputting symbols back to back 
            let lastDigit = mainDisplay.textContent[mainDisplay.textContent.length -1];
            if(numbers.includes(lastDigit) && symbols.includes(button.textContent)){
                mainDisplay.textContent = mainDisplay.textContent + button.textContent;
            } 

        });
    });

 }
 
 function calculateNumbers(){

    equalBtn.addEventListener("click",(button)=>{

        //check the first expession [numbers][sybol][numbers] 
        let re = /\d+[+\-*÷]\d+/;

        let epxression = mainDisplay.textContent.match(re);
        //preventing errors from operating on incompleted expressions 

        if(epxression){

            let sLength = epxression[0].length;
            console.log(sLength);
            
            mainDisplay.textContent = mainDisplay.textContent.substring(sLength);
            console.log(epxression);
            console.log(epxression[0]);
            
            //split the epxression to parts
            let parts = epxression[0].split(/([+\-*÷])/);
            let answer = operate(Number(parts[0]),Number(parts[2]),parts[1]);
            console.log(answer);
            mainDisplay.textContent = String(answer).concat('',mainDisplay.textContent);
        }
        
 
        
    });

 }
 
 
 putNumbersOnScreen();
 clearDisplayBtn();
 addSymbolsOnScreen();
 calculateNumbers();