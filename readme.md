1️⃣ What is the difference between var, let, and const?
Ans: 
var is an old way to declare variables. It can be redeclared and updated. It ignores blocks like if or for.
Let can be updated but not redeclared. It respects block scope {}.
Const cannot be updated or redeclared. It is used by default unless if it is known that the value will change.


2️⃣ What is the spread operator (...)?
Ans:
spread operator spreads the items of an array or object into individual pieces.
e.g. 
const arr = [1,2,3];
console.log(...arr) 

output:
1 2 3


3️⃣ What is the difference between map(), filter(), and forEach()?
Ans:
forEach() just loops and does something. Returns nothing.
map() loops and returns a new array with transformed values.
filter() loops and returns a new array with only items that pass a condition.

4️⃣ What is an arrow function?
Ans:
 arrow functions are a shorter and cleaner way to write functions.
e.g.
Regular function:
function add(a, b){
  return a + b;
}

Arrow function:
const add = (a, b) => a + b;


5️⃣ What are template literals?
Ans: 
Template literals are a cleaner way to write strings using beckticks instead of quotes. Here variables can be directly embedded. It is also used for writing multi line strings.

e.g.1
const twoLineString = `Hello,
                       world`
output:
Hello,
world

e.g.2
const name = "Mahdi";

old way:  
console.log("name is " + name + "!");

template literal:
console.log(`name is ${name}!`);

