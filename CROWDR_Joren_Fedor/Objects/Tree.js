class Tree {
    _squares;
    _treeType;
    _x;
    _y;

    set treeType(value) {
        this._treeType = value;
        if (this._treeType === 'High Tree') {
            this._squares = 1*1;
        } else if (this._treeType === 'Wide Tree') {
            this._squares = 2*1;
        } else {
            this._squares = 3*3;
        }
    }
}