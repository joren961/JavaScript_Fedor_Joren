class DetailsController {
    _storageController;
    _regionName;
    _detailsView;

    constructor(storagecontroller, regionName) {
        this._storageController = storagecontroller;
        this._regionName = regionName;
        this._detailsView = new DetailsView(this);
    }

    openDetails(object, gridView) {
        this._detailsView.openDetails(object,gridView);
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
                trashTime = parseInt(document.querySelector('#TrashEmptyTime').value);
                object._capacity = trashCapacity;
                object._emptyingTime = trashTime;
                break;
            case "Tree":
                //todo
                break;
            default : return;
        }
        this._storageController.updateRegionObject(this._regionName,object);
        
    }
}