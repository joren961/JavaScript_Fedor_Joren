class DetailsView {

    _detailsController;

    constructor(detailsController) {
        this._detailsController = detailsController;
    }

    openDetails(object, gridView) {
        let oldDetailsBox = document.querySelector('.detailsBox')
        if (document.querySelector('.detailsBox') != null) {
            gridView.removeChild(oldDetailsBox);
        }

        let details = document.createElement('div');
        details.className = "detailsBox";

        let label = document.createElement('h2');
        label.innerText = object._type + " " + object._id;
        details.appendChild(label);

        this.addInputBasedOnType(object,details);

        if (object._type !== "Toilet building") {
            let submit = document.createElement('a');
            submit.addEventListener('click',()=>this._detailsController.submitDetails(object));
            submit.className="button";
            submit.id="apply";
            submit.innerHTML = "Apply";
            submit.style.border = "#357EC7 outset 3px";
            details.appendChild(submit);
        }
        if (object._type === "Trashcan") {
            let maxCapacity = document.createElement('div');
            maxCapacity.id = "trashMax";
            let capacity = document.createElement('div');
            capacity.id = "trashFill";
            let capacityLabel = document.createElement('label');
            capacityLabel.innerText = " KG";
            details.appendChild(capacityLabel);
            capacity.appendChild(maxCapacity);
            details.appendChild(capacity);
            this.trashAnimate(object, capacity, capacityLabel);
        }

        gridView.appendChild(details);
    }

    trashAnimate(object, capacity, capacityLabel) {
            let id = setInterval(frame, 1000);
            function frame() {
                capacityLabel.innerText = object._currentCapacity+ " KG";
                let height = object._currentCapacity / object._capacity * 100;
                capacity.style.height = height + "px";
            }
    }

    updateTreeImage(treeObject)
    {
        console.log(treeObject)
        let getImg = document.getElementById(treeObject._type + treeObject._id)
        switch (treeObject._squares) {
            case 1:
                getImg.src = "dist/Resources/highTree(1x1).png";

                break;
            case 2:
                getImg.src = "dist/Resources/wideTree(2x1).png";

                break;
            case 9:
                getImg.src = "dist/Resources/shadowTree(3x3).png";
                break;
        }

    }

    addInputBasedOnType(object,details) {
        let newLabel = document.createElement('label');
        let newInput = document.createElement('input');
        newInput.required = true;
        newLabel.innerText = "Maximum visitors:";
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min', '0');
        newInput.setAttribute('placeholder', '0');
        newInput.className= "MaxVisitors";

        switch (object._type) {
            case "Drink stand":
                if (object._maxVisitors != null) {
                    newInput.value = object._maxVisitors;
                }
                details.appendChild(newLabel);
                details.appendChild(newInput);
                break;
            case "Food stand":
                if (object._maxVisitors != null) {
                    newInput.value = object._maxVisitors;
                }
                let foodLabel = document.createElement('label');
                let foodInput = document.createElement('input');
                foodLabel.innerText = "Type of cuisine";
                foodInput.setAttribute("type","text");
                foodInput.style.width = "150px";
                foodInput.setAttribute('placeholder','For example: Kebab');
                foodInput.id= "FoodType";
                if (object._foodType != null) {
                    foodInput.value = object._foodType;
                }
                details.appendChild(newLabel);
                details.appendChild(newInput);
                details.appendChild(foodLabel);
                details.appendChild(foodInput);
                break;
            case "Tent":
                if (object._maxVisitors != null) {
                    newInput.value = object._maxVisitors;
                }
                let tentLabel = document.createElement('label');
                let tentInput = document.createElement('input');
                tentLabel.innerText = "Opening time";
                tentInput.setAttribute('type','time');
                tentInput.style.width = "100px";
                tentInput.setAttribute('placeholder','00:00');
                tentInput.id ="TentOpeningTime";
                if (object._openingTime != null) {
                    tentInput.value = object._openingTime;
                }
                details.appendChild(newLabel);
                details.appendChild(newInput);
                details.appendChild(tentLabel);
                details.appendChild(tentInput);
                break;
            case "Toilet building":
                break;
            case "Trashcan":
                if (object._capacity != null) {
                    newInput.value = object._capacity;
                }
                newLabel.innerText = "Capacity in KG";
                newInput.className = "TrashCapacity";
                let trashLabel = document.createElement('label');
                trashLabel.innerText = "Emptying time";
                let trashInput = document.createElement('input');
                trashInput.setAttribute('type','time');
                trashInput.style.width = "100px";
                trashInput.id="TrashEmptyTime";
                if (object._emptyingTime != null) {
                    trashInput.value = object._emptyingTime;
                }
                details.appendChild(newLabel);
                details.appendChild(newInput);
                details.appendChild(trashLabel);
                details.appendChild(trashInput);
                break;
            case "Tree":
                let trees = ['High Tree', 'Wide Tree', 'Shadow Tree'];
                for (const tree of trees) {
                    let label = document.createElement('label');
                    label.innerText = tree;
                    let input = document.createElement('input');
                    if (object._treeType != null) {
                        if (tree === object._treeType) {
                            input.checked = true;
                        }
                    } else if (tree === "High Tree"){
                        input.checked = true;
                    }
                    input.setAttribute('value', tree);
                    input.setAttribute('name', 'Tree');
                    input.setAttribute('type', 'radio');
                    input.className = "TreeRadio";
                    details.appendChild(label);
                    details.appendChild(input);
                }
                break;
            default: break;
        }
    }
}