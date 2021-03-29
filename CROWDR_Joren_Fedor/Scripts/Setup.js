let storageController = new StorageController();
let navigationController = new NavigationController(storageController);
let formController = new FormController(storageController);


let regionForm = document.querySelector('.regionForm');
let squareAmount = document.querySelector(".squaresLeft");