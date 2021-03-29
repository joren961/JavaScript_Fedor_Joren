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
            //newCellGrid.addEventListener('ondragover', () => this.allowDrop(event));
            newCellGrid.addEventListener('dragover', ev => {
                ev.preventDefault();
            });
            //newCellGrid.addEventListener("drop", () => this.drop(event));
            newCellGrid.addEventListener("drop", ev => {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("text/plain");

                console.log(data);
                ev.target.appendChild(document.getElementById(data));
                this.renderMenu();
            });
            // newCellGrid.addEventListener("drop", () => {
            //
            //
            // });

            newParent.appendChild(newCellGrid);
        }
    }

    renderMenu()
    {
        //doe dit op basis van een object uit /Objects
        this._optionView.innerHTML = '';
        //render foodstand
        this.renderMenuItem('Foodstand', "Resources/foodStand(1x1).png", 5);

        //render drinkStand
        this.renderMenuItem('Drinkstand', "Resources/drinkStand(1x2).png", 4);

        //render Tent
        this.renderMenuItem('Tent', "Resources/tent(3x3).png", 3);

        this.renderMenuItem('High Tree', "Resources/highTree(1x1).png", 3);
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
        let newDragble = document.createElement('img');

        newDragble.src = imagesrc;
        newDragble.id = type;
        //newDragble.addEventListener('dragstart', () => this.drag(event));
        newDragble.addEventListener("dragstart", e => {
           e.dataTransfer.setData("text/plain", newDragble.id);
        });

        newDragble.draggable = true;
        newDragble.className = 'newDragble';

        //maakt details scherm on click
        newDragble.addEventListener('click',() => this.openDetails(type));

        newSquare.appendChild(newDragble);
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
    }

    openDetails(type) {
        let oldDetailsBox = document.querySelector('.detailsBox')
        if (document.querySelector('.detailsBox') != null) {
            this._gridview.removeChild(oldDetailsBox);
        }

        let details = document.createElement('div');
        details.className = "detailsBox";
        //op basis van object, inputs maken om info te setten
        switch (type) {
            case "Drinkstand": break;
            case "Foodstand": break;
            case "Tent": break;
            case "High Tree": break;
        }
        let label = document.createElement('label');
        label.innerText = type;
        details.appendChild(label);
        this._gridview.appendChild(details);
    }

    allowDrop(ev) {
        ev.preventDefault();
        console.log("adasd");
        alert('test');

    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        //alert('test');
    }

    drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}
