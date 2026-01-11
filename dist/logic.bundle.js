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

/***/ "./src/js/logic.js"
/*!*************************!*\
  !*** ./src/js/logic.js ***!
  \*************************/
() {

eval("{\r\n//import './style/style.scss';\r\n\r\n\r\n/*creo due costanti per le due classi*/\r\nconst hamMenu = document.querySelector('.ham-menu');\r\nconst offScreenMenu = document.querySelector('.off-screen-menu');\r\nconst elencMenu= document.querySelectorAll('.off-screen-menu h3 a')//qualsiasi all\r\n\r\n\r\nhamMenu.addEventListener('click', () => {\r\n    hamMenu.classList.toggle('active');  // attivo/disattivo la X\r\n    offScreenMenu.classList.toggle('active'); // mostro/nascondo il menu\r\n    \r\n    // Blocca lo scroll quando il menu è aperto\r\n    document.body.classList.toggle('no-scroll');\r\n})\r\n\r\n//su qualsiasi elemento che clicchi \r\nelencMenu.forEach(link => {\r\n    link.addEventListener('click', ()=>{\r\n        offScreenMenu.classList.toggle('active');//nascondo menu\r\n        hamMenu.classList.toggle('active');  // attivo/disattivo la X\r\n        document.body.classList.toggle('no-scroll');//se era bloccato lo riattiva\r\n\r\n    });\r\n});\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/logic.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/logic.js"]();
/******/ 	
/******/ })()
;