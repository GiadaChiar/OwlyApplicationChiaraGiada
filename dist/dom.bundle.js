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

/***/ "./src/js/dom.js"
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cleanResults: () => (/* binding */ cleanResults),\n/* harmony export */   createCloseButton: () => (/* binding */ createCloseButton),\n/* harmony export */   createDomBookDescription: () => (/* binding */ createDomBookDescription),\n/* harmony export */   createElements: () => (/* binding */ createElements),\n/* harmony export */   createInfoIcon: () => (/* binding */ createInfoIcon),\n/* harmony export */   updateButtonColor: () => (/* binding */ updateButtonColor)\n/* harmony export */ });\n//Create Dom and elements\r\n\r\n//change color if you write into input\r\n/*function updateButtonColor(){\r\n    const author=authorInput.value.trim();\r\n    const title = titleInput.value.trim();\r\n    const category = categoryInput.value.trim();\r\n    if (author !== \"\" || title !== \"\") {\r\n        searchButtonFilter.style.color = \"white\";\r\n    }else {\r\n        searchButtonFilter.style.color = \"grey\";\r\n    }\r\n    if(category !== \"\"){\r\n        searchButton.style.color = \"white\";\r\n    }\r\n    else {\r\n        searchButton.style.color = \"grey\";\r\n    }\r\n}\r\n*/\r\n\r\n\r\n//change color if you write into input\r\nfunction updateButtonColor(categoryInput,authorInput,titleInput,searchButton,searchButtonFilter){\r\n    const author=authorInput.value.trim();\r\n    const title = titleInput.value.trim();\r\n    const category = categoryInput.value.trim();\r\n    if (author !== \"\" || title !== \"\") {\r\n        searchButtonFilter.style.color = \"white\";\r\n    }else {\r\n        searchButtonFilter.style.color = \"grey\";\r\n    }\r\n    if(category !== \"\"){\r\n        searchButton.style.color = \"white\";\r\n    }\r\n    else {\r\n        searchButton.style.color = \"grey\";\r\n    }\r\n}\r\n\r\n\r\n/*\r\n//clean results\r\nfunction cleanResults(){\r\n    resultsDiv.innerHTML = \"\"; \r\n}\r\n*/\r\n\r\nfunction cleanResults(resultsDiv){\r\n    resultsDiv.innerHTML = \"\"; \r\n}\r\n\r\n\r\n//function to help me to create elements\r\nfunction createElements({tag,className,id,textContent,parentElement,attributes ={}}){\r\n    //create element \r\n    let element= document.createElement(tag);\r\n    if(className) {\r\n        className.split(' ').forEach(cls => element.classList.add(cls));\r\n    }\r\n    if(id){\r\n        element.id = id;\r\n    }\r\n    if(textContent){\r\n        element.textContent = textContent;\r\n    }\r\n    if (attributes && typeof attributes ==='object'){\r\n        for (let key in attributes){\r\n            element.setAttribute(key,attributes[key])\r\n        }\r\n    }\r\n    if(parentElement){\r\n        parentElement.appendChild(element)\r\n    }\r\n    return element;\r\n}\r\n\r\n\r\n//generic function to targetElement to choose when you want it \r\nfunction createCloseButton(targetElement){\r\n    let deleteButton = createElements({tag:'button',className:'btn-close',attributes:{\r\n        \"aria-label\": \"Close\"\r\n    }})\r\n    //to find where you want it\r\n    deleteButton.type = \"button\";\r\n    targetElement.appendChild(deleteButton)\r\n}\r\n\r\n/*\r\n//create and function to InfoIcon\r\nfunction createInfoIcon(){\r\n//create icone info to information about book\r\n    const infoIcon  = createElements({tag:'i',className:'bi bi-info-circle-fill',id:'info_icon',parentElement:resultsDiv})\r\n    let infobox = null;\r\n\r\n//if I pass over the icon show alert with information\r\n\r\n    infoIcon.addEventListener(\"mouseover\", () => {\r\n        if (infobox) return;\r\n        infobox = createElements({tag:\"div\",id:\"info_box\",textContent: \"List of books with authors and titles based on the selected category.\",parentElement: resultsDiv});\r\n    });\r\n    \r\n    //if I exit from icon the infobox disappear\r\n    infoIcon.addEventListener(\"mouseleave\",()=>{\r\n        if (infobox) {\r\n            infobox.remove();\r\n            infobox = null;\r\n        }\r\n    });\r\n}\r\n*/\r\n//create and function to InfoIcon\r\nfunction createInfoIcon(resultsDiv){\r\n//create icone info to information about book\r\n    const infoIcon  = createElements({tag:'i',className:'bi bi-info-circle-fill',id:'info_icon',parentElement:resultsDiv})\r\n    let infobox = null;\r\n\r\n//if I pass over the icon show alert with information\r\n\r\n    infoIcon.addEventListener(\"mouseover\", () => {\r\n        if (infobox) return;\r\n        infobox = createElements({tag:\"div\",id:\"info_box\",textContent: \"List of books with authors and titles based on the selected category.\",parentElement: resultsDiv});\r\n    });\r\n    \r\n    //if I exit from icon the infobox disappear\r\n    infoIcon.addEventListener(\"mouseleave\",()=>{\r\n        if (infobox) {\r\n            infobox.remove();\r\n            infobox = null;\r\n        }\r\n    });\r\n}\r\n\r\n\r\n//create section about Description Book \r\nfunction createDomBookDescription(data,row){\r\n    if (row.nextElementSibling?.classList.contains(\"description-box\")) return;// not duplicate \r\n    let descriptionText = \"Description not available\";\r\n            if (data.description) {\r\n                //get text if it is a string or an object because we have differents types\r\n                let rawText = (typeof data.description === \"string\") ? data.description : (typeof data.description === \"object\" && data.description.value) \r\n                ? data.description.value : \"Description not available\";\r\n                descriptionText = rawText\r\n            }\r\n            const divDescription = createElements({tag:'div',className:'description-box'})\r\n            const titleDescription = createElements({tag:'h5',className:'desc_title',textContent:' Description:'})\r\n            const pDescription = createElements({tag:'p',className:'desc_p',textContent: descriptionText})\r\n            //append\r\n            divDescription.appendChild(titleDescription)\r\n            divDescription.appendChild(pDescription);\r\n            //insert under the title row\r\n            row.after(divDescription);\r\n            createCloseButton(divDescription);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/dom.js?\n}");

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
/******/ 	__webpack_modules__["./src/js/dom.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;