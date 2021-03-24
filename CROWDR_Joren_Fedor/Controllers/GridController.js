class GridController {

    _replaceDiv;
    _container;
    _optionView;
    _gridview;

    constructor()
    {
        this._replaceDiv = document.getElementById('replaceDiv');

        this._container = document.createElement('div');
        this._container.className = 'container';
        //this._replaceDiv.appendChild(this._container);

        this._optionView = document.createElement('div');
        this._optionView.className = 'one';
        this._container.appendChild(this._optionView);

        this._gridview = document.createElement('div');
        this._gridview.className = 'two';
        this._container.appendChild(this._gridview);



    }

    render()
    {
        this._replaceDiv.innerHTML = '';
        this._replaceDiv.appendChild(this._container);
    }


}

let gridController = new GridController();
gridController.render();
