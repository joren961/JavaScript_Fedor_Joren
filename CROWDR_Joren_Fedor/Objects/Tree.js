class Tree {
    _squares;
    _treeType;

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