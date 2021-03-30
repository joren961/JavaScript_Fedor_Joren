class GridController {

    _replaceDiv;
    _container;
    _optionView;
    _gridview;
    _StorageController;
    _DetailsController;
    _regionName;
    _selectedRegion;

    constructor(storageController)
    {
        this._StorageController = storageController;
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

    render(regionName)
    {
        this._DetailsController = new DetailsController(this._StorageController,regionName);
        this._regionName = regionName;
        this._replaceDiv.innerHTML = '';
        this._replaceDiv.appendChild(this._container);
        let region = this._StorageController.getRegion(regionName);
        this.renderGrid(region);
        this.renderMenu(region);
    }

    renderGrid(region)
    {
        this._gridview.innerHTML = '';
        let newParent = document.createElement('div');
        newParent.className = 'gridView';
        this._gridview.appendChild(newParent);

        for(let x = 0; x < 225; x++)
        {
            let newCellGrid = document.createElement('div');
            newCellGrid.className = 'gridCell';

            newCellGrid.addEventListener('dragover', ev => {
                ev.preventDefault();
            });
            newCellGrid.addEventListener("drop", ev => {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("text/plain");

                console.log(data);
                ev.target.appendChild(document.getElementById(data));
                // this.renderMenu();
            });


            newParent.appendChild(newCellGrid);
        }
    }

    renderMenu(region)
    {
        this._optionView.innerHTML = '';

        //FOODSTAND
        this.renderMenuItem(region._foodstands,"Food stand","Resources/foodStand(1x1).png",region._foodstands.length);

        //DRINKSTAND
        this.renderMenuItem(region._drinkstands,"Drink stand","Resources/drinkStand(1x2).png",region._drinkstands.length);

        //TENTS
        this.renderMenuItem(region._tents,"Toilet building","Resources/tent(3x3).png", region._tents.length);

        //TOILETBUILDING
        this.renderMenuItem(region._toiletbuildings,"Toilet building","Resources/toiletbuilding(1x3).jpg", region._toiletbuildings.length);

        //TRASHCAN
        this.renderMenuItem(region._trashcans,"Trashcan","Resources/trashcan(1x1).jpg",region._trashcans.length);

        //TREE

    }

    //moet ervoor zorgen dat elk object apart gemaakt wordt en op de stapel objecten van die soort wordt gegooid
    renderMenuItem(objectArray,type, imagesrc, amount)
    {
        let newMenuItem = document.createElement('div');
        let newTitle = document.createElement('p');
        newTitle.innerText = type + ": " + amount + " left";
        newTitle.className = 'menuItemTitle';
        newMenuItem.appendChild(newTitle);
        newMenuItem.className = 'menuItemWrapper';
        let newSquare = document.createElement('div');

        for (const object of objectArray) {
            if (object!=null) {
                console.log(object);
                this.createnewDragble(newSquare, type, 5, imagesrc);
            }
        }
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
    }

    createnewDragble(parentObject , type, id, imagesrc)
    {
        let newDragble = document.createElement('img');
        newDragble.src = imagesrc;
        newDragble.id = type;
        //newDragble.addEventListener('dragstart', () => this.drag(event));
        newDragble.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", newDragble.id);
        });
        newDragble.draggable = true;
        newDragble.className = id;
        newDragble.addEventListener('click',(e) => this._DetailsController.openDetails(object,type,this._gridview));
        parentObject.appendChild(newDragble);
    }

    // allowDrop(ev) {
    //     ev.preventDefault();
    //     console.log("adasd");
    //     alert('test');
    // }
    //
    // drag(ev) {
    //     ev.dataTransfer.setData("text", ev.target.id);
    // }
    //
    // drop(ev) {
    //     ev.preventDefault();
    //     let data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    // }



}
