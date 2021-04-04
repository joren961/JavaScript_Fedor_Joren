class FormController {

    _StorageController;
    _GridController;
    _NavigationController;
    _regionForm;
    _squaresLeft;
    _formView;
    _audio;

    constructor(storageController, gridController,navigationController) {
        this._StorageController = storageController;
        this._GridController = gridController;
        this._NavigationController = navigationController;
        this._regionForm = document.querySelector('.regionForm');
        this._squaresLeft = document.querySelector(".squaresLeft");
        this._formView = new FormView(this, this._regionForm, this._squaresLeft);
        this.setupAudio();
    }

    setupAudio() {
        this._audio = new Audio('dist/Resources/buttonclick.wav');
        this._audio.volume = 0.4;
    }

    getNextInput() {
        let lastInputId = 0;
        for (let i = 0;i<=this._regionForm.childElementCount;i++) {
            if (i > lastInputId) {
                lastInputId = i;
            }
        }
        this._formView.createNewInput(lastInputId);
    }

    validateForm() {
        let allAreFilled = true;
        let inputCorrect = true;
        let enoughSpace = true;
        let nameIsAvailable = true;
        this._formView.removeErrors();
        this._regionForm.querySelectorAll("[required]").forEach((i) => {
            if (i.value == null || i.value.trim() === "") {
                allAreFilled = false;
            }
            else if (i.getAttribute("type") === "number") {
                if(parseInt(i.value) < parseInt(i.getAttribute("min"))) {
                    inputCorrect = false;
                    this._formView.addMinError(i);
                }
                else if (i.getAttribute("max") != null) {
                    if (parseInt(i.value) > parseInt(i.getAttribute("max"))) {
                        inputCorrect = false;
                        this._formView.addMaxError(i);
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
            this._formView.checkAndAddErrors(allAreFilled,enoughSpace,nameIsAvailable);
        }
    }


    submitForm() {
        if (this.validateForm() === true) {
            this._audio.play();
            if (localStorage.getItem("regions") === null) {
                let regions = [];
                localStorage.setItem("regions",JSON.stringify(regions));
            }
            try {
                let region = new Region(this._regionForm.querySelector(".regioninput").value, parseInt(this._regionForm.querySelector(".regionVisitorInput").value));
                this._regionForm.querySelectorAll("input").forEach(function (input) {
                    switch (input.className) {
                        case "tents":
                            let tents = [];
                            for (let i = 0; i<input.value; i++) {
                                tents[i] = new Tent(i+1);
                            }
                            region._tents = tents;
                            break;
                        case "foodStands":
                            let foodStands = [];
                            for (let i = 0; i<input.value; i++) {
                                foodStands[i] = new FoodStand(i+1);
                            }
                            region._foodstands = foodStands;
                            break;
                        case "drinkStands":
                            let drinkStands = [];
                            for (let i = 0; i<input.value; i++) {
                                drinkStands[i] = new DrinkStand(i+1);
                            }
                            region._drinkstands = drinkStands;
                            break;
                        case "trees":
                            let trees = [];
                            for (let i = 0; i<input.value; i++) {
                                trees[i] = new Tree(i+1);
                            }
                            region._trees = trees;
                            break;
                        case "toilets":
                            let toilets = [];
                            for (let i = 0; i<input.value; i++) {
                                toilets[i] = new ToiletBuilding(i+1);
                            }
                            region._toiletbuildings = toilets;
                            break;
                        case "trash":
                            let trashCans = [];
                            for (let i = 0; i<input.value; i++) {
                                trashCans[i] = new Trashcan(i+1);
                            }
                            region._trashcans = trashCans;
                            break;
                    }
                })
                let regionArray = JSON.parse(localStorage.getItem("regions"));
                regionArray.push(region);
                localStorage.setItem("regions", JSON.stringify(regionArray));
                this._NavigationController.getRegions();
                this._GridController.createGrid(region._name);
            } catch (e) {
                this._formView.addCustomError("Rare error occurred, please refresh the page");
            }
        }
    }

    calculateSquaresLeft(squares) {
        if (isNaN(squares)) {
            return;
        } else {
            this._formView.updateSquaresLeft(squares);
        }
    }
}