
let numbers = {
    "B" : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    "I" : [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    "N" : [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
    "G" : [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
    "O" : [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
};

//checks to see if the classlist contains the class red
//if it does it removes it otherwise it adds it.
let NumberClick = function(){
    let containsRed = this.classList.contains("red")
    containsRed ? this.classList.remove("red") : this.classList.add("red");
   
} 

//creates a new element and adds a css class to it
function newElement(element, cssClass)
{
    let x = document.createElement(element);
    x.classList.add(cssClass);
    return x;
}

let wrapper = document.getElementById("wrapper");



for(let letter in numbers){

    //create the row for the table
    let node = newElement("div", "row");

    //create the header column for the table and add the header class to it
    let header = newElement("div", "col");
    header.classList.add("header");
    //set the text to be a letter in BINGO
    header.innerHTML = letter;

    //have the row append the column
    node.appendChild(header);
    
    //for every number per each bingo letter.
    for(let i=0 ;i< numbers[letter].length; i++)
    {   
        //store the number in a variable
        let num = numbers[letter][i];
        //create the column, then put another container in it for centering
        //additionally add the number-contrainer class.
        let col = newElement("div", "col");
        let div = newElement("div", "number-position");
        col.classList.add("number-container");

        //set the text equal to the number.
        let text = document.createTextNode(num.toString());

        //have the innermost container add the text
        div.appendChild(text);
        
        //have the column add the innermost div
        col.appendChild(div);
        
        //add an event listener to the column to change its style when clicked
        col.addEventListener("click", NumberClick);
        
        //have the row append the column
        node.appendChild(col);
    }
    //have the wrapper append the row.
    wrapper.appendChild(node);
}