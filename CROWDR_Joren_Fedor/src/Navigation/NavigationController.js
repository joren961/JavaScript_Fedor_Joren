import NavigationView from "./NavigationView";

export default class NavigationController {

    _StorageController;
    _gridController;
    _navView;

    constructor(storageController, gridController) {
        this._StorageController = storageController;
        this._gridController = gridController;
        this._navView = new NavigationView(this);
        document.querySelector('.hamburgerLink').addEventListener('click',()=>this.toggleNav());
    }

    toggleNav() {
        this._navView.toggleNav();
    }

    deleteRegion(regionName) {
        this._StorageController.deleteRegion(regionName);
        this._navView.deleteRegion(regionName);
    }

    getRegions() {
        let regions = this._StorageController.getRegions();
        this._navView.getRegions(regions);
    }
}