/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/logic.js"
/*!*************************!*\
  !*** ./src/js/logic.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.css */ \"./src/style/style.css\");\n\r\n//import './style/style.scss';\r\n\r\n\r\n//create a fetch to get menu in menu.html-->\r\n\r\nconst currentPage = document.body.dataset.currentPage;\r\n\r\n//function to load and add header(menu) to html file\r\nfunction fetchMenu(){\r\n    return fetch(\"/menu.html\")\r\n    .then(res =>res.text()) //then response in text form\r\n    .then(html=>{\r\n        \r\n        const header = document.getElementById(\"header\");\r\n        header.innerHTML = html;\r\n        return header\r\n    })\r\n}\r\n\r\n//function to remuve disable class and add it to current page (link a)\r\nfunction disableLinkCurrentPage(header){\r\n    header.querySelectorAll(\"a[data-page]\").forEach(link => {\r\n    link.classList.remove(\"disable\");\r\n\r\n    if (link.dataset.page === currentPage) {\r\n        link.classList.add(\"disable\");\r\n        }\r\n    });\r\n}\r\n\r\n\r\n//function to activate all toggle manu \r\nfunction activateToggleMenu(header){\r\n    \r\nconst hamMenu = header.querySelector('.ham-menu');\r\nconst offScreenMenu = header.querySelector('.off-screen-menu');\r\nconst elencMenu= header.querySelectorAll('.off-screen-menu h3 a');// all\r\n\r\nhamMenu.addEventListener('click', () => {\r\n        hamMenu.classList.toggle('active');  // anable and disable X\r\n        offScreenMenu.classList.toggle('active'); // show/hidden menu\r\n        \r\n        // block scrolling when menu is open\r\n        document.body.classList.toggle('no-scroll');\r\n    })\r\n\r\n    //if you clink in every other part\r\n    elencMenu.forEach(link => {\r\n        link.addEventListener('click', ()=>{\r\n            offScreenMenu.classList.toggle('active');//hidden menu\r\n            hamMenu.classList.toggle('active');  // anable and disable X\r\n            document.body.classList.toggle('no-scroll');//if it was blocked I active it\r\n\r\n        });\r\n    });\r\n\r\n}\r\n\r\n// function to recall all the functions about header(menu)\r\nfunction setUpMenu(){\r\n    fetchMenu()\r\n    .then(header=>{disableLinkCurrentPage(header);\r\n    activateToggleMenu(header);\r\n    })\r\n}\r\n\r\n//call it to work menu\r\nsetUpMenu();\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    \r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/logic.js?\n}");

/***/ },

/***/ "./src/style/style.css"
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/style/style.css?\n}");

/***/ }

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/logic.js");
/******/ 	
/******/ })()
;