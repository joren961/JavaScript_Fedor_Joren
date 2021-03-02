class Tent {
    _maxVisitors;
    _openingTime;
    _squares;

    constructor() {
        this._squares = 3*3;
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