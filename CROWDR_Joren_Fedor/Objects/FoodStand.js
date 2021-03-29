class FoodStand {
    _squares;
    _foodType;
    _maxVisitors;
    _x;
    _y;

    constructor() {
        this._squares = 1*1;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
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