class DrinkStand {
    _maxVisitors;
    _squares;
    _x;
    _y;

    constructor() {
        this._squares = 1*2;
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

    set maxVisitors(value) {
        this._maxVisitors = value;
    }
}