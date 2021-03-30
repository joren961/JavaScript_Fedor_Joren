class DetailsController {
    _storageController;
    _regionName;

    constructor(storagecontroller, regionName) {
        this._storageController = storagecontroller;
        this._regionName = regionName;
    }

    openDetails(object, type, gridView) {
        let oldDetailsBox = document.querySelector('.detailsBox')
        if (document.querySelector('.detailsBox') != null) {
            gridView.removeChild(oldDetailsBox);
        }

        let details = document.createElement('div');
        details.className = "detailsBox";

        let label = document.createElement('h2');
        label.innerText = type + " " + object._id;
        details.appendChild(label);

        this.addInputBasedOnType(type,details);

        let submit = document.createElement('a');
        submit.addEventListener('click',()=>this.submitDetails(object, type));
        submit.className="button";
        submit.innerHTML = "Apply";
        submit.style.border = "#357EC7 outset 3px";
        details.appendChild(submit);
        gridView.appendChild(details);
    }

    addInputBasedOnType(type,details) {
        let newLabel = document.createElement('label');
        let newInput = document.createElement('input');
        newInput.required = true;
        newLabel.innerText = "Maximum visitors:";
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('min', '0');
        newInput.setAttribute('placeholder', '0');
        newInput.className= "MaxVisitors";

        switch (type) {
            case "Drink stand":
                details.appendChild(newLabel);
                details.appendChild(newInput);
                break;
            case "Food stand":
                let foodLabel = document.createElement('label');
                let foodInput = document.createElement('input');
                foodLabel.innerText = "Type of cuisine";
                foodInput.setAttribute("type","text");
                foodInput.style.width = "150px";
                foodInput.setAttribute('placeholder','For example: Kebab');
                foodInput.id= "FoodType";
                details.appendChild(newLabel);
                details.appendChild(newInput);
                details.appendChild(foodLabel);
                details.appendChild(foodInput);
                break;
            case "Tent":
                let tentLabel = document.createElement('label');
                let tentInput = document.createElement('input');
                tentLabel.innerText = "Opening time";
                tentInput.setAttribute('type','time');
                tentInput.style.width = "100px";
                tentInput.setAttribute('placeholder','00:00');
                tentInput.id ="TentOpeningTime";
                details.appendChild(newLabel);
                details.appendChild(newInput);
                details.appendChild(tentLabel);
                details.appendChild(tentInput);
                break;
            case "Toilet building":
                break;
            case "Trashcan":
                newLabel.innerText = "Capacity in KG";
                newInput.className = "TrashCapacity";
                let trashLabel = document.createElement('label');
                trashLabel.innerText = "Emptying time in hours";
                let trashInput = document.createElement('input');
                trashInput.setAttribute('type','number');
                trashInput.setAttribute('placeholder','0');
                trashInput.id="TrashEmptyTime";
                details.appendChild(trashLabel);
                details.appendChild(trashInput);
                break;
            case "Tree":
                let trees = ['High Tree', 'Wide Tree', 'Shadow Tree'];
                for (const tree of trees) {
                    let label = document.createElement('label');
                    label.innerText = tree;
                    let input = document.createElement('input');
                    if (tree === "High Tree") {
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

    submitDetails(object, type) {
        let maxVisitors = parseInt(document.querySelector('.MaxVisitors').value);
        let foodType = document.querySelector('#FoodType').value;
        let tentTime = document.querySelector('#TentOpeningTime').value;
        let trashCapacity = parseInt(document.querySelector('.TrashCapacity').value);
        let trashTime = parseInt(document.querySelector('.TrashEmptyTime').value);
        switch (type) {
            case "Food stand":
                object._maxVisitors = maxVisitors;
                object._foodType = foodType;
                break;
            case "Drink stand":
                object._maxVisitors = maxVisitors;
                break;
            case "Tent":
                object._maxVisitors = maxVisitors;
                object._openingTime = tentTime;
                break;
            case "Toilet building":
                break;
            case "Trashcan":
                object._capacity = trashCapacity;
                object._emptyingTime = trashTime;
                break;
            case "Tree":
                
                break;
        }
        console.log(object);
        this._storageController.updateRegionObject(this._regionName,object);
    }
}