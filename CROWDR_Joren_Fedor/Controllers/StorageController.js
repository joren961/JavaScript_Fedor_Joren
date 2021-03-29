class StorageController {

    constructor() {
    }

    //returnt regio object
    getRegion(regionName) {
        let regions = localStorage.getItem("regions");
        for (const region of regions) {
            if (region._name === regionName) {
                return JSON.parse(region);
            }
        }
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

    updateRegion(regionObject) {

    }

    //returnt alle regions in object array
    getRegions() {
        let regionArray = localStorage.getItem("regions");
        let regions = JSON.parse(regionArray);
        return regions;
    }


}