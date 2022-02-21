# calculator
Calculator made in HTML, CSS, and JS. Project for The Odin Project

## Basic Requirements

**HTML**

For HTML, I'm going to use Flexbox to create a grid that contains a `display`, number buttons (0-9), 5 `operator` buttons (+, -, *, /, and =).

---
**CSS**

---
**JavaScript** 

* Functions for:

    * Addition
    * Subtraction
    * Multiplication
    * Division

* A function `operate()` that takes an `operator` and 2 numbers and calls one of the above functions on the numbers

* A function that populates the display after clicking on a number button

---

**Step-by-Step**

1. Create boilerplate HTML
2. Connect CSS and JS scripts to HTML
3. **HTML**
    1. Create a container to house and align the entire webpage
    2. Within that container, create another container to manage the items inside the calculator (buttons, display, etc)
    3. Add the following inside the calculator container:
        * A div for displaying the selected `number`, `operator`, and finally the `results`
        * 10 buttons for the numbers 0-9
        * 5 buttons for the `operators`, +, -, *, /, and =
        * A button for decimal
4. **CSS**
    1. Apply resets to all elements in the page
    2. Set container width and height to 100% of the viewport and hide overflow for neatness
    3. Apply `display: flex` to the container and set `flex-direction` to `column`
    4. 

5. **JavaScript**
    1. Add event listeners for each button needed
        1. Create global variables for `currentNum`, `operatingNum`, `operator`, and `result`
        2. Each number button must store its respective number in variable. When the user clicks a number *for the first time and hasn't yet clicked an operator*, that number is stored in `currentNum`, else it becomes the `operatingNum`
    2. Create functions for each basic operation
        1. `add()` takes `currentNum` and adds `operatingNum` to it
        2. `subtract()` takes `currentNum` and subtracts `operatingNum` from it
        3. `multiply()` takes `currentNum` and multiplies it by `operatingNum`
        4. `divide()` takes `currentNum` and divides it by `operatingNum`
    3. Create a function `operate()` that takes in a string `operator` and two numbers
        1. `operate()` will call one of the operation functions based on the string `operator` and pass them the two numbers provided.
        2. `operate()` will be called as a result of pressing the = button IF `currentNum`, `operatingNum`, and `operator` are valid and filled
    4. 

---

**Pseudocode**