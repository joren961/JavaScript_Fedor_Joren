import "regenerator-runtime/runtime.js";
import "../resources/App.scss";
import StorageController from "./Components/StorageController";
import FormController from "./RegionForm/FormController";
import NavigationController from "./Navigation/NavigationController";
import GridController from "./Grid/GridController";

let storageController = new StorageController();
let gridController = new GridController(storageController);
let navigationController = new NavigationController(storageController, gridController);
let formController = new FormController(storageController, gridController);
