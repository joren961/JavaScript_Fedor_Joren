class GridController {

    _replaceDiv;
    _container;
    _optionView;
    _gridview;
    _StorageController;
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
        newDragble.addEventListener('click',() => this.openDetails(object, type));
        newSquare.appendChild(newDragble);
        newMenuItem.appendChild(newSquare);
        this._optionView.appendChild(newMenuItem);
    }

    openDetails(object, type) {
        let oldDetailsBox = document.querySelector('.detailsBox')
        if (document.querySelector('.detailsBox') != null) {
            this._gridview.removeChild(oldDetailsBox);
        }

        let details = document.createElement('div');
        details.className = "detailsBox";

        let label = document.createElement('label');
        label.innerText = type;
        details.appendChild(label);

        let newLabel = document.createElement('label');
        let newInput = document.createElement('input');
        newInput.required = true;

        switch (type) {
            case "Drink stand":
                newLabel.innerText = "Maximum visitors:";
                newInput.setAttribute('type', 'number');
                newInput.setAttribute('min', '0');
                newInput.setAttribute('placeholder', '0');
                break;
            case "Food stand":
                newLabel.innerText = "Maximum visitors:";
                newInput.setAttribute('type', 'number');
                newInput.setAttribute('min', '0');
                newInput.setAttribute('placeholder', '0');
                //type eten
                break;
            case "Tent":
                newLabel.innerText = "Maximum visitors:";
                newInput.setAttribute('type', 'number');
                newInput.setAttribute('min', '0');
                newInput.setAttribute('placeholder', '0');
                //openingstijden
                break;
            case "Trashcan":
                newLabel.innerText = "Capacity in KG";
                newInput.setAttribute('type', 'number');
                newInput.setAttribute('min', '0');
                newInput.setAttribute('placeholder', '0');
                //leegtijden
                break;
            case "Toilet building":
                newLabel.innerText = "Maximum visitors:";
                newInput.setAttribute('type', 'number');
                newInput.setAttribute('min', '0');
                newInput.setAttribute('placeholder', '0');
                break;
            case "Tree":
                let trees = ['High Tree', 'Wide Tree', 'Shadow Tree'];
                for (const tree of trees) {
                    let label = document.createElement('label');
                    label.innerText = tree;
                    let input = document.createElement('input');
                    if (tree === "High Tree") {
                        input.checked = true;
                    }
                    input.setAttribute('value', tree);
                    input.setAttribute('name', 'Tree');
                    input.setAttribute('type', 'radio');
                    details.appendChild(label);
                    details.appendChild(input);
                }
                break;
        }
        details.appendChild(newLabel);
        details.appendChild(newInput);
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
