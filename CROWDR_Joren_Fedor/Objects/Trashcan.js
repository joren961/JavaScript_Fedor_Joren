class Trashcan {
    _emptyingTime;
    _capacity;
    _x;
    _y;

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

    get capacity() {
        return this._capacity;
    }

    get emptyingTime() {
        return this._emptyingTime;
    }

    set capacity(capacity) {
        this.capacity = capacity;
    }

    set emptyingTime(emptyingTime) {
        this.emptyingTime = emptyingTime;
    }
}