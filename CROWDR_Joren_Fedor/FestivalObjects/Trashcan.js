class Trashcan {

    constructor(capacity, emptyingTime) {
        this._emptyingTime = emptyingTime;
        this._capacity = capacity;
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