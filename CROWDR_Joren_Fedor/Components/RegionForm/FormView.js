class FormView {
    _regionForm;
    _squaresLeft;
    _nextInputButton;
    _resetButton;
    _formController;

    constructor(formController, form, squares) {
        this._formController = formController;
        this._regionForm = form;
        this._squaresLeft = squares;
        this._nextInputButton = document.querySelector(".nextInput");
        this._resetButton = document.querySelector("#reset");
        this._nextInputButton.addEventListener("click", () => formController.getNextInput());
        this.animateNextInputButton();
        this._resetButton.addEventListener("click", () => this.resetForm());
    }

    createNewInput(lastInputId) {
        let newTag = document.createElement("label");
        let newInput = document.createElement("input");
        newInput.required = true;
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min', '0');
        newInput.setAttribute('placeholder', '0');
        newInput.setAttribute('value', '0');
        let submit;

        if (lastInputId === 4) {
            this.addTentInput(newTag, newInput);
        } else if (lastInputId === 6) {
            this._formController.calculateSquaresLeft(parseInt(document.querySelector(".tents").value) * 9);
            this.addFoodInput(newTag, newInput);
        } else if (lastInputId === 8) {
            this._formController.calculateSquaresLeft(parseInt(document.querySelector(".foodStands").value));
            this.addDrinkInput(newTag, newInput);
        } else if (lastInputId === 10) {
            this._formController.calculateSquaresLeft(parseInt(document.querySelector(".drinkStands").value) * 2);
            this.addTreeInput(newTag, newInput);
        } else if (lastInputId === 12) {
            this._formController.calculateSquaresLeft(parseInt(document.querySelector(".trees").value));
            this.addToiletInput(newTag, newInput);
        } else if (lastInputId === 14) {
            this._formController.calculateSquaresLeft(parseInt(document.querySelector(".toilets").value) * 3);
            this.addTrashInput(newTag, newInput);
            submit = document.createElement("a");
            submit.innerText = "Submit";
            submit.className = "button";
            submit.id = "submit";
            submit.addEventListener("click", () => this._formController.submitForm());
            this._nextInputButton.style.display = "none";
        }
        this._regionForm.append(newTag);
        this._regionForm.append(newInput);
        if (submit != null) {
            this._regionForm.append(submit);
        }
    }

    animateNextInputButton() {
        let icon = this._nextInputButton.querySelector('i');
        icon.style.transition = "all 0.3s linear";
        this._nextInputButton.addEventListener('mouseenter', () => {
            icon.style.color = "lightgreen";
        });
        this._nextInputButton.addEventListener('mouseleave', () => {
            icon.style.color = "white";
        });
    }

    addTentInput(newTag, newInput) {
        newTag.innerHTML = "How many tents does your region have?";
        newInput.className = "tents";
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
        newInput.setAttribute('max', maxValue);
        newInput.className = "foodStands";
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
        newInput.setAttribute('max', maxValue);

        newInput.className = "drinkStands";
    }

    addTreeInput(newTag, newInput) {
        let field = this._regionForm.querySelector(".drinkStands");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        newTag.innerHTML = "How many trees are in the area?"
        newInput.className = "trees";
    }

    addToiletInput(newTag, newInput) {
        let field = this._regionForm.querySelector(".trees");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        newTag.innerHTML = "How many toilet-buildings does your region have? Maximum: 5"
        newInput.setAttribute('max', '5');
        newInput.className = "toilets";
    }

    addTrashInput(newTag, newInput) {
        let maxValue;
        if (parseInt(this._squaresLeft.innerText) >= 0) {
            maxValue = Math.floor(0.05 * parseInt(this._squaresLeft.innerText));
        } else {
            maxValue = 0;
        }
        let field = this._regionForm.querySelector(".toilets");
        field.readOnly = true;
        field.style.border = "solid white 1.5px";
        newTag.innerHTML = "How many trashcans does your region have? Max: " + maxValue;
        newInput.setAttribute('max', maxValue);
        newInput.className = "trash";
    }

    updateSquaresLeft(squares) {
        let totalSquares = parseInt(this._squaresLeft.innerText);
        this._squaresLeft.innerText = `${totalSquares - squares}`;
    }

    removeErrors() {
        this._regionForm.querySelectorAll(".validationMessage").forEach(function (validationMsg) {
            validationMsg.parentNode.removeChild(validationMsg);
        })
    }

    addMinError(input) {
        let error = document.createElement("label");
        error.className = "validationMessage";
        error.id = "validationMessageMin";
        error.innerText = "Minimum: " + input.getAttribute("min");
        input.parentNode.insertBefore(error, input);
    }

    addMaxError(input) {
        let error = document.createElement("label");
        error.className = "validationMessage";
        error.id = "validationMessageMax";
        error.innerText = "Maximum: " + input.getAttribute("max");
        input.parentNode.insertBefore(error, input);
    }

    addCustomError(message) {
        let error = document.createElement("label");
        error.className = "validationMessage";
        error.innerText = message;
        this._regionForm.prepend(error);
    }

    checkAndAddErrors(allAreFilled, enoughSpace, nameIsAvailable) {
        if (!allAreFilled) {
            let error = document.createElement("label");
            error.className = "validationMessage";
            error.id = "validationMessageFilled";
            error.innerHTML = "Please fill in all of the required fields.";
            this._regionForm.prepend(error);
        }
        if (!enoughSpace) {
            let error = document.createElement("label");
            error.className = "validationMessage";
            error.id = "validationMessageSpace";
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

    resetForm() {
        if (this._nextInputButton.style.display === "none") {
            this._nextInputButton.style.display = "block";
        }
        this._regionForm.innerHTML = "";
        let tagName = document.createElement("label");
        tagName.innerHTML = "What is your region's name?";
        let inputName = document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("placeholder", "Region name..");
        inputName.className = "regioninput";
        inputName.required = true;
        let tagVisitors = document.createElement("label");
        tagVisitors.innerHTML = "How many visitors are allowed?";
        tagVisitors.className = "regionVisitorInput";
        let inputVisitors = document.createElement("input");
        inputVisitors.setAttribute("type", "number");
        inputVisitors.setAttribute("placeholder", "0");
        inputVisitors.required = true;
        this._squaresLeft.innerText = "225";

        this._regionForm.append(tagName);
        this._regionForm.append(inputName);
        this._regionForm.append(tagVisitors);
        this._regionForm.append(inputVisitors);
    }
}