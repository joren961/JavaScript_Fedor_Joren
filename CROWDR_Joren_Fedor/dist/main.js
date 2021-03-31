/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Details/DetailsController.js":
/*!******************************************!*\
  !*** ./src/Details/DetailsController.js ***!
  \******************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (4:22)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n| export default class DetailsController {\\n>     _storageController;\\n|     _regionName;\\n| \");\n\n//# sourceURL=webpack://crowdr_joren_fedor/./src/Details/DetailsController.js?");

/***/ }),

/***/ "./src/Grid/GridController.js":
/*!************************************!*\
  !*** ./src/Grid/GridController.js ***!
  \************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (5:15)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| export default class GridController {\\n| \\n>     _replaceDiv;\\n|     _container;\\n|     _optionView;\");\n\n//# sourceURL=webpack://crowdr_joren_fedor/./src/Grid/GridController.js?");

/***/ }),

/***/ "./src/Navigation/NavigationController.js":
/*!************************************************!*\
  !*** ./src/Navigation/NavigationController.js ***!
  \************************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (3:22)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| class NavigationController {\\n| \\n>     _StorageController;\\n|     _gridController;\\n| \");\n\n//# sourceURL=webpack://crowdr_joren_fedor/./src/Navigation/NavigationController.js?");

/***/ }),

/***/ "./src/RegionForm/FormController.js":
/*!******************************************!*\
  !*** ./src/RegionForm/FormController.js ***!
  \******************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (5:22)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| export default class FormController {\\n| \\n>     _StorageController;\\n|     _GridController;\\n|     _regionForm;\");\n\n//# sourceURL=webpack://crowdr_joren_fedor/./src/RegionForm/FormController.js?");

/***/ }),

/***/ "./src/StorageController.js":
/*!**********************************!*\
  !*** ./src/StorageController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StorageController)\n/* harmony export */ });\n\r\nclass StorageController {\r\n\r\n    //returnt regio object\r\n    getRegion(regionName) {\r\n        let regionsObject = [];\r\n        let regions = JSON.parse(localStorage.getItem(\"regions\"));\r\n        for (const region of regions) {\r\n            if (region._name === regionName) {\r\n                regionsObject = region;\r\n                break;\r\n            }\r\n        }\r\n        return regionsObject;\r\n    }\r\n\r\n    checkRegionNameTaken(regionName) {\r\n        let regions = localStorage.getItem(\"regions\")\r\n        if (regions != null) {\r\n            regions = JSON.parse(regions);\r\n            if (regions[0] != null) {\r\n                for (const region of regions) {\r\n                    if (region!=null) {\r\n                        if (region._name === regionName) {\r\n                            return true;\r\n                        }\r\n                    }\r\n                }\r\n            } else {\r\n                return false;\r\n            }\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    deleteRegion(regionName) {\r\n        let regions = localStorage.getItem(\"regions\");\r\n        regions = JSON.parse(regions);\r\n        for (const region of regions) {\r\n            if (region._name === regionName) {\r\n                regions.splice(regions.indexOf(region),1);\r\n                break;\r\n            }\r\n        }\r\n        localStorage.setItem(\"regions\",JSON.stringify(regions));\r\n    }\r\n\r\n    updateRegionObject(regionName, regionObject) {\r\n        let regions = localStorage.getItem(\"regions\");\r\n        regions = JSON.parse(regions);\r\n        for (const region of regions) {\r\n            if (region._name === regionName) {\r\n                if (regionObject._type === \"Drink stand\") {\r\n                    for (let drinkStand of region._drinkstands) {\r\n                        if (regionObject._id === drinkStand._id) {\r\n                            drinkStand = regionObject;\r\n                            break;\r\n                        }\r\n                    }\r\n                } else if (regionObject._type === \"Food stand\") {\r\n                    for (let foodStand of region._foodstands) {\r\n                        if (regionObject._id === foodStand._id) {\r\n                            foodStand = regionObject;\r\n                            break;\r\n                        }\r\n                    }\r\n                } else if (regionObject._type === \"Tent\") {\r\n                    for (let tent of region._tents) {\r\n                        if (regionObject._id === tent._id) {\r\n                            tent = regionObject;\r\n                            break;\r\n                        }\r\n                    }\r\n                } else if (regionObject._type === \"Toilet building\") {\r\n                    for (let toilet of region._toiletbuildings) {\r\n                        if (regionObject._id === toilet._id) {\r\n                            toilet = regionObject;\r\n                            break;\r\n                        }\r\n                    }\r\n                } else if (regionObject._type === \"Trashcan\") {\r\n                    for (let trashcan of region._trashcans) {\r\n                        if (regionObject._id === trashcan._id) {\r\n                            trashcan = regionObject;\r\n                            break;\r\n                        }\r\n                    }\r\n                } else if (regionObject._type === \"Tree\") {\r\n                    for (let tree of region._trees) {\r\n                        if (regionObject._id === tree._id) {\r\n                            tree = regionObject;\r\n                            break;\r\n                        }\r\n                    }\r\n                } else {\r\n                    throw new Error(\"type not found\");\r\n                }\r\n            }\r\n        }\r\n        localStorage.setItem('regions',JSON.stringify(regions));\r\n    }\r\n\r\n    //returnt alle regions in object array\r\n    getRegions() {\r\n        let regionArray = localStorage.getItem(\"regions\");\r\n        let regions = JSON.parse(regionArray);\r\n        return regions;\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://crowdr_joren_fedor/./src/StorageController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _StorageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StorageController */ \"./src/StorageController.js\");\n/* harmony import */ var _Grid_GridController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Grid/GridController */ \"./src/Grid/GridController.js\");\n/* harmony import */ var _Grid_GridController__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Grid_GridController__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Navigation_NavigationController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navigation/NavigationController */ \"./src/Navigation/NavigationController.js\");\n/* harmony import */ var _Navigation_NavigationController__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Navigation_NavigationController__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _RegionForm_FormController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegionForm/FormController */ \"./src/RegionForm/FormController.js\");\n/* harmony import */ var _RegionForm_FormController__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_RegionForm_FormController__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Details_DetailsController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Details/DetailsController */ \"./src/Details/DetailsController.js\");\n/* harmony import */ var _Details_DetailsController__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Details_DetailsController__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet storageController = new _StorageController__WEBPACK_IMPORTED_MODULE_0__.default();\r\nlet gridController = new (_Grid_GridController__WEBPACK_IMPORTED_MODULE_1___default())(storageController);\r\nlet navigationController = new (_Navigation_NavigationController__WEBPACK_IMPORTED_MODULE_2___default())(storageController, gridController);\r\nlet formController = new (_RegionForm_FormController__WEBPACK_IMPORTED_MODULE_3___default())(storageController, gridController);\n\n//# sourceURL=webpack://crowdr_joren_fedor/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;