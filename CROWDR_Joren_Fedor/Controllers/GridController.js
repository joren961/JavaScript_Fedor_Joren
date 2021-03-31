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
        this.renderPlacedObjects(region);
    }

    renderGrid(region)
    {
        this._gridview.innerHTML = '';
        let newParent = document.createElement('div');
        newParent.className = 'gridView';
        this._gridview.appendChild(newParent);

        for(let x = 0; x < 15; x++)
        {
            for(let y = 0; y < 15; y++)
            {
                let newCellGrid = document.createElement('div');
                newCellGrid.className = 'gridCell';
                newCellGrid.id = x + " " + y;
                //on drag over
                newCellGrid.addEventListener('dragover', ev => {
                    ev.preventDefault();
                });

                //on drop
                newCellGrid.addEventListener("drop", ev => {
                    ev.preventDefault();
                    let data = ev.dataTransfer.getData("text/plain");

                    //console.log(data);
                    ev.target.appendChild(document.getElementById(data));


                    this.updatePlacedObjects(region._name);
                });

                //loop through all objects to see if there is any that can be rendered on the grid


                //append
                newParent.appendChild(newCellGrid);
            }
        }
        this.updatePlacedObjects();
    }

    renderMenu(region)
    {
        this._optionView.innerHTML = '';

        //FOODSTAND
        this.renderMenuItem(region._foodstands,"Food stand","Resources/foodStand(1x1).png",region._foodstands.length);

        //DRINKSTAND
        this.renderMenuItem(region._drinkstands,"Drink stand","Resources/drinkStand(1x2).png",region._drinkstands.length);

        //TENTS
        this.renderMenuItem(region._tents,"Tent","Resources/tent(3x3).png", region._tents.length);

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
                if(object._x == null || object._y == null)
                {
                    this.renderDragble(newSquare, type, object._id, imagesrc, object);
                }

            }
        }
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
    }

    renderPlacedObjects(region)
    {
        //FOODSTAND
        this.renderPlacedItemsOnType(region._foodstands,"Food stand","Resources/foodStand(1x1).png",region._foodstands.length);

        //DRINKSTAND
        this.renderPlacedItemsOnType(region._drinkstands,"Drink stand","Resources/drinkStand(1x2).png",region._drinkstands.length);

        //TENTS
        this.renderPlacedItemsOnType(region._tents,"Tent","Resources/tent(3x3).png", region._tents.length);

        //TOILETBUILDING
        this.renderPlacedItemsOnType(region._toiletbuildings,"Toilet building","Resources/toiletbuilding(1x3).jpg", region._toiletbuildings.length);

        //TRASHCAN
        this.renderPlacedItemsOnType(region._trashcans,"Trashcan","Resources/trashcan(1x1).jpg",region._trashcans.length);

        //TREE

    }
    renderPlacedItemsOnType(objectArray,type, imagesrc, amount)
    {
        for (const object of objectArray) {
            if (object!=null) {
                console.log(object);
                if(object._x != null || object._y != null)
                {
                    let gridCellCord = object._x + " " + object._y;
                    let parentGridCell = document.getElementById(gridCellCord);
                    this.renderDragble(parentGridCell, type, object._id, imagesrc, object);
                }

            }
        }
    }


    renderDragble(parentObject , type, id, imagesrc, object)
    {
        let newDragble = document.createElement('img');
        newDragble.src = imagesrc;
        newDragble.id = type + id;
        newDragble.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", newDragble.id);
        });
        newDragble.draggable = true;
        newDragble.className = type;
        newDragble.className = "Dragble";

        newDragble.addEventListener('click',(e) => this._DetailsController.openDetails(object,this._gridview));
        parentObject.appendChild(newDragble);
    }

    placeObject(object, x, y)
    {
        object._x = x;
        object._y = y;
    }

    updatePlacedObjects(regionName)
    {
        for(let x = 0; x < 15; x++)
        {
            for(let y = 0; y < 15; y++)
            {
                let value =  x + " " + y;
                let cell = document.getElementById(value);
                if(cell.hasChildNodes())
                {
                    //console.log(cell.firstElementChild.id);
                    let object = this._StorageController.getItemOnId(regionName, cell.firstElementChild.id);
                    console.log(object);
                    this.placeObject(object, x, y);
                    this._StorageController.updateRegionObject(regionName,object);

                }
            }
        }
    }
}
