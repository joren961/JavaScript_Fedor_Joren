class GridController {


    _StorageController;
    _DetailsController;
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

    validateObjectPlacement(object , regionName)
    {

        return true;
    }

    validateRegionLocking(region)
    {

        return true;
    }

    lockRegion(region)
    {
        if (this.validateRegionLocking(region))
        {
            //set bool true
            region._locked = true;
            //save in localstorage
            this._StorageController.updateRegion(region);
            this._GridView.render(region);

            let simulation = new SimulationController(this, region);
            simulation.runSimulation();
        }
        else
        {
            alert("Uh oh! you haven't placed all objects in the region!");
        }

    }

}
