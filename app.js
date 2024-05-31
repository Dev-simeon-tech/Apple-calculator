const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const result = document.querySelector('.result');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear')
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');




let firstValue ='';
let secondValue ='';
let sign ='';
let isFirstValue = true
let intFirstValue;
let intSecondValue;
let currentOperator;
let isCalculated = false;


digits.forEach( (digit)=>{
    digit.addEventListener( 'click', (e)=>{
        if(firstValue != '' && secondValue != '' && isFirstValue === false && isCalculated === true ){
            isFirstValue = true;
            firstValue = '';
            secondValue = '';
            
        }
        if(isFirstValue){
            clear.textContent = 'C'
            getFirstValue(e.target.value);
            // console.log(`first: ${firstValue}`);

        }
        
        if(isFirstValue === false && sign!=''){
            clear.textContent = 'C'
            getSecondValue(e.target.value);
            // console.log(`second: ${secondValue}`)
            
        }

    })
})

function getFirstValue(val){
    if(val === '0' && firstValue === ''){
        return;
    }
    if(val === '.' && firstValue === ''){
        val = 0 + '.';
    }
    
    else if(val === '.' && firstValue.includes('.')){
        val = '';
    }

    if(result.value === '-0'){
        firstValue += -val;
        result.value = firstValue;
        intFirstValue = parseFloat(firstValue);
    }
    else{

        firstValue += val;
        result.value = firstValue;
        intFirstValue = parseFloat(firstValue);
    }
}

function getSecondValue(val){
    currentOperator.classList.remove('active');
    if(val === '0' && secondValue === ''){
        result.value = 0
        return;
    }
    if(val === '.' && secondValue === ''){
        val = 0 + '.';
    }
    else if(val === '.' && secondValue.includes('.')){
        val = '';
    }
    if(result.value === '-0'){
        secondValue += -val;
        result.value = secondValue;
        intSecondValue = parseFloat(secondValue);
    }
    else{

        result.value = '';
        secondValue += val;
        result.value = secondValue;
        intSecondValue = parseFloat(secondValue);
    }
}

operators.forEach( (operator) =>{
    operator.addEventListener('click', (e)=>{
        currentOperator = operator;
        isFirstValue = false;

        if(firstValue != '' && secondValue !='' && sign != '' && isCalculated === false){
            calculate();
            intFirstValue = result.value;
            sign ='';
            secondValue = '';
            
        }
        
        if(firstValue != '' && secondValue !='' && sign != '' && isCalculated === true){
            
            firstValue = result.value;
            isFirstValue = false;
            secondValue = '';
            intFirstValue = parseFloat(firstValue);
            isCalculated = false;
        }
         
        else if(firstValue === '' && secondValue === '' && sign === ''){
            intFirstValue = parseFloat(result.value);
            isFirstValue === false;
        } 
        
        sign = operator.value;
    })
})
negative.addEventListener('click',()=>{
     
    if(isFirstValue){
        if(firstValue === ''){
            result.value = '-0';
        }
        else{
            firstValue = -firstValue;
            result.value = firstValue;
            intFirstValue = firstValue;
        }
      
    }
    else if(isCalculated === true && result.value != ''){
        result.value = -result.value
    }
    else{
        if(secondValue === ''){
            result.value = '-0';
        }
        else{

            secondValue = -secondValue;
            result.value = secondValue;
            intSecondValue = secondValue
        }
    } 


});
let percentValue
percent.addEventListener( 'click' ,()=>{

    percentValue = firstValue / 100;
    
   
    if(firstValue != '' && secondValue !='' && sign != '' && isCalculated === false){
        percentValue = secondValue / 100;
        intSecondValue = parseFloat(percentValue);
    }
    else if(isCalculated === true){
        percentValue = result.value / 100;
    }
    result.value = percentValue;

})
clear.addEventListener('click', ()=>{
    // this if block runs when all values are given and we have not yet calculated yet
    if(firstValue != '' && secondValue !='' && sign != '' && isCalculated === false){
        secondValue = '';
        currentOperator.classList.add('active');
    }

    if( firstValue != '' && secondValue !='' && sign != '' && isCalculated === true ){  
        secondValue = '';
        firstValue = ''; 
        sign = '';
        isFirstValue = true;
        isCalculated === false
        currentOperator.classList.remove('active');
          
    }

    if(clear.textContent = 'C'){
        clear.textContent = 'AC';  
    }

    if(firstValue != '' && secondValue === '' && sign === ''){
        firstValue = ''
    }
    else if(isFirstValue === true){
        firstValue = '';
    }
    result.value = '0';
    isCalculated === false

})


equals.addEventListener('click', ()=>{   
    calculate();
})
function calculate(){
    switch(sign){
        case '+':
            result.value = intFirstValue + intSecondValue;
            break;
        case '-':
            result.value = intFirstValue - intSecondValue;
            break;
        case '/':
            result.value = intFirstValue / intSecondValue;
            break;
        case '*':
            result.value = intFirstValue * intSecondValue;
            break;
    }
    isCalculated = true;
}