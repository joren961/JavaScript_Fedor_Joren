class DetailsController {
    _storageController;
    _regionName;
    _detailsView;

    constructor(storagecontroller, regionName) {
        this._storageController = storagecontroller;
        this._regionName = regionName;
        this._detailsView = new DetailsView(this);
    }

    openDetails(object, gridWrap) {
        this._detailsView.openDetails(object,gridWrap);
    }

    submitDetails(object) {
        let maxVisitors;
        let foodType;
        let tentTime;
        let trashCapacity;
        let trashTime;
        switch (object._type) {
            case "Food stand":
                maxVisitors = parseInt(document.querySelector('.MaxVisitors').value);
                foodType = document.querySelector('#FoodType').value;
                object._maxVisitors = maxVisitors;
                object._foodType = foodType;
                break;
            case "Drink stand":
                maxVisitors = parseInt(document.querySelector('.MaxVisitors').value);
                object._maxVisitors = maxVisitors;
                break;
            case "Tent":
                maxVisitors = parseInt(document.querySelector('.MaxVisitors').value);
                tentTime = document.querySelector('#TentOpeningTime').value;
                object._maxVisitors = maxVisitors;
                object._openingTime = tentTime;
                break;
            case "Trashcan":
                trashCapacity = parseInt(document.querySelector('.TrashCapacity').value);
                trashTime = document.querySelector('#TrashEmptyTime').value;
                object._capacity = trashCapacity;
                object._emptyingTime = trashTime;
                break;
            case "Tree":
                for (const treeInput of document.querySelectorAll('.TreeRadio')) {
                    if (treeInput.checked) {

                        object._treeType = treeInput.value;
                        if (treeInput.value === "High Tree") {
                            object._squares = 1;
                        } else if (treeInput.value === "Wide Tree") {
                            object._squares = 2;
                        } else {
                            object._squares = 3*3;
                        }
                        this._detailsView.updateTreeImage(object);
                        break;
                    }
                }
                break;
            default : return;
        }
        this._storageController.updateRegionObject(this._regionName,object);
    }

}