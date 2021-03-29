class ToiletBuilding {
    _squares;
    _x;
    _y;

    constructor() {
        this._squares = 1*3;
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
}