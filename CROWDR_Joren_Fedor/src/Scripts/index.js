let storageController = new StorageController();
let gridController = new GridController(storageController);
let navigationController = new NavigationController(storageController, gridController);
let formController = new FormController(storageController, gridController);

alert("WEE");