class FoodStand {

    constructor(maxVisitors, foodType) {
        this._foodType = foodType;
        this._maxVisitors = maxVisitors;
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