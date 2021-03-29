class StorageController {

    constructor() {
    }

    getRegion(regionName) {
        let regions = localStorage.getItem("regions");
        for (const region of regions) {
            if (region._name === regionName) {
                return region;
            }
        }
    }

    checkRegionNameTaken(regionName) {

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

    getRegions() {
        let regionArray = localStorage.getItem("regions");
        let regions = JSON.parse(regionArray);
        return regions;
    }


}