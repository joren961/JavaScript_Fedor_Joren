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
                            region._drinkstands[drinkStand._id-1] = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Food stand") {
                    for (let foodStand of region._foodstands) {
                        if (regionObject._id === foodStand._id) {
                            region._foodstands[foodStand._id-1] = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Tent") {
                    for (let tent of region._tents) {
                        if (regionObject._id === tent._id) {
                            region._tents[tent._id-1] = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Toilet building") {
                    for (let toilet of region._toiletbuildings) {
                        if (regionObject._id === toilet._id) {
                            region._toiletbuildings[toilet._id-1] = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Trashcan") {
                    for (let trashcan of region._trashcans) {
                        if (regionObject._id === trashcan._id) {
                            region._trashcans[trashcan._id-1] = regionObject;
                            break;
                        }
                    }
                } else if (regionObject._type === "Tree") {
                    for (let tree of region._trees) {
                        if (regionObject._id === tree._id) {
                            region._trees[tree._id-1] = regionObject;
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

    getItemOnId(regionName,itemId) {
        let regions = localStorage.getItem("regions");
        regions = JSON.parse(regions);
        for (const region of regions) {
            if (region._name === regionName){
                for (let drinkStand of region._drinkstands) {
                   let compareId = drinkStand._type + drinkStand._id;
                    if(itemId == compareId)
                    {
                        return drinkStand;
                    }
                }
                for (let foodstand of region._foodstands) {
                    let compareId = foodstand._type + foodstand._id;
                    if(itemId == compareId)
                    {
                        return foodstand;
                    }
                }
                for (let tent of region._tents) {
                    let compareId = tent._type + tent._id;
                    if(itemId == compareId)
                    {
                        return tent;
                    }
                }
                for (let toilet of region._toiletbuildings) {
                    let compareId = toilet._type + toilet._id;
                    if(itemId == compareId)
                    {
                        return toilet;
                    }
                }
                for (let trashcan of region._trashcans) {
                    let compareId = trashcan._type + trashcan._id;
                    if(itemId == compareId)
                    {
                        return trashcan;
                    }
                }
            }
        }

    }

}