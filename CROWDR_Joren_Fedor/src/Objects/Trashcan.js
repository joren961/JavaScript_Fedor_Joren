export default class Trashcan {
    _id;
    _type;
    _squares;
    _emptyingTime;
    _capacity;
    _currentCapacity;
    _x;
    _y;
    constructor(id) {
        this._id = id;
        this._type = "Trashcan";
        this._currentCapacity = 0;
        this._squares = 1*1;
    }
}