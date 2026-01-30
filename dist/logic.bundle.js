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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.css */ \"./src/style/style.css\");\n\r\n//import './style/style.scss';\r\n\r\n\r\n\r\n\r\n/*creo due costanti per le due classi*/\r\nconst hamMenu = document.querySelector('.ham-menu');\r\nconst offScreenMenu = document.querySelector('.off-screen-menu');\r\nconst elencMenu= document.querySelectorAll('.off-screen-menu h3 a')//qualsiasi all\r\n\r\n\r\nhamMenu.addEventListener('click', () => {\r\n    hamMenu.classList.toggle('active');  // attivo/disattivo la X\r\n    offScreenMenu.classList.toggle('active'); // mostro/nascondo il menu\r\n    \r\n    // Blocca lo scroll quando il menu è aperto\r\n    document.body.classList.toggle('no-scroll');\r\n})\r\n\r\n//su qualsiasi elemento che clicchi \r\nelencMenu.forEach(link => {\r\n    link.addEventListener('click', ()=>{\r\n        offScreenMenu.classList.toggle('active');//nascondo menu\r\n        hamMenu.classList.toggle('active');  // attivo/disattivo la X\r\n        document.body.classList.toggle('no-scroll');//se era bloccato lo riattiva\r\n\r\n    });\r\n});\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/logic.js?\n}");

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