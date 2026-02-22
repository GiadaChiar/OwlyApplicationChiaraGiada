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

/***/ "./src/js/api.js"
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createFilterFetch: () => (/* binding */ createFilterFetch),\n/* harmony export */   fetchBookData: () => (/* binding */ fetchBookData),\n/* harmony export */   fetchJson: () => (/* binding */ fetchJson)\n/* harmony export */ });\n//function for API calls\r\n\r\n//standard response error\r\nasync function fetchJson(url){\r\n        const response = await fetch(url);\r\n        if(!response.ok){\r\n            throw new Error(`Error, fetch failed or book's id not found: ${response.status}`)\r\n        }\r\n        const data = await response.json();\r\n        return data;\r\n}\r\n\r\n\r\n//fetch description title \r\nasync function fetchBookData(titleId,row){\r\n    //call another API \r\n        //don't usen encodeURIComponent bacause it trasform / in %\r\n        const url =`https://openlibrary.org${titleId}.json`;\r\n        console.log(\"Url request description:\", url)\r\n        console.log(\"print id:\", titleId)\r\n        try{\r\n            const data = await fetchJson(url);\r\n            console.log(\"Description API:\", data.description);\r\n                if (!row) \r\n                return;\r\n            createDomBookDescription(data,row);\r\n        }catch(error){\r\n            console.error(\"Error to create or insert text to description section\",error)\r\n        }\r\n        \r\n}\r\n\r\n\r\n// create fetch filter \r\nfunction createFilterFetch (categoryInput,authorInput,titleInput){\r\n    const baseUrl= `https://openlibrary.org/search.json`\r\n    const params = new URLSearchParams();\r\n    //category\r\n    if (categoryInput.value) {\r\n    params.append(\"subject\", categoryInput.value);\r\n    }\r\n    //author\r\n    if(authorInput.value){\r\n        params.append(\"author_name\",authorInput.value);\r\n    }\r\n    //titleselectedLanguage\r\n    if(titleInput.value){\r\n        params.append(\"title\",titleInput.value);\r\n    }\r\n    //limit \r\n    params.append(\"limit\", \"20\");\r\n    const url = `${baseUrl}?${params.toString()}`;\r\n    return url;\r\n}\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/api.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/api.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;