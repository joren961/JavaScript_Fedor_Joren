class FoodStand {

    _foodType;
    _maxVisitors;

    constructor() {

    }

    get maxVisitors() {
        return this._maxVisitors;
    }

    get foodType() {
        return this._foodType;
    }

    set maxVisitors(maxVisitors) {
        this.maxVisitors = maxVisitors;
    }

    set foodType(foodType) {
        this.foodType = foodType;
    }
}