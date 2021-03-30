class GridController {

    _replaceDiv;
    _container;
    _optionView;
    _gridview;
    _StorageController;
    _DetailsController;
    _selectedRegion;

    constructor(storageController, detailsController)
    {
        this._StorageController = storageController;
        this._DetailsController = detailsController;
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
        for (const foodstand of region._foodstands) {
            if (foodstand!=null) {
                this.renderMenuItem(foodstand,"Food stand","Resources/foodStand(1x1).png",region._foodstands.length);
            }
        }
        for (const drinkstand of region._drinkstands) {
            if (drinkstand!=null) {
                this.renderMenuItem(drinkstand,"Drink stand","Resources/drinkStand(1x2).png",region._drinkstands.length);
            }
        }
        for (const tent of region._tents) {
            if (tent!=null) {
                this.renderMenuItem(tent,"Tent","Resources/tent(3x3).png",region._tents.length);
            }
        }
        for (const toiletbuilding of region._toiletbuildings) {
            if (toiletbuilding!=null) {
                this.renderMenuItem(toiletbuilding,"Toilet building","Resources/toiletbuilding(1x3).jpg", region._toiletbuildings.length);
            }
        }
        for (const trashcan of region._trashcans) {
            if (trashcan!=null) {
                this.renderMenuItem(trashcan,"Trashcan","Resources/trashcan(1x1).jpg",region._trashcans.length);
            }
        }
    }

    //moet ervoor zorgen dat elk object apart gemaakt wordt en op de stapel objecten van die soort wordt gegooid
    renderMenuItem(object,type, imagesrc, amount)
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
        newDragble.addEventListener('click',(e) => this._DetailsController.openDetails(object,type,this._gridview));
        newSquare.appendChild(newDragble);
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
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
