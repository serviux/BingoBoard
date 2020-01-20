let numbers = {
    "B": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "I": [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    "N": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    "G": [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    "O": [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
};


const key = "CallStack";
let callStack = []



function find(n1){
    let i = 0;
    for(; i < callStack.length; i++){
        if(n1 === callStack[i] )
        {
            return i
        }
    }
    return -1;
}

function CalledNumber() {
    debugger;
    let hasColor = this.classList.contains("red") || this.classList.contains("purple")
    console.log(callStack)
    if (callStack.length === 0) {
        this.classList.add("purple");
        callStack.push(this.innerHTML);
    } else if(hasColor) 
    {
       let i = find(this.innerHTML)
       callStack.splice(i, 1)
       let top = callStack.length -1;
       if(top >= 0)
       {
        let old = _getNumber(callStack[top])
        old.classList.remove("red")
        old.classList.add("purple")
       }
       this.classList.remove("red")
       this.classList.remove("purple")
       
    }
    
    else {
        
        this.classList.add("purple");
        let top = callStack.length -1
        let old = _getNumber(callStack[top])
        old.classList.add("red")
        old.classList.remove("purple")
        callStack.push(this.innerHTML)
    }
    store_in_session()
}
//Stores callstack in session variable
function store_in_session(){
    sessionStorage.setItem(key, callStack)
}
function get_from_session(){
    return sessionStorage.getItem(key)
}
function remove_from_session(){
    sessionStorage.removeItem(key)
}

function undo() {
    let top = callStack.length - 1;
    callStack[top].classList.remove("purple")
    callStack.splice(top, 1)
    top = callStack.length - 1;
    callStack[top].classList.add("purple")
    callStack[top].classList.remove("red")
}

//creates a new element and adds a css class to it
function _newElement(element, cssClass) {
    let x = document.createElement(element);
    x.classList.add(cssClass);
    return x;
}

function _getNumber(num){
    return document.querySelector("#n" + num)
}


function create_board() {
    let wrapper = document.getElementById("wrapper");
    for (let letter in numbers) {

        //create the row for the table
        let node = _newElement("div", "row");

        //create the header column for the table and add the header class to it
        let header = _newElement("div", "col");
        header.classList.add("header");
        //set the text to be a letter in BINGO
        header.innerHTML = letter;

        //have the row append the column
        node.appendChild(header);

        //for every number per each bingo letter.
        for (let i = 0; i < numbers[letter].length; i++) {
            //store the number in a variable
            let num = numbers[letter][i];
            //create the column, then add the number-container class
            let col = _newElement("div", "col");
            col.id = "n"+ numbers[letter][i];
            col.classList.add("number-container");

            //set the text equal to the number.
            let text = document.createTextNode(num.toString());

            //have the innermost container add the text
            col.appendChild(text);



            //add an event listener to the column to change its style when clicked
            col.addEventListener("click", CalledNumber);

            //have the row append the column
            node.appendChild(col);
        }
        //have the wrapper append the row.
        wrapper.appendChild(node);
    }
}

function board_reload(){
    debugger;
    let called = get_from_session()
    if(called === null || called.length === 0) throw RangeError("No numbers where called")
    remove_from_session()
    for(let i in called){
        let el = _getNumber(i)
        el.onclick()

    }
    
}


function resetNumbers() {
    //selects all the divs with the class red
    let numbers = document.querySelectorAll("div.number-container");
    console.log(numbers);
    //removes the class from them.
    for (i = 0; i < numbers.length; i++) {

        numbers[i].classList.remove("red");
        numbers[i].classList.remove("purple");
    }
    callStack = [];
    remove_from_session()
}