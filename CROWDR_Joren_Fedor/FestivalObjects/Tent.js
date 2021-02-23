class Tent {

    constructor(maxVisitors, openingTime) {
        this._openingTime = openingTime;
        this._maxVisitors = maxVisitors;
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