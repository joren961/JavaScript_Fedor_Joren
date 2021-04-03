class GridController {


    _StorageController;
    _DetailsController;
    _SimulationController;
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
        if (region._locked) {
            this._SimulationController = new SimulationController(this,region);
        }
    }

    placeTrees(objectArray)
    {
        if (objectArray!=null) {
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
        console.log(object._squares + " validateObjectPlacement");
        switch(object._squares) {
            case 1:
                if(!this.CheckCell(regionName,xCord,yCord, object))
                {
                    return false;
                }
                break;
            case 2:
                if(!this.CheckCell(regionName,xCord,yCord, object) || !this.CheckCell(regionName,xCord ,yCord + 1, object))
                {
                    return false;
                }
                break;
            case 3:
                if(!this.CheckCell(regionName,xCord,yCord, object) || !this.CheckCell(regionName,xCord ,yCord + 1, object) || !this.CheckCell(regionName,xCord ,yCord + 2, object))
                {
                    return false;
                }
                break;
            case 9:
                for(let x = 0; x < 3; x++)
                {
                    for(let y = 0; y < 3; y++)
                    {
                        if(!this.CheckCell(regionName,xCord + x,yCord + y, object))
                        {
                            return false;
                        }
                    }
                }
                break;
            default:
                if(!this.CheckCell(regionName,xCord,yCord, object))
                {
                    return false;
                }
        }
        return true;
    }
    CheckCell(regionName, xCord, yCord, excludeObject)
    {
        if(xCord > 14)
        {
            return false;
        }
        if(yCord > 14)
        {
            return false;
        }
        let region = this._StorageController.getRegion(regionName);
        for (let object of region._drinkstands) {
            if(object._x === xCord && object._y === yCord )
            {
                if(excludeObject._x === object._x && excludeObject._y === object._y && excludeObject._id === object._id && excludeObject._type === object._type)
                {
                }
                else
                {
                    console.log(excludeObject);
                    console.log(object);
                    return false;
                }

            }
        }
        for (let object of region._foodstands) {
            if(object._x === xCord && object._y === yCord && excludeObject !== object)
            {
                if(excludeObject._x === object._x && excludeObject._y === object._y && excludeObject._id === object._id && excludeObject._type === object._type)
                {
                }
                else
                {
                    console.log(excludeObject);
                    console.log(object);
                    return false;
                }
            }
        }
        for (let object of region._tents) {
            if(object._x === xCord && object._y === yCord)
            {
                if(excludeObject._x === object._x && excludeObject._y === object._y && excludeObject._id === object._id && excludeObject._type === object._type)
                {
                }
                else
                {
                    console.log(excludeObject);
                    console.log(object);
                    return false;
                }
            }
        }
        for (let object of region._toiletbuildings) {
            if(object._x === xCord && object._y === yCord && excludeObject !== object)
            {
                if(excludeObject._x === object._x && excludeObject._y === object._y && excludeObject._id === object._id && excludeObject._type === object._type)
                {
                }
                else
                {
                    console.log(excludeObject);
                    console.log(object);
                    return false;
                }
            }
        }
        for (let object of region._trashcans) {
            if(object._x === xCord && object._y === yCord && excludeObject !== object)
            {
                if(excludeObject._x === object._x && excludeObject._y === object._y && excludeObject._id === object._id && excludeObject._type === object._type)
                {
                }
                else
                {
                    console.log(excludeObject);
                    console.log(object);
                    return false;
                }
            }
        }
        for (let object of region._trees) {
            if(object._x === xCord && object._y === yCord && excludeObject !== object)
            {
                if(excludeObject._x === object._x && excludeObject._y === object._y && excludeObject._id === object._id && excludeObject._type === object._type)
                {
                }
                else
                {
                    console.log(excludeObject);
                    console.log(object);
                    return false;
                }
            }
        }

        return true;
    }

    validateRegionLocking(region)
    {
        for (let object of region._drinkstands) {
            if(object._x == null)
            {
                return false;
            }
        }
        for (let object of region._foodstands) {
            if(object._x == null)
            {
                return false;
            }
        }
        for (let object of region._tents) {
            if(object._x == null)
            {
                return false;
            }
        }
        for (let object of region._toiletbuildings) {
            if(object._x == null)
            {
                return false;
            }
        }
        for (let object of region._trashcans) {
            if(object._x == null)
            {
                return false;
            }
        }
        for (let object of region._trees) {
            if(object._x == null)
            {
                return false;
            }
        }
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
            this.createGrid(regionName);
        }
        else
        {
            alert("Uh oh! you haven't placed all objects in the region!");
        }

    }

}
