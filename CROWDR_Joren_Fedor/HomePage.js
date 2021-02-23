
let nextInputButton = document.querySelector(".nextInput");
nextInputButton.addEventListener("click",addTents);
let regionForm = document.querySelector('.regionForm');


function addTents(){
    let newTag = document.createElement("label");
    newTag.innerHTML = "How many tents does your region have?";
    regionForm.append(newTag);
    let newInput = document.createElement("input");
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newInput);
    nextInputButton.removeEventListener("click", addTents);
    nextInputButton.addEventListener("click",addEatingStands);
}

function addEatingStands() {
    let newTag = document.createElement("label");
    newTag.innerHTML = "How many food-stands does your region have?";
    regionForm.append(newTag);
    let newInput = document.createElement("input");
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newInput);
    nextInputButton.removeEventListener("click", addEatingStands);
    nextInputButton.addEventListener("click",addDrinkStands)
}

function addDrinkStands() {
    let newTag = document.createElement("label");
    newTag.innerHTML = "How many drinking stands does your region have?";
    regionForm.append(newTag);
    let newInput = document.createElement("input")
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newInput);
    nextInputButton.removeEventListener("click", addDrinkStands);
}