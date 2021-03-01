
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
    }

    let newTag = document.createElement("label");
    let newInput = document.createElement("input");

    if (lastInputId === 4) {
        addTents(newTag,newInput);
    } else if (lastInputId === 6) {
        addFoodStands(newTag,newInput);
    } else if (lastInputId === 8) {
        addDrinkStands(newTag,newInput);
    } else if (lastInputId === 10) {
        addTrees(newTag,newInput);
    } else if (lastInputId === 12) {
        addToiletBuildings(newTag,newInput);
    } else if (lastInputId === 14) {
        addTrashcans(newTag,newInput);
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
    let tagName = document.createElement("label");
    tagName.innerHTML="What is your region's name?";
    let inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("placeholder","Region name..");
    inputName.className = "regioninput";
    let tagVisitors = document.createElement("label");
    tagVisitors.innerHTML="How many visitors are allowed?";
    let inputVisitors = document.createElement("input");
    inputVisitors.setAttribute("type","number");
    inputVisitors.setAttribute("placeholder","0");

    regionForm.append(tagName);
    regionForm.append(inputName);
    regionForm.append(tagVisitors);
    regionForm.append(inputVisitors);
}

function addTents(newTag, newInput){
    newTag.innerHTML = "How many tents does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    newInput.id = "tents";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addFoodStands(newTag, newInput) {
    newTag.innerHTML = "How many food-stands does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('max','6');
    newInput.setAttribute('placeholder', '0');
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addDrinkStands(newTag, newInput) {
    newTag.innerHTML = "How many drinking stands does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('max','4');
    newInput.setAttribute('placeholder', '0');
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addTrees(newTag, newInput) {
    newTag.innerHTML = "How many trees are in the area?"
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addToiletBuildings(newTag, newInput) {
    newTag.innerHTML = "How many toilet-buildings does your region have?"
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('max','5');
    newInput.setAttribute('placeholder', '0');
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addTrashcans(newTag, newInput) {
    newTag.innerHTML = "How many trashcans does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function submitArea() {
    if (ValidateForm() === true) {

    } else {

    }
}

function ValidateForm() {
    debugger;
    let allAreFilled = true;
    let inputCorrect = true;
    regionForm.querySelectorAll(".validationMessage").forEach(function (i) {
        i.parentNode.removeChild(i);
    })
    regionForm.querySelectorAll("[required]").forEach(function(i) {
        console.log(i.value)
        if (i.value == null || i.value.trim() === "") {
            allAreFilled = false;
        }
        else if (i.getAttribute("type") === "number") {
            if(parseInt(i.value) < parseInt(i.getAttribute("min"))) {
                inputCorrect = false;
                let error = document.createElement("label");
                error.className = "validationMessage";
                error.innerText = "Minimum: " + i.getAttribute("min");
                i.parentNode.insertBefore(error,i);
            }
            else if (i.getAttribute("max") != null) {
                if (parseInt(i.value) > parseInt(i.getAttribute("max"))) {
                    console.log(i.getAttribute("max"));
                    inputCorrect = false;
                    let error = document.createElement("label");
                    error.className = "validationMessage";
                    error.innerText = "Maximum: " + i.getAttribute("max");
                    i.parentNode.insertBefore(error,i);
                }
            }
        }
    })
    if (allAreFilled && inputCorrect === true) {
        return true;
    } else if (!allAreFilled) {
        alert("Please fill all the required fields.");
    }
}