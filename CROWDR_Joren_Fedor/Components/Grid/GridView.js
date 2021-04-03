class GridView {

    _replaceDiv;
    _container;
    _optionView;
    _gridWrap;
    _gridController;

    constructor(gridController) {
        this._gridController = gridController;

        this._replaceDiv = document.getElementById('replaceDiv');
        this._container = document.createElement('div');
        this._container.className = 'containerGridView';

        this._optionView = document.createElement('div');
        this._optionView.className = 'menuWrapper';
        this._container.appendChild(this._optionView);

        this._gridWrap = document.createElement('div');
        this._gridWrap.className = 'gridWrapper';
        this._container.appendChild(this._gridWrap);
    }

    render(region)
    {
        this._replaceDiv.innerHTML = '';
        this._replaceDiv.appendChild(this._container);
        this.renderGrid(region);
        this.renderMenu(region);
        this._gridController.placeTrees(region._trees);
        this.renderPlacedObjects(region);
    }

    renderGrid(region)
    {
        this._gridWrap.innerHTML = '';
        let newParent = document.createElement('div');
        newParent.className = 'gridView';
        this._gridWrap.appendChild(newParent);

        for(let x = 0; x < 15; x++)
        {
            for(let y = 0; y < 15; y++)
            {
                let newCellGrid = document.createElement('div');
                newCellGrid.className = 'gridCell';
                newCellGrid.id = x + " " + y;

                if(region._locked == null) {
                    //on drag over
                    newCellGrid.addEventListener('dragover', ev => {
                        ev.preventDefault();
                    });

                    //on drop
                    newCellGrid.addEventListener("drop", ev => {
                        ev.preventDefault();
                        let data = ev.dataTransfer.getData("text/plain");
                        console.log(this._gridController.validateObjectPlacement(data, region._name, x, y) + "HIER");
                        if(this._gridController.validateObjectPlacement(data, region._name, x, y))
                        {
                            ev.target.appendChild(document.getElementById(data));
                        }

                        this._gridController.updatePlacedObjects(region);
                    });
                }


                newParent.appendChild(newCellGrid);
            }
        }
    }

    renderMenu(region)
    {
        this._optionView.innerHTML = '';
        if(region._locked != true)
        {
            //FOODSTAND
            this.renderMenuItem(region._foodstands,"Food stand","dist/Resources/foodStand(1x1).png");

            //DRINKSTAND
            this.renderMenuItem(region._drinkstands,"Drink stand","dist/Resources/drinkStand(1x2).png");

            //TENTS
            this.renderMenuItem(region._tents,"Tent","dist/Resources/tent(3x3).png");

            //TOILETBUILDING
            this.renderMenuItem(region._toiletbuildings,"Toilet building","dist/Resources/toiletbuilding(1x3).jpg");

            //TRASHCAN
            this.renderMenuItem(region._trashcans,"Trashcan","dist/Resources/trashcan(1x1).jpg");

            //LOCK REGION BUTTON
            let newLockRegion = document.createElement('div');
            newLockRegion.className = 'button';
            newLockRegion.innerHTML = 'Lock';
            newLockRegion.id = "lockButton";
            newLockRegion.addEventListener('click', () => {this._gridController.lockRegion(region._name)});

            this._optionView.appendChild(newLockRegion);
        }


    }

    renderMenuItem(objectArray,type, imagesrc)
    {
        let newMenuItem = document.createElement('div');
        let newTitle = document.createElement('p');
        if (objectArray!=null) {
            if (objectArray[0]!=null) {
                newTitle.innerText = type + ": " + objectArray.length;
                if (objectArray[0]._type === "Toilet building") {
                    newMenuItem.id="ToiletItemWrapper";
                }
            }
        }
        newTitle.className = 'menuItemTitle';
        newMenuItem.appendChild(newTitle);
        newMenuItem.className = 'menuItemWrapper';
        let newSquare = document.createElement('div');

        if (objectArray!=null) {
            for (const object of objectArray) {
                if (object!=null) {
                    if(object._x == null || object._y == null)
                    {
                        this.renderDragble(newSquare, type, object._id, imagesrc, object);
                    }
                }
            }
        }
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
    }

    renderPlacedObjects(region)
    {
        if (region._trees!=null) {
            this.renderPlacedTrees(region._trees,"Tree", "dist/Resources/highTree(1x1).png", "dist/Resources/wideTree(2x1).png", "dist/Resources/shadowTree(3x3).png", region._locked);
        }

        //FOODSTAND
        if (region._foodstands!=null) {
            this.renderPlacedItemsOnType(region._foodstands,"Food stand","dist/Resources/foodStand(1x1).png",region._foodstands.length, region._locked);
        }

        //DRINKSTAND
        if (region._drinkstands!=null) {
            this.renderPlacedItemsOnType(region._drinkstands,"Drink stand","dist/Resources/drinkStand(1x2).png",region._drinkstands.length, region._locked);
        }

        //TENTS
        if (region._tents!=null) {
            this.renderPlacedItemsOnType(region._tents,"Tent","dist/Resources/tent(3x3).png", region._tents.length);
        }

        //TOILETBUILDING
        if (region._toiletbuildings!=null) {
            this.renderPlacedItemsOnType(region._toiletbuildings,"Toilet building","dist/Resources/toiletbuilding(1x3).jpg", region._toiletbuildings.length, region._locked);
        }

        //TRASHCAN
        if (region._trashcans!=null) {
            this.renderPlacedItemsOnType(region._trashcans,"Trashcan","dist/Resources/trashcan(1x1).jpg",region._trashcans.length, region._locked);
        }

        this._gridController.updatePlacedObjects(region);
    }

    renderPlacedItemsOnType(objectArray,type, imagesrc, isLocked)
    {
        for (const object of objectArray) {
            if (object!=null) {
                if(object._x != null || object._y != null)
                {
                    let gridCellCord = object._x + " " + object._y;
                    let parentGridCell = document.getElementById(gridCellCord);
                    this.renderDragble(parentGridCell, type, object._id, imagesrc, object, isLocked);
                }
            }
        }
    }
    renderPlacedTrees(objectArray,type, srcTall, srcWide, srcShadow, isLocked)
    {
        if (objectArray!=null) {
            for (const object of objectArray) {
                if (object!=null) {
                    if(object._x != null || object._y != null)
                    {
                        let gridCellCord = object._x + " " + object._y;
                        let parentGridCell = document.getElementById(gridCellCord);

                        switch(object._squares) {
                            case 1:
                                this.renderDragble(parentGridCell, type, object._id, srcTall, object, isLocked);
                                break;
                            case 2:
                                this.renderDragble(parentGridCell, type, object._id, srcWide, object, isLocked);
                                break;
                            case 9:
                                this.renderDragble(parentGridCell, type, object._id, srcShadow, object, isLocked);
                                break;
                            default:
                            // code block
                        }
                    }
                }
            }
        }
    }

    renderDragble(parentObject , type, id, imagesrc, object, isLocked)
    {
        let newDragble = document.createElement('img');
        newDragble.src = imagesrc;
        newDragble.id = type + id;

        newDragble.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", newDragble.id);
        });

        newDragble.draggable = true;
        newDragble.className = type;
        newDragble.addEventListener('click',(e) => this._gridController.openDetails(object,this._gridWrap));
        newDragble.className = "Dragble";
        parentObject.appendChild(newDragble);
    }


}