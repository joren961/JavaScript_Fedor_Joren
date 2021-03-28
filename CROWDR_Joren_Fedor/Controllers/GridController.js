class GridController {

    _replaceDiv;
    _container;
    _optionView;
    _gridview;

    constructor()
    {
        this._replaceDiv = document.getElementById('replaceDiv');

        this._container = document.createElement('div');
        this._container.className = 'containerGridView';
        //this._replaceDiv.appendChild(this._container);

        this._optionView = document.createElement('div');
        this._optionView.className = 'menuWrapper';
        this._container.appendChild(this._optionView);

        this._gridview = document.createElement('div');
        this._gridview.className = 'gridWrapper';
        this._container.appendChild(this._gridview);

    }

    render()
    {
        this._replaceDiv.innerHTML = '';
        this._replaceDiv.appendChild(this._container);
        this.renderGrid();
        this.renderMenu();

    }

    renderGrid()
    {
        this._gridview.innerHTML = '';
        let newParent = document.createElement('div');
        newParent.className = 'gridView';
        this._gridview.appendChild(newParent);

        for(let x = 0; x < 225; x++)
        {
            let newCellGrid = document.createElement('div');
            newCellGrid.className = 'gridCell';
            //newCellGrid.draggable = true;
            //newCellGrid.ondragover = this.allowDrop(event);
            //newCellGrid.addEventListener('ondragover', function(){allowDrop(event)}, false)
            //newCellGrid.ondrop = drop(event);
            //newCellGrid.ondragover = drag(event);
            //newCellGrid.addEventListener('ondrop', function(){drop(event)}, false)
            //newCellGrid.id = x;
            newParent.appendChild(newCellGrid);
        }
    }

    renderMenu()
    {
        //render foodstand
        this.renderMenuItem('Foodstand', "Resources/foodStand(1x1).png", 5);

        //render drinkStand
        this.renderMenuItem('Drikstand', "Resources/drinkStand(1x2).png", 4);

        //render Tent
        this.renderMenuItem('Tent', "Resources/tent(3x3).png", 3);

        this.renderMenuItem('Default Tree', "Resources/highTree(1x1).png", 3);
    }

    renderMenuItem(type, imagesrc, amount)
    {
        let newMenuItem = document.createElement('div');
        let newTitle = document.createElement('p');
        newTitle.innerText = type + ": " + amount + " left";
        newTitle.className = 'menuItemTitle';
        newMenuItem.appendChild(newTitle);
        newMenuItem.className = 'menuItemWrapper';
        let newSquare = document.createElement('div');
        newSquare.className = 'oneByOne';
        let newDragble = document.createElement('img');
        newDragble.src = imagesrc;
        newSquare.className = 'oneByOne';

        newDragble.addEventListener('dragstart', function(){drag(event)}, false);
        newDragble.className = 'img-wrap';
        newDragble.draggable = true;

        newSquare.appendChild(newDragble);
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}
