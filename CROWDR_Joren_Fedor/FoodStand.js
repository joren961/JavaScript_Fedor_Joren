class FoodStand {
    _squares;
    _foodType;
    _maxVisitors;

    constructor() {
        this._squares = 1*1;
    }

    get squares() {
        return this._squares;
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