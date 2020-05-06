// This is my first JavaScript code
console.log('Hello World');

// Variables
let name = 'Charlotte'; // String Literal
console.log(name);

// Constants - cannot be reassigned
const interestRate = 0.3;

let age = 30; // Number Literal
let isApproved = true; // Boolean Literal
let firstName = null; 

// Javascript is dynamic; the variables types can change
// all numbers are of type number

// Objects
let person = {
    name: 'Charlotte',
    age: 23
};
person.name = 'John';
console.log(person.name)

// Bracket notation
let selection = 'name';
person[selection] = 'Mary';

let selectedColors = ['red', 'blue'];
selectedColors[2] = 3;
console.log(selectedColors);

// Functions
function greet(name, lastName) {
    console.log('Hello ' + name + ' ' + lastName);
}

greet('Charlotte', 'Merzbacher');
greet('Matthew', 'Merzbacher');

function square(number){
    return number * number; 
}

console.log(square(2))