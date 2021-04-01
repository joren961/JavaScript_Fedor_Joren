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

    set trashcans(trashcanObject) {
        this._trashcans = trashcanObject;
    }

    get trees() {
        return this._trees;
    }

    set trees(treeObject) {
        this._trees = treeObject;
    }

    get toiletbuildings() {
        return this._toiletbuildings;
    }

    set toiletbuildings(toiletBuildingObject) {
        this._toiletbuildings = toiletBuildingObject;
    }

    get foodstands() {
        return this._foodstands;
    }

    set foodstands(foodStandObject) {
        this._foodstands = foodStandObject;
    }

    get tents() {
        return this._tents;
    }

    set tents(tentObject) {
        this._tents = tentObject;
    }

    get drinkstands() {
        return this._drinkstands;
    }

    set drinkstands(drinkstandObject) {
        this._drinkstands = drinkstandObject;
    }


}