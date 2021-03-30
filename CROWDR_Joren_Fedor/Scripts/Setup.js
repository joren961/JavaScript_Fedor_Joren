let storageController = new StorageController();
let detailsController = new DetailsController(storageController);
let gridController = new GridController(storageController,detailsController);
let navigationController = new NavigationController(storageController, gridController);
let formController = new FormController(storageController, gridController);


let regionForm = document.querySelector('.regionForm');
let squareAmount = document.querySelector(".squaresLeft");