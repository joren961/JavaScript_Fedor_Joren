class GridController {

    _replaceDiv;
    _container;
    _optionView;
    _gridWrap;
    _StorageController;
    _DetailsController;
    _regionName;
    _GridView;

    constructor(storageController)
    {
        this._StorageController = storageController;
        this._replaceDiv = document.getElementById('replaceDiv');

        this._container = document.createElement('div');
        this._container.className = 'containerGridView';

        this._optionView = document.createElement('div');
        this._optionView.className = 'menuWrapper';
        this._container.appendChild(this._optionView);

        this._gridWrap = document.createElement('div');
        this._gridWrap.className = 'gridWrapper';
        this._container.appendChild(this._gridWrap);

        this._GridView = new GridView(this);
    }

    // render(regionName)
    // {
    //     this._DetailsController = new DetailsController(this._StorageController,regionName);
    //     this._regionName = regionName;
    //     this._replaceDiv.innerHTML = '';
    //     this._replaceDiv.appendChild(this._container);
    //     let region = this._StorageController.getRegion(regionName);
    //     this.renderGrid(region);
    //     this.renderMenu(region);
    //     this.placeTrees(region._trees, region);
    //     this.renderPlacedObjects(region);
    // }
    //
    // renderGrid(region)
    // {
    //     this._gridWrap.innerHTML = '';
    //     let newParent = document.createElement('div');
    //     newParent.className = 'gridView';
    //     this._gridWrap.appendChild(newParent);
    //
    //     for(let x = 0; x < 15; x++)
    //     {
    //         for(let y = 0; y < 15; y++)
    //         {
    //             let newCellGrid = document.createElement('div');
    //             newCellGrid.className = 'gridCell';
    //             newCellGrid.id = x + " " + y;
    //
    //             //on drag over
    //             newCellGrid.addEventListener('dragover', ev => {
    //                 ev.preventDefault();
    //             });
    //
    //             //on drop
    //             newCellGrid.addEventListener("drop", ev => {
    //                 ev.preventDefault();
    //                 let data = ev.dataTransfer.getData("text/plain");
    //
    //                 ev.target.appendChild(document.getElementById(data));
    //
    //                 this.updatePlacedObjects(region);
    //             });
    //             newParent.appendChild(newCellGrid);
    //         }
    //     }
    // }
    //
    // renderMenu(region)
    // {
    //     this._optionView.innerHTML = '';
    //
    //     //FOODSTAND
    //     this.renderMenuItem(region._foodstands,"Food stand","Resources/foodStand(1x1).png",region._foodstands.length);
    //
    //     //DRINKSTAND
    //     this.renderMenuItem(region._drinkstands,"Drink stand","Resources/drinkStand(1x2).png",region._drinkstands.length);
    //
    //     //TENTS
    //     this.renderMenuItem(region._tents,"Tent","Resources/tent(3x3).png", region._tents.length);
    //
    //     //TOILETBUILDING
    //     this.renderMenuItem(region._toiletbuildings,"Toilet building","Resources/toiletbuilding(1x3).jpg", region._toiletbuildings.length);
    //
    //     //TRASHCAN
    //     this.renderMenuItem(region._trashcans,"Trashcan","Resources/trashcan(1x1).jpg",region._trashcans.length);
    // }
    //
    // renderMenuItem(objectArray,type, imagesrc, amount)
    // {
    //     let newMenuItem = document.createElement('div');
    //     let newTitle = document.createElement('p');
    //     newTitle.innerText = type + ": " + amount + " left";
    //     newTitle.className = 'menuItemTitle';
    //     newMenuItem.appendChild(newTitle);
    //     newMenuItem.className = 'menuItemWrapper';
    //     let newSquare = document.createElement('div');
    //
    //     for (const object of objectArray) {
    //         if (object!=null) {
    //             if(object._x == null || object._y == null)
    //             {
    //                 this.renderDragble(newSquare, type, object._id, imagesrc, object);
    //             }
    //         }
    //     }
    //     newMenuItem.appendChild(newSquare);
    //     this._optionView.appendChild(newMenuItem);
    // }
    //
    // renderPlacedObjects(region)
    // {
    //     //TREE
    //     this.renderPlacedItemsOnType(region._trees,"Tree","Resources/highTree(1x1).png",region._trees.length);
    //     //FOODSTAND
    //     this.renderPlacedItemsOnType(region._foodstands,"Food stand","Resources/foodStand(1x1).png",region._foodstands.length);
    //
    //     //DRINKSTAND
    //     this.renderPlacedItemsOnType(region._drinkstands,"Drink stand","Resources/drinkStand(1x2).png",region._drinkstands.length);
    //
    //     //TENTS
    //     this.renderPlacedItemsOnType(region._tents,"Tent","Resources/tent(3x3).png", region._tents.length);
    //
    //     //TOILETBUILDING
    //     this.renderPlacedItemsOnType(region._toiletbuildings,"Toilet building","Resources/toiletbuilding(1x3).jpg", region._toiletbuildings.length);
    //
    //     //TRASHCAN
    //     this.renderPlacedItemsOnType(region._trashcans,"Trashcan","Resources/trashcan(1x1).jpg",region._trashcans.length);
    //
    //     this.updatePlacedObjects(region);
    // }
    //
    // renderPlacedItemsOnType(objectArray,type, imagesrc)
    // {
    //     for (const object of objectArray) {
    //         if (object!=null) {
    //             if(object._x != null || object._y != null)
    //             {
    //                 let gridCellCord = object._x + " " + object._y;
    //                 let parentGridCell = document.getElementById(gridCellCord);
    //                 this.renderDragble(parentGridCell, type, object._id, imagesrc, object);
    //             }
    //         }
    //     }
    // }
    //
    // renderDragble(parentObject , type, id, imagesrc, object)
    // {
    //     let newDragble = document.createElement('img');
    //     newDragble.src = imagesrc;
    //     newDragble.id = type + id;
    //     newDragble.addEventListener("dragstart", e => {
    //         e.dataTransfer.setData("text/plain", newDragble.id);
    //     });
    //     newDragble.draggable = true;
    //     newDragble.className = type;
    //     newDragble.addEventListener('click',(e) => this._DetailsController.openDetails(object,this._gridWrap));
    //     newDragble.className = "Dragble";
    //     parentObject.appendChild(newDragble);
    // }

    placeTrees(objectArray)
    {
        for (const object of objectArray) {
            if (object!=null) {

                if(object._x == null || object._y == null)
                {
                    //random cords
                    let randomX = Math.floor(Math.random() * 15);
                    let randomY = Math.floor(Math.random() * 15);

                    this.placeObject(object, randomX, randomY);
                }
            }
        }
    }

    placeObject(object, x, y)
    {
        object._x = x;
        object._y = y;
    }

    //TODO
    createGrid(regionName)
    {
        let region = storageController.getRegion(regionName);
        this._GridView.render(region);

    }

    updatePlacedObjects(region)
    {
        for(let x = 0; x < 15; x++)
        {
            for(let y = 0; y < 15; y++)
            {
                let value =  x + " " + y;
                let cell = document.getElementById(value);
                if(cell.hasChildNodes())
                {
                    let object = this._StorageController.getItemOnId(region._name, cell.firstElementChild.id);
                    console.log(object);
                    this.placeObject(object, x, y);
                    this._StorageController.updateRegionObject(region._name,object);
                }
            }
        }
    }
}
