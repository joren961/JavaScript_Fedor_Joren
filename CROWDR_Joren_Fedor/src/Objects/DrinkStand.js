export default class DrinkStand {
    _id;
    _type;
    _maxVisitors;
    _squares;
    _x;
    _y;

    constructor(id) {
        this._id = id;
        this._squares = 1*2;
        this._type = "Drink stand";
    }

}