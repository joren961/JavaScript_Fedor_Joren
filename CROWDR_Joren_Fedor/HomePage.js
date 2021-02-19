
let nextInputButton = document.querySelector(".nextInput");
nextInputButton.addEventListener("click",addTents);
let regionForm = document.querySelector('.regionForm');


function addTents(){
    let newInput = document.createElement("input");
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('placeholder', 'Number of tents');
    nextInputButton.prepend(newInput);
    nextInputButton.removeEventListener("click", addTents);
    nextInputButton.addEventListener("click",addEatingStands);
}

function addEatingStands() {
    let newInput = document.createElement("input");
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('placeholder', 'Number of Food Stands');
    nextInputButton.prepend(newInput);
    nextInputButton.removeEventListener("click", addEatingStands);
    //add listener volgende object etc (suggestie)
}