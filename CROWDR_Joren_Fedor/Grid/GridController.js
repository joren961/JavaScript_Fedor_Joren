class GridController {


    _StorageController;
    _DetailsController;
    _regionName;
    _GridView;

    constructor(storageController)
    {
        this._StorageController = storageController;
        this._GridView = new GridView(this);
    }

    createGrid(regionName)
    {
        this._DetailsController = new DetailsController(this._StorageController,regionName);
        let region = storageController.getRegion(regionName);
        this._GridView.render(region);
    }

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

    openDetails(object, gridWrap) {
        this._DetailsController.openDetails(object,gridWrap);
    }

    placeObject(object, x, y)
    {
        object._x = x;
        object._y = y;
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
                    this.placeObject(object, x, y);
                    this._StorageController.updateRegionObject(region._name,object);
                }
            }
        }
    }

    validateObjectPlacement(objectId, regionName, xCord, yCord)
    {
        let object = this._StorageController.getItemOnId(regionName,objectId);
        switch(object._squares) {
            case 1:
                console.log(object._squares);
                this.CheckCell(regionName,xCord,yCord);
                break;
            case 2:
                console.log(object._squares);
                break;
            case 3:
                console.log(object._squares);
                break;
            case 9:
                console.log(object._squares);
                break;
            default:
                console.log('something went wrong');
        }


        return true;
    }
    CheckCell(regionName, xCord, yCord)
    {
        let region = this._StorageController.getRegion(regionName);
        for (let object of region._drinkStands) {
            if(itemId == compareId)
            {
                return drinkStand;
            }
        }


        return true;
    }

    validateRegionLocking(region)
    {

        return true;
    }

    lockRegion(regionName)
    {

        let region = storageController.getRegion(regionName);
        if (this.validateRegionLocking(region))
        {
            //set bool true
            region._locked = true;
            //save in localstorage
            this._StorageController.updateRegion(region);

            this._GridView.render(region);
        }
        else
        {
            alert("Uh oh! you haven't placed all objects in the region!");
        }

    }

}
