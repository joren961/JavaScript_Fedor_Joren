class Tent {
    _maxVisitors;
    _openingTime;
    _squares;
    _x;
    _y;

    constructor() {
        this._squares = 3*3;
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

    get openingTime() {
        return this._openingTime;
    }

    set maxVisitors(maxVisitors) {
        this.maxVisitors = maxVisitors;
    }

    set openingTime(openingTime) {
        this.openingTime = openingTime;
    }
}