class DrinkStand {
    _maxVisitors;
    _squares;

    constructor() {
        this._squares = 1*2;
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