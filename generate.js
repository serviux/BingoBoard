
let numbers = {
    "B" : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    "I" : [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    "N" : [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
    "G" : [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
    "O" : [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
};


//makes the website interactive by allowing you to click the called numbers
//when you click on the number it turns purple for being the most recently called number
//after it becomes red when the next number is pressed. if a mistake is made
///the button can simply be pressed again and it coloration will disappear
let lastCall;
let NumberClick = function(){
    let containsColor = this.classList.contains("red") || this.classList.contains("purple");
    
    if(containsColor && lastCall == null)
    {
        this.classList.remove("purple");
        this.classList.remove("red");
    }
    else if(containsColor && lastCall != null)
    {
        this.classList.remove("purple");
        this.classList.remove("red"); 
        lastCall = null;
    }
     else if(!containsColor && lastCall != null) {
        lastCall.classList.add("red");
        this.classList.add("purple");
        lastCall.classList.remove("purple");
        lastCall = this;
    } else{
        this.classList.add("purple");
        lastCall = this;
    }
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
        //create the column, then add the number-container class
        let col = newElement("div", "col");
        col.classList.add("number-container");

        //set the text equal to the number.
        let text = document.createTextNode(num.toString());

        //have the innermost container add the text
        col.appendChild(text);
        
       
        
        //add an event listener to the column to change its style when clicked
        col.addEventListener("click", NumberClick);
        
        //have the row append the column
        node.appendChild(col);
    }
    //have the wrapper append the row.
    wrapper.appendChild(node);
}

function resetNumbers(){
    //selects all the divs with the class red
    let numbers = document.querySelectorAll("div.number-container");
    console.log(numbers);
    //removes the class from them.
    for(i=0; i < numbers.length; i++)
    {
        
        numbers[i].classList.remove("red");
        numbers[i].classList.remove("purple");
    }
    lastCall = null;
}


