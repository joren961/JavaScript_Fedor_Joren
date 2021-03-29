class Tree {
    _squares;
    _treeType;
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

    get squares() {
        return this._squares;
    }

    get treeType() {
        return this._treeType;
    }

    set treeType(value) {
        this._treeType = value;
        if (this._treeType === 1) {
            this._squares = 1*1;
        } else if (this._treeType === 2) {
            this._squares = 2*1;
        } else {
            this._squares = 3*3;
        }
    }
}