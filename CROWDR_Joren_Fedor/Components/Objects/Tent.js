class Tent {
    _id;
    _type;
    _maxVisitors;
    _openingTime;
    _squares;
    _x;
    _y;

    constructor(id) {
        this._id = id;
        this._type = "Tent";
        this._squares = 3*3;
    }

    getCoordinates()
    {
        return [this.getX(), this.getY()]
    }

    getX() {
        return this._x
    }

    getY() {
        return this._y;
    }

    setCoordinates(xCord, yCord) {
        this._x = xCord;
        this._y = yCord;
    }

    resetCoordinates() {
        this._x = null;
        this._y = null;
    }



}