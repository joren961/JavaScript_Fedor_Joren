
let nextInputButton = document.querySelector(".nextInput");
let resetButton = document.querySelector("#reset");
nextInputButton.addEventListener("click",addInput);
resetButton.addEventListener("click",resetForm);
let regionForm = document.querySelector('.regionForm');

function addInput() {
    let lastInputId = 0;
    for (let i = 0;i<=regionForm.childElementCount;i++) {
            if (i > lastInputId) {
                lastInputId = i;
            }

        console.log(lastInputId);
    }

    let newTag = document.createElement("label");
    let newInput = document.createElement("input");

    if (lastInputId === 2) {
        addTents(newTag,newInput);
    } else if (lastInputId === 4) {
        addFoodStands(newTag,newInput);
    } else if (lastInputId === 6) {
        addDrinkStands(newTag,newInput);
    } else if (lastInputId === 8) {
        addTrees(newTag,newInput);
    } else if (lastInputId === 10) {
        addToiletBuildings(newTag,newInput);
    } else if (lastInputId === 12) {
        addTrashcans(newTag,newInput);
    } else if (lastInputId === 14){
        let submit = document.createElement("a");
        submit.innerText = "Submit";
        submit.className = "button";
        submit.addEventListener("click",submitArea);
        regionForm.append(submit);
        nextInputButton.style.display = "none";
    }
}

function resetForm() {
    if (nextInputButton.style.display == "none") {
        nextInputButton.style.display = "block";
    }
    regionForm.innerHTML = "";
    let oldTag = document.createElement("label");
    oldTag.innerHTML="What is your region's name?";
    oldTag.id = "regionlabel"
    let oldInput = document.createElement("input");
    oldInput.setAttribute("type", "text")
    oldInput.setAttribute("placeholder","Region name..");
    oldInput.id = "regioninput";
    regionForm.append(oldTag);
    regionForm.append(oldInput);
}

function addTents(newTag, newInput){
    newTag.innerHTML = "How many tents does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addFoodStands(newTag, newInput) {
    newTag.innerHTML = "How many food-stands does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addDrinkStands(newTag, newInput) {
    newTag.innerHTML = "How many drinking stands does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addTrees(newTag, newInput) {
    newTag.innerHTML = "How many trees are in the area?"
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addToiletBuildings(newTag, newInput) {
    newTag.innerHTML = "How many toilet-buildings does your region have?"
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addTrashcans(newTag, newInput) {
    newTag.innerHTML = "How many trashcans does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function submitArea() {
    //TODO
}