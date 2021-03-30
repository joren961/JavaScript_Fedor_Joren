class StorageController {

    //returnt regio object
    getRegion(regionName) {
        let regionsObject = [];
        let regions = JSON.parse(localStorage.getItem("regions"));
        for (const region of regions) {
            if (region._name === regionName) {
                regionsObject = region;
                break;
            }
        }
        return regionsObject;
    }

    checkRegionNameTaken(regionName) {
        let regions = localStorage.getItem("regions")
        if (regions != null) {
            regions = JSON.parse(regions);
            if (regions[0] != null) {
                for (const region of regions) {
                    if (region!=null) {
                        if (region._name === regionName) {
                            return true;
                        }
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    deleteRegion(regionName) {
        let regions = localStorage.getItem("regions");
        regions = JSON.parse(regions);
        for (const region of regions) {
            if (region._name === regionName) {
                regions.splice(regions.indexOf(region),1);
                break;
            }
        }
        localStorage.setItem("regions",JSON.stringify(regions));
    }

    updateRegionObject(regionName, regionObject) {
        let regions = localStorage.getItem("regions");
        regions = JSON.parse(regions);
        for (const region of regions) {
            if (region._name === regionName) {
                if (regionObject._type === "Drink stand") {
                    for (let drinkStand of region._drinkstands) {
                        if (regionObject._id === drinkStand._id) {
                            drinkStand = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Food stand") {
                    for (let foodStand of region._foodstands) {
                        if (regionObject._id === foodStand._id) {
                            foodStand = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Tent") {
                    for (let tent of region._tents) {
                        if (regionObject._id === tent._id) {
                            tent = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Toilet building") {
                    for (let toilet of region._toiletbuildings) {
                        if (regionObject._id === toilet._id) {
                            toilet = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Trashcan") {
                    for (let trashcan of region._trashcans) {
                        if (regionObject._id === trashcan._id) {
                            trashcan = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Tree") {
                    for (let tree of region._trees) {
                        if (regionObject._id === tree._id) {
                            tree = regionObject;
                            break;
                        }
                    }
                } else {
                    throw new Error("type not found");
                }
            }
        }
        localStorage.setItem('regions',JSON.stringify(regions));
    }

    //returnt alle regions in object array
    getRegions() {
        let regionArray = localStorage.getItem("regions");
        let regions = JSON.parse(regionArray);
        return regions;
    }

}