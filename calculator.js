//max number of number on display = 28 

const numBtns = document.querySelectorAll(".numButtons button");
const symBtns  =document.querySelectorAll(".symbols button");
const clearBtn = document.querySelector(".clear");
const mainDisplay = document.querySelector(".calculation");
const secondDisplay = document.querySelector(".historyOne");
const thirdDisplay = document.querySelector(".historyTwo");
const equalBtn = document.querySelector(".equals");
const backBtn = document.querySelector(".backButton");
const numbers = ["1","2","3","4","5","6","7","8","9","0"];
const symbols = ['+','-','*','÷'];
let  divideByZeroError = false ; 
// let expression = [];
let currentNum;
let lastAnswer; 




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
            if(a == 0 || b == 0){
                divideByZeroError = true; 
                return "can't divide by my income";
            }
            return divide(a,b);
    } 
}


function putNumbersOnScreen(){

    numBtns.forEach((button)=>{

  
 
     button.addEventListener("click", (btn)=>{
        if(divideByZeroError ==true){
            mainDisplay.textContent='';
            divideByZeroError = false;
        }
       

        //this prevents putting tow dots in single sequence of number
        if(button.textContent == '.' && currentNum.includes('.')){
            
            //do nothing if user try to input additional dots.
        }

        //starts to calculation if you typed a number right after the calculation
        else if(mainDisplay.textContent == lastAnswer ){
            mainDisplay.textContent= '';
            currentNum= '';
            currentNum = currentNum == undefined? + button.textContent: currentNum + button.textContent;
            console.log(`current num: ${currentNum}`);
            mainDisplay.textContent = mainDisplay.textContent + button.textContent;

        }
        else{
            currentNum = currentNum == undefined? + button.textContent: currentNum + button.textContent;
            console.log(`current num: ${currentNum}`);
            mainDisplay.textContent = mainDisplay.textContent + button.textContent;
        }

     })

    })
 
 }
 
 function clearDisplayBtn(){

    clearBtn.addEventListener("click", (button)=>{

        mainDisplay.textContent = '';
        currentNum = '';
    });

 }

 function deleteLastDigitBackButtonPressed(){

    backBtn.addEventListener("click",(button)=> {

        let string = mainDisplay.textContent;
        mainDisplay.textContent = string.substring(0,mainDisplay.textContent.length -1);
        currentNum = currentNum.substring(0, currentNum.length -1);
    });
 }

 

 function addSymbolsOnScreen(){

    //only put symbols when there is no symbols left and right 

    symBtns.forEach((button)=> {

        button.addEventListener("click",(Sbtn)=>{
            
            //prevents inputting symbols back to back 
            let lastDigit = mainDisplay.textContent[mainDisplay.textContent.length -1];
            if(button.textContent == '=' && mainDisplay.textContent.includes(symbols) == false){

                //preventing multiple dots when you pressed dot after clicking '='
                //beacuse '=' button is part of symBtns. 
            }
            else{
                
                currentNum = '';
            }
            if(numbers.includes(lastDigit) && symbols.includes(button.textContent)){
                mainDisplay.textContent = mainDisplay.textContent + button.textContent;
            } 

        });
    });

 }
 
 function updateHistory(expression,answer){

    thirdDisplay.textContent = secondDisplay.textContent; 
    secondDisplay.textContent = expression + '=' + answer;
    
    
 }


 function calculateNumbers(){

    equalBtn.addEventListener("click",(button)=>{

        //check the first expession [numbers][sybol][numbers] 
        let re = /\d+(\.\d+)?[+\-*÷]\d+(\.\d+)?/;

        let expression = mainDisplay.textContent.match(re);
        //preventing errors from operating on incompleted expressions 

        if(expression){

            let sLength = expression[0].length;
            console.log(sLength);
            
            mainDisplay.textContent = mainDisplay.textContent.substring(sLength);
            console.log(expression);
            console.log(expression[0]);
            
            //split the epxression to parts
            let parts = expression[0].split(/([+\-*÷])/);
            
            //prevents long decimal 
            let answer = Math.round(operate(Number(parts[0]),Number(parts[2]),parts[1])*100000)/100000;
            lastAnswer = String(answer);
            if(!divideByZeroError){

                console.log(answer);

                mainDisplay.textContent = String(answer).concat('',mainDisplay.textContent);
                if(mainDisplay.textContent[mainDisplay.textContent.length -1] == '.'){
                    mainDisplay.textContent = mainDisplay.textContent.substring(0,mainDisplay.textContent.length -1);
                }
                updateHistory(expression[0],answer);
            }
            else{
                mainDisplay.textContent = answer;
                
            }

        }
        
 
        
    });

 }
 
 
 putNumbersOnScreen();
 clearDisplayBtn();
 addSymbolsOnScreen();
 calculateNumbers();
 deleteLastDigitBackButtonPressed();
