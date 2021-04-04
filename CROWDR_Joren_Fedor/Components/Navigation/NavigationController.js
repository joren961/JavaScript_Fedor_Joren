class NavigationController {

    _StorageController;
    _gridController;
    _navView;

    constructor(storageController, gridController) {
        this._StorageController = storageController;
        this._gridController = gridController;
        this._navView = new NavigationView(this);
        this.setupAudio();
    }

    setupAudio() {
        this._audio = new Audio('dist/Resources/buttonclick.wav');
        this._audio.volume = 0.3;
    }

    toggleNav() {
        this._navView.toggleNav();
        this._audio.play().catch(()=>{
            return;
        });
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