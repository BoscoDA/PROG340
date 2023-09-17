//concepts used in script learned from: https://www.youtube.com/watch?v=hdI2bqOjy3c 

const myForm = document.querySelector('#my-form');
const num1Input = document.querySelector('#num1');
const num2Input = document.querySelector('#num2');
const msg = document.querySelector('.msg');
const rslt = document.querySelector('.rslt');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    if((num1Input.value === '') || (num2Input.value === '') ){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    //learned about parseInt from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    else if( (isNaN(parseInt(num1Input.value))) || (isNaN(parseInt(num2Input.value))) ){
        msg.classList.add('error');
        msg.innerHTML = 'Please only enter numbers!';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        const additionResult = Addition((Number)(num1Input.value), (Number)(num2Input.value));
        const rootProduct = Multiply(Math.sqrt((Number)(num2Input.value)), Math.sqrt((Number)(num1Input.value)));

        rslt.innerHTML = `<br> <hr> <br>${num1Input.value} + ${num2Input.value} = ${additionResult} <br>
        sqrt(${num1Input.value}) * sqrt(${num2Input.value}) = ${rootProduct}`;

        // Clear fields
        num1Input.value = '';
        num2Input.value = '';
    }
}

function Addition(x, y){
    return (x + y);
}

function Multiply(x,y){
    return (x * y);
}