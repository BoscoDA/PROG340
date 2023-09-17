// all code from: https://www.youtube.com/watch?v=hdI2bqOjy3c

// console.log('Hello World');
// console.error('This is an error');
// console.warn('This is a warning!');

// //var - globally scoped (don't use!), let - can reasign values, const - allows use unless you know you are going to reassign
// //let age = 30;
// //age = 31;

// //const age2 = 30;

// //console.log(age);

// //String, Numbers, Boolean, Null, Undefined, Symbol

// const name = 'Nick';
// const age = 21;
// const rating = 4.5;
// const isCool = true;
// const x = null;
// const y = undefined;
// let z;

// console.log(typeof name);
// console.log(typeof age);
// console.log(typeof rating);
// console.log(typeof isCool);
// console.log(typeof x);
// console.log(typeof y);
// console.log(typeof z);

// // Concatenation
// console.log('My name is ' + name + ' and I am ' + age);
// // Template String
// const hello = `My name is ${name} and I am ${age}`;
// console.log(hello);

// const s = 'Hello World!';

// console.log(s.length);
// console.log(s.toLowerCase());
// console.log(s.substring(0,5).toUpperCase());
// console.log(s.split(''));

// //Arrays

// const numbers = new Array(1,2,3,4,5,6,7,8);
// console.log(numbers);

// const fruits = ['apples', 'oranges', 'pears', 10, true];

// fruits[3] = 'grapes';
// fruits.unshift('strawberries');
// fruits.pop();

// console.log(Array.isArray('hello'));
// console.log(fruits.indexOf('oranges'));

// console.log(fruits);

// const person = {
//     firstName: 'John',
//     lastName: 'Doe',
//     age: 30,
//     hobbies: ['music', 'movies', 'sports'],
//     address:{
//         street: '50 main st',
//         city: 'Boston',
//         state: 'MA'
//     }
// }

// console.log(person);
// console.log(person.hobbies[1]);

// const{ firstName, lastName, address: {city}} = person;

// console.log(firstName);
// console.log(city);

// person.email = 'John@gmail.com';

// console.log(person);

// const todos = [
//     {
//         id: 1,
//         text: 'Take out trash',
//         isCompleted: true
//     },
//     {
//         id: 2,
//         text: 'Meeting with boss',
//         isCompleted: true
//     },
//     {
//         id: 3,
//         text: 'Dentist appt',
//         isCompleted: false
//     }
// ];

// console.log(todos[1].text);

// const todoJSON = JSON.stringify(todos);
// console.log(todoJSON);

// // For loop

// for(let i = 0; i <= 10; i++){
//     console.log(`For Loop Number: ${i}`);
// }

// // While Loop
// let i = 0;
// while(i < 10){
//     console.log(`While Loop Number: ${i}`);
//     i++;
// }

// // Loop- through array

// for(let todo of todos){
//     console.log(todo.text);
// }

// // forEach, map, filter
// todos.forEach(function(todo){
//     console.log(todo.id);
// });

// const todoText = todos.map(function(todo){
//     return todo.text;
// });

// console.log(todoText);

// const todoCompleted = todos.filter(function(todo){
//     return todo.isCompleted === true;
// }).map(function(todo){
//     return todo.text;
// });

// console.log(todoCompleted);

// // if statements

// const v = 20;

// // == does not match data types, === compares data types also
// if(v === 10){
//     console.log('v is 10');
// }
// else if(v > 10){
//     console.log('v is greater than 10')
// }
// else{
//     console.log('v is less than 10');
// }

// //method

// function addNums(num1 = 1, num2 = 1){
//    return(num1 + num2);
// }

// const addNumsAlt = (num1 =1, num2 = 1) =>  num1 + num2;

// console.log(addNums(1,2));


// console.log(addNumsAlt(1,4));

// //consructors

// //es5
// // function Person(firstName, lastName, dob) {
// //     this.firstName = firstName;
// //     this.lastName = lastName;
// //     this.dob = new Date(dob);
// // }

// // Person.prototype.getBirthYear = function() {
// //     return this.dob.getFullYear();
// // }
// // Person.prototype.getFullName = function(){
// //     return `${this.firstName} ${this.lastName}`;
// // }

// //Class
// class Person {
//     constructor(firstName, lastName, dob){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.dob = new Date(dob);
//     }

//     getBirthYear(){
//         return this.dob.getFullYear();
//     }

//     getFullName(){
//         return `${this.firstName} ${this.lastName}`;
//     }
// }

// const myPerson = new Person('Nick', 'Eisner', '1/16/2002');

// console.log(myPerson);

// console.log(myPerson.getBirthYear());

// console.log(myPerson.getFullName());

//single element selectors
//const form = document.getElementById('my-form');
//console.log(form);

//console.log(document.querySelector('h1'));
//multi element
//console.log(document.querySelectorAll('.item'));
//console.log(document.getElementsByClassName('item'));

//const ul = document.querySelector('.items');

//ul.remove();
//ul.lastElementChild.remove();
//ul.firstElementChild.textContent = 'Hello';
//ul.children[1].innerText = 'Nick';
//ul.lastElementChild.innerHTML = '<h1>Hello<h1>';

// const btn = document.querySelector('.btn');
// //btn.style.background = 'red';

// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelector('#my-form')
//     .style.background = '#ccc';
//     document.querySelector('body').classList.add('bg-dark');
//     document.querySelector('.items')
//     .lastElementChild.innerHTML = '<h1>Hello</h1>';
// });

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    
    if(nameInput.value === '' || emailInput.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

        userList.appendChild(li);

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}
