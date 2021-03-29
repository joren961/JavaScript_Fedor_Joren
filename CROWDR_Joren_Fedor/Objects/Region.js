class Region {
    _name;
    _maxVisitors;
    _foodstands;
    _drinkstands;
    _tents;
    _toiletbuildings;
    _trashcans;
    _trees;



    constructor(name, maxVisitors) {
        this._name = name;
        this._maxVisitors = maxVisitors;
    }

    get name() {
        return this._name;
    }

    get maxVisitors() {
        return this._maxVisitors;
    }

    get trashcans() {
        return this._trashcans;
    }

    set trashcans(value) {
        this._trashcans = value;
    }

    get trees() {
        return this._trees;
    }

    set trees(value) {
        this._trees = value;
    }

    get toiletbuildings() {
        return this._toiletbuildings;
    }

    set toiletbuildings(value) {
        this._toiletbuildings = value;
    }

    get foodstands() {
        return this._foodstands;
    }

    set foodstands(value) {
        this._foodstands = value;
    }

    get tents() {
        return this._tents;
    }

    set tents(value) {
        this._tents = value;
    }

    get drinkstands() {
        return this._drinkstands;
    }

    set drinkstands(value) {
        this._drinkstands = value;
    }
}