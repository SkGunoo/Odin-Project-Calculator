//max number of number on display = 28 

const calculator = document.querySelector(".calBody ");
const numBtns = document.querySelectorAll(".numButtons button");
const symBtns  = document.querySelectorAll(".symbols button");
const clearBtn = document.querySelector(".clear");
const mainDisplay = document.querySelector(".calculation");
const secondDisplay = document.querySelector(".historyOne");
const thirdDisplay = document.querySelector(".historyTwo");
const equalBtn = document.querySelector(".equals");
const backBtn = document.querySelector(".backButton");
const batteryBar = document.querySelector(".battery");
const numbers = ["1","2","3","4","5","6","7","8","9","0"];
const symbols = ['+','-','*','÷'];
let  divideByZeroError = false ; 
// let expression = [];
let currentNum;
let lastAnswer; 
let batteryPercentage = 100; 
let displayContentBeforeZeroBattery ; 
let batteryDied = false; 

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
            if(a === 0 || b === 0){
                divideByZeroError = true; 
                return "can't divide by my income";
            }
            return divide(a,b);
    } 
}


function putNumbersOnScreen(){

        numBtns.forEach((button)=>{
    
        
     
        button.addEventListener("click", (btn)=>{
    
            batterWhenClicked();

            if(batteryPercentage > 0){
                
                if(divideByZeroError ==true){
                    mainDisplay.textContent='';
                    divideByZeroError = false;
                }
               
        
                //this prevents putting tow dots in single sequence of number
                if(button.textContent === '.' && currentNum.includes('.')){
                    
                    //do nothing if user try to input additional dots.
                }
        
                //starts to calculation if you typed a number right after the calculation
                else if(mainDisplay.textContent === lastAnswer ){
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
        
            }
         })
    
        })
     
    
 }
 
 function clearDisplayBtn(){

    clearBtn.addEventListener("click", (button)=>{

        if(batteryDied === true){

            let batteryCharging = Math.round(Math.random()* 30) + 1;
            batteryPercentage += batteryCharging;

            if(batteryPercentage >= 100){

                batteryDied = false;
                batteryPercentage = 100;
                mainDisplay.textContent = displayContentBeforeZeroBattery;
                mainDisplay.style.fontSize = "25px";
                clearBtn.textContent = "Clear";
                calculator.style.filter = "none";
                clearBtn.style.filter = "none";
                clearBtn.style.fontSize = "13px"
                bars = document.querySelector(".batteryBar");
                bars.remove();
                batteryFunction();
            }
            bars = document.querySelector(".batteryBar");
            bars.remove();
            batteryFunction();
         

        }

        else if(batteryDied === false){

            mainDisplay.textContent = '';
            currentNum = '';
        }

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
                batterWhenClicked();
                
                if(batteryPercentage > 0){

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
                }
                
                
    
            });
        });
    

 }
 
 function updateHistory(expression,answer){

    thirdDisplay.textContent = secondDisplay.textContent; 
    secondDisplay.textContent = expression + '=' + answer;
    
    
 }


 function calculateNumbers(){

    if(batteryPercentage >0){

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

 }


 function batteryFunction(){


    batteryBar.style.display ="flex";
    batteryBar.style.gap ="2px";
    batteryBar.style.paddingRight = '2px';
    batteryBar.style.paddingLeft = '2px';
    

    const bars = document.createElement("div"); 

    bars.classList.add("batteryBar"); 
    bars.style.flex= '0 1 ' + batteryPercentage +'%';
    bars.style.borderRadius = '5px';
    bars.style.marginTop = '2px';
    bars.style.marginBottom = '2px';

    if(batteryPercentage > 50){

        bars.style.background = 'rgb(24, 155, 64)';
    }

    else if(batteryPercentage <= 50 && batteryPercentage > 20){
        
        bars.style.background = 'rgb(219, 175, 31)';

    }
    else if(batteryPercentage <= 20){

        bars.style.background = 'rgb(180, 19, 19)';

    }
    bars.textContent = batteryPercentage +'%';
    bars.style.textAlign= "center";
    bars.style.fontFamily= "sans-serif";
    bars.style.fontWeight = "bold";
    batteryBar.appendChild(bars);



    

 }

 function batterWhenClicked(){

    
    let randomNum = Math.round(Math.random() * 5) + 1;
    batteryPercentage -= randomNum ;

    
    if(batteryPercentage <= 0){
        
        //things happen when battery become 0 
        batteryDied = true;
        batteryPercentage = 0;
        displayContentBeforeZeroBattery = mainDisplay.textContent;
        calculator.style.filter = "saturate(0.5)";
        clearBtn.style.filter = "invert(1)";
        
        mainDisplay.style.fontSize ="20px";
        mainDisplay.textContent = "Battery died, press charge button ";
        clearBtn.textContent = "Charge";
        clearBtn.style.fontSize = "11px";

    }
    else if(clearBtn.textContent === "Charge"){
        mainDisplay.style.fontSize ="20px";
        mainDisplay.textContent = "Battery died, press charge button ";
        clearBtn.textContent = "Charge";
        clearBtn.style.fontSize = "11px";
    }
    console.log(`battery: ${batteryPercentage}`); 

    bars = document.querySelector(".batteryBar");
    bars.remove();
    batteryFunction();

 }
 
 
putNumbersOnScreen();
clearDisplayBtn();
addSymbolsOnScreen();
calculateNumbers();
deleteLastDigitBackButtonPressed();
batteryFunction();