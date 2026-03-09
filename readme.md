# JavaScript Fundamentals

## 1️⃣ What is the difference between var, let, and const?

**Ans:**

- `var` is an old way to declare variables. It can be redeclared and updated. It ignores blocks like `if` or `for`.
- `let` can be updated but not redeclared. It respects block scope `{}`.
- `const` cannot be updated or redeclared. It is used by default unless it is known that the value will change.

---

## 2️⃣ What is the spread operator (...)?

**Ans:**

The spread operator spreads the items of an array or object into individual pieces.
```js
const arr = [1,2,3];
console.log(...arr)
```

**Output:**
```
1 2 3
```

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

**Ans:**

- `forEach()` just loops and does something. Returns nothing.
- `map()` loops and returns a new array with transformed values.
- `filter()` loops and returns a new array with only items that pass a condition.

---

## 4️⃣ What is an arrow function?

**Ans:**

Arrow functions are a shorter and cleaner way to write functions.

**Regular function:**
```js
function add(a, b){
  return a + b;
}
```

**Arrow function:**
```js
const add = (a, b) => a + b;
```

---

## 5️⃣ What are template literals?

**Ans:**

Template literals are a cleaner way to write strings using backticks instead of quotes. Here variables can be directly embedded. It is also used for writing multi line strings.

**Example 1:**
```js
const twoLineString = `Hello,
                       world`
```

**Output:**
```
Hello,
world
```

**Example 2:**
```js
const name = "Mahdi";

// Old way
console.log("name is " + name + "!");

// Template literal
console.log(`name is ${name}!`);
```