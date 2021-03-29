class FormController {

    _StorageController;
    _regionForm;
    _squaresLeft;
    _nextInputButton;
    _resetButton;

    constructor(storageController) {
        this._StorageController = storageController;
        this._regionForm = document.querySelector('.regionForm');
        this._squaresLeft = document.querySelector(".squaresLeft");
        this._nextInputButton = document.querySelector(".nextInput");
        this._resetButton = document.querySelector("#reset");

        this._nextInputButton.addEventListener("click",()=>this.getNextInput());
        this._resetButton.addEventListener("click",()=>this.resetForm());
    }

    getNextInput() {
        let lastInputId = 0;
        for (let i = 0;i<=this._regionForm.childElementCount;i++) {
            if (i > lastInputId) {
                lastInputId = i;
            }
        }

        let newTag = document.createElement("label");
        let newInput = document.createElement("input");

        if (lastInputId === 4) {
            this.addTentInput(newTag,newInput);
        } else if (lastInputId === 6) {
            this.calculateSquaresLeft(parseInt(document.querySelector(".tents").value) * 9);
            this.addFoodInput(newTag,newInput);
        } else if (lastInputId === 8) {
            this.calculateSquaresLeft(parseInt(document.querySelector(".foodStands").value));
            this.addDrinkInput(newTag,newInput);
        } else if (lastInputId === 10) {
            this.calculateSquaresLeft(parseInt(document.querySelector(".drinkStands").value) * 2);
            this.addTreeInput(newTag,newInput);
        } else if (lastInputId === 12) {
            this.calculateSquaresLeft(parseInt(document.querySelector(".trees").value));
            this.addToiletInput(newTag,newInput);
        } else if (lastInputId === 14) {
            this.calculateSquaresLeft(parseInt(document.querySelector(".toilets").value) * 3);
            this.addTrashInput(newTag,newInput);
            let submit = document.createElement("a");
            submit.innerText = "Submit";
            submit.className = "button";
            submit.id="submit";
            submit.addEventListener("click",()=>this.submitForm());
            this._regionForm.append(submit);
            this._nextInputButton.style.display = "none";
        }
    }

    validateForm() {
        let allAreFilled = true;
        let inputCorrect = true;
        let enoughSpace = true;
        let nameIsAvailable = true;
        this._regionForm.querySelectorAll(".validationMessage").forEach(function (validationMsg) {
            validationMsg.parentNode.removeChild(validationMsg);
        })
        this._regionForm.querySelectorAll("[required]").forEach(function(i) {
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
        if (this._StorageController.checkRegionNameTaken(this._regionForm.querySelector(".regioninput").value)) {
            nameIsAvailable = false;
        }
        if (parseInt(this._squaresLeft.innerText) < 0) {
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
                this._regionForm.prepend(error);
            }
            if (!enoughSpace) {
                let error = document.createElement("label");
                error.className = "validationMessage";
                error.innerHTML = "There is not enough space for the chosen festival objects.";
                this._regionForm.prepend(error);
            }
            if (!nameIsAvailable) {
                let error = document.createElement("label");
                error.className = "validationMessage";
                error.innerHTML = "That region name already exists. Please pick a different one.";
                this._regionForm.prepend(error);
            }
        }
    }

    resetForm() {
        if (this._nextInputButton.style.display == "none") {
            this._nextInputButton.style.display = "block";
        }
        this._regionForm.innerHTML = "";
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
        this._squaresLeft.innerText = "225";

        this._regionForm.append(tagName);
        this._regionForm.append(inputName);
        this._regionForm.append(tagVisitors);
        this._regionForm.append(inputVisitors);
    }

    submitForm() {
        if (this.validateForm() === true) {
            if (localStorage.getItem("regions") === null) {
                let regions = [];
                localStorage.setItem("regions",JSON.stringify(regions));
            }
            let region = new Region(this._regionForm.querySelector(".regioninput").value, parseInt(regionForm.querySelector(".regionVisitorInput").value));
            this._regionForm.querySelectorAll("input").forEach(function (input) {
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
                    case "trees":
                        let trees = [];
                        for (let i = 0; i<input.value; i++) {
                            trees[i] = new Tree();
                        }
                        region._trees = trees;
                        break;
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

            //Werkt niet altijd
            fetch('RegionView.html')
                .then(data => data.text())
                .then(html => document.getElementById('replaceDiv').innerHTML = html);
        }
    }

    calculateSquaresLeft(squares) {
        if (isNaN(squares)) {
            return;
        } else {

            let totalSquares = parseInt(this._squaresLeft.innerText);
            this._squaresLeft.innerText = `${totalSquares - squares}`;
        }
    }

    addTentInput(newTag, newInput) {
        newTag.innerHTML = "How many tents does your region have?";
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min','0');
        newInput.setAttribute('placeholder', '0');
        newInput.className = "tents";
        newInput.required = true;
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
    }

    addDrinkInput(newTag, newInput) {
        let field = this._regionForm.querySelector(".foodStands");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        let maxValue;
        if (this._regionForm.querySelector(".tents").value > 0) {
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
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
    }

    addFoodInput(newTag, newInput) {
        let field = this._regionForm.querySelector(".tents");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        let maxValue;
        if (this._regionForm.querySelector(".tents").value > 0) {
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
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
    }

    addTreeInput(newTag, newInput) {
        let field = this._regionForm.querySelector(".drinkStands");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        newTag.innerHTML = "How many trees are in the area?"
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min','0');
        newInput.setAttribute('placeholder', '0');
        newInput.className = "trees";
        newInput.required = true;
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
    }

    addToiletInput(newTag, newInput) {
        let field = regionForm.querySelector(".trees");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        newTag.innerHTML = "How many toilet-buildings does your region have? Maximum: 5"
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min','0');
        newInput.setAttribute('max','5');
        newInput.setAttribute('placeholder', '0');
        newInput.className = "toilets";
        newInput.required = true;
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
    }

    addTrashInput(newTag, newInput) {
        let maxValue = Math.floor(0.05*parseInt(this._squaresLeft.innerText));
        let field = this._regionForm.querySelector(".toilets");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        newTag.innerHTML = "How many trashcans does your region have? Max: " + maxValue;
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min','0');
        newInput.setAttribute('max',maxValue);
        newInput.setAttribute('placeholder', '0');
        newInput.className = "trash";
        newInput.required = true;
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
    }


}