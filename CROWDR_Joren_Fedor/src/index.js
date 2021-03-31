
import StorageController from './StorageController';
import GridController from './Grid/GridController';
import NavigationController from './Navigation/NavigationController';
import FormController from './RegionForm/FormController';
import DetailsController from './Details/DetailsController';

let storageController = new StorageController();
let gridController = new GridController(storageController);
let navigationController = new NavigationController(storageController, gridController);
let formController = new FormController(storageController, gridController);