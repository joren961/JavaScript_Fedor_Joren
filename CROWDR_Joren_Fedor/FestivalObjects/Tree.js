class Tree {

    constructor(treeType) {
        this._treeType = treeType;
    }

    get treeType() {
        return this._treeType;
    }

    set treeType(value) {
        this._treeType = value;
    }
}