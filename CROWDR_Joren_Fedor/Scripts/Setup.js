
let nextInputButton = document.querySelector(".nextInput");
let resetButton = document.querySelector("#reset");
nextInputButton.addEventListener("click",addInput);
resetButton.addEventListener("click",resetForm);
let regionForm = document.querySelector('.regionForm');
let squareAmount = document.querySelector(".squaresLeft");

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
        subtractSquares(parseInt(document.querySelector(".tents").value) * 9);
        addFoodStands(newTag,newInput);
    } else if (lastInputId === 8) {
        subtractSquares(parseInt(document.querySelector(".foodStands").value) * 1);
        addDrinkStands(newTag,newInput);
    } else if (lastInputId === 10) {
        subtractSquares(parseInt(document.querySelector(".drinkStands").value) * 2);
        addTrees(newTag,newInput);
    } else if (lastInputId === 12) {
        addToiletBuildings(newTag,newInput);
    } else if (lastInputId === 14) {
        subtractSquares(parseInt(document.querySelector(".toilets").value) * 3);
        addTrashcans(newTag,newInput);
        let submit = document.createElement("a");
        submit.innerText = "Submit";
        submit.className = "button";
        submit.id="submit";
        submit.addEventListener("click",submitArea);
        regionForm.append(submit);
        nextInputButton.style.display = "none";
    }
}

function subtractSquares(squares) {
    if (isNaN(squares)) {
        return;
    } else {

        let totalSquares = parseInt(squareAmount.innerText);
        squareAmount.innerText = `${totalSquares - squares}`;
    }
}

function addTents(newTag, newInput){
    newTag.innerHTML = "How many tents does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    newInput.className = "tents";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addFoodStands(newTag, newInput) {
    regionForm.querySelector(".tents").readOnly = true;
    let maxValue;
    if (regionForm.querySelector(".tents").value > 0) {
        maxValue = 3;
    } else {
        maxValue = 6;
    }
    newTag.innerHTML = "How many food-stands does your region have? Maximum: " + maxValue;
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('max',maxValue);
    newInput.setAttribute('placeholder', '0');
    newInput.className = "foodStands";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addDrinkStands(newTag, newInput) {
    regionForm.querySelector(".foodStands").readOnly = true;
    let maxValue;
    if (regionForm.querySelector(".tents").value > 0) {
        maxValue = 2;
    } else {
        maxValue = 4;
    }
    newTag.innerHTML = "How many drinking stands does your region have? Maximum: " + maxValue;
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('max',maxValue);
    newInput.setAttribute('placeholder', '0');
    newInput.className = "drinkStands";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addTrees(newTag, newInput) {
    regionForm.querySelector(".drinkStands").readOnly = true;
    newTag.innerHTML = "How many trees are in the area?"
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    newInput.className = "trees";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addToiletBuildings(newTag, newInput) {
    regionForm.querySelector(".trees").readOnly = true;
    newTag.innerHTML = "How many toilet-buildings does your region have? Maximum: 5"
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('max','5');
    newInput.setAttribute('placeholder', '0');
    newInput.className = "toilets";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function addTrashcans(newTag, newInput) {
    regionForm.querySelector(".toilets").readOnly = true;
    newTag.innerHTML = "How many trashcans does your region have?";
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min','0');
    newInput.setAttribute('placeholder', '0');
    newInput.className = "trash";
    newInput.required = true;
    regionForm.append(newTag);
    regionForm.append(newInput);
}

function submitArea() {
    if (ValidateForm() === true) {
        if (localStorage.getItem("regions") === null) {
            let regions = [];
            localStorage.setItem("regions",JSON.stringify(regions));
        }
        let region = new Region(regionForm.querySelector(".regioninput").value, parseInt(regionForm.querySelector(".regionVisitorInput").value));
        regionForm.querySelectorAll("input").forEach(function (input) {
            switch (input.className) {
                case "tents":
                    let tents = [];
                    for (let i = 0; i<input.value; i++) {
                        tents[i] = new Tent();
                    }
                    region._tents = tents;
                    break;
                case "foodStands":
                    let foodStands = [];
                    for (let i = 0; i<input.value; i++) {
                        foodStands[i] = new FoodStand();
                    }
                    region._foodstands = foodStands;
                    break;
                case "drinkStands":
                    let drinkStands = [];
                    for (let i = 0; i<input.value; i++) {
                        drinkStands[i] = new DrinkStand();
                    }
                    region._drinkstands = drinkStands;
                    break;
                // case "trees":
                //     let trees = [];
                //     for (let i = 0; i<input.value; i++) {
                //         trees[i] = new Tree();
                //     }
                //     region._trees = trees;
                //     break;
                case "toilets":
                    let toilets = [];
                    for (let i = 0; i<input.value; i++) {
                        toilets[i] = new ToiletBuilding();
                    }
                    region._toiletbuildings = toilets;
                    break;
                case "trash":
                    let trashCans = [];
                    for (let i = 0; i<input.value; i++) {
                        trashCans[i] = new Trashcan();
                    }
                    region._trashcans = trashCans;
                    break;
            }
        })
        let regionArray = JSON.parse(localStorage.getItem("regions"));
        regionArray.push(region);
        localStorage.setItem("regions", JSON.stringify(regionArray));


        //hier
        fetch('RegionView.html')
            .then(data => data.text())
            .then(html => document.getElementById('replaceDiv').innerHTML = html);
    }
}

function ValidateForm() {
    let allAreFilled = true;
    let inputCorrect = true;
    let enoughSpace = true;
    let nameIsAvailable = true;
    regionForm.querySelectorAll(".validationMessage").forEach(function (validationMsg) {
        validationMsg.parentNode.removeChild(validationMsg);
    })
    regionForm.querySelectorAll("[required]").forEach(function(i) {
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
                    inputCorrect = false;
                    let error = document.createElement("label");
                    error.className = "validationMessage";
                    error.innerText = "Maximum: " + i.getAttribute("max");
                    i.parentNode.insertBefore(error,i);
                }
            }
        }
    })
    if (regionNameTaken(regionForm.querySelector(".regioninput").value)) {
        nameIsAvailable = false;
    }
    if (parseInt(squareAmount.innerText) < 0) {
        enoughSpace = false;
    }
    if (allAreFilled && inputCorrect && enoughSpace && nameIsAvailable === true) {
        return true;
    }
    else {
        if (!allAreFilled) {
            let error = document.createElement("label");
            error.className = "validationMessage";
            error.innerHTML = "Please fill in all of the required fields.";
            regionForm.prepend(error);
        }
        if (!enoughSpace) {
            let error = document.createElement("label");
            error.className = "validationMessage";
            error.innerHTML = "There is not enough space for the chosen festival objects.";
            regionForm.prepend(error);
        }
        if (!nameIsAvailable) {
            let error = document.createElement("label");
            error.className = "validationMessage";
            error.innerHTML = "That region name already exists. Please pick a different one.";
            regionForm.prepend(error);
        }
    }
}

function regionNameTaken(regionName) {
    let regions = localStorage.getItem("regions")
    if (regions != null) {
        regions = JSON.parse(regions);
        if (regions[0] != null) {
            for (const region of regions) {
                if (region!=null) {
                    if (region._name === regionName) {
                        return true;
                    }
                }
            }
        } else {
            return false;
        }
    } else {
        return false;
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
    squareAmount.innerText = "225";

    regionForm.append(tagName);
    regionForm.append(inputName);
    regionForm.append(tagVisitors);
    regionForm.append(inputVisitors);
}