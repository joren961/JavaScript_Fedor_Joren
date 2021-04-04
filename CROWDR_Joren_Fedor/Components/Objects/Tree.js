class Tree {
    _id;
    _type;
    _squares;
    _treeType;
    _x;
    _y;

    constructor(id) {
        this._id = id;
        this._type = "Tree";
    }

    set treeType(value) {
        this._treeType = value;
        if (this._treeType === 'High Tree') {
            this._squares = 1 * 1;
        } else if (this._treeType === 'Wide Tree') {
            this._squares = 2 * 1;
        } else {
            this._squares = 3 * 3;
        }
    }
}