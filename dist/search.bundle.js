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

/***/ "./src/js/menu.js"
/*!************************!*\
  !*** ./src/js/menu.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchMenu: () => (/* binding */ fetchMenu),\n/* harmony export */   setUpMenu: () => (/* binding */ setUpMenu)\n/* harmony export */ });\n\r\n//MENU LOGIC\r\n\r\n//create a fetch to get menu in menu.html-->\r\n\r\n//const currentPage = document.body.dataset.currentPage;\r\n\r\n//function to load and add header(menu) to html file\r\nfunction fetchMenu(){\r\n    return fetch(\"menu.html\")\r\n    .then(res =>res.text()) //then response in text form\r\n    .then(html=>{\r\n        \r\n        const header = document.getElementById(\"header\");\r\n        header.innerHTML = html;\r\n        return header\r\n    })\r\n}\r\n\r\n//function to remuve disable class and add it to current page (link a)\r\nfunction disableLinkCurrentPage(header,currentPage){\r\n    header.querySelectorAll(\"a[data-page]\").forEach(link => {\r\n    link.classList.remove(\"disable\");\r\n\r\n    if (link.dataset.page === currentPage) {\r\n        link.classList.add(\"disable\");\r\n        }\r\n    });\r\n}\r\n\r\n\r\n//function to activate all toggle manu \r\nfunction activateToggleMenu(header){\r\n    \r\nconst hamMenu = header.querySelector('.ham-menu');\r\nconst offScreenMenu = header.querySelector('.off-screen-menu');\r\nconst elencMenu= header.querySelectorAll('.off-screen-menu h3 a');// all\r\n\r\nhamMenu.addEventListener('click', () => {\r\n        hamMenu.classList.toggle('active');  // anable and disable X\r\n        offScreenMenu.classList.toggle('active'); // show/hidden menu\r\n        \r\n        // block scrolling when menu is open\r\n        document.body.classList.toggle('no-scroll');\r\n    })\r\n\r\n    //if you clink in every other part\r\n    elencMenu.forEach(link => {\r\n        link.addEventListener('click', ()=>{\r\n            offScreenMenu.classList.toggle('active');//hidden menu\r\n            hamMenu.classList.toggle('active');  // anable and disable X\r\n            document.body.classList.toggle('no-scroll');//if it was blocked I active it\r\n\r\n        });\r\n    });\r\n\r\n}\r\n\r\n\r\n// function to recall all the functions about header(menu)\r\nfunction setUpMenu(currentPage){\r\n    fetchMenu()\r\n    .then(header=>{disableLinkCurrentPage(header,currentPage);\r\n    activateToggleMenu(header);\r\n    })\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    \r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/menu.js?\n}");

/***/ },

/***/ "./src/js/search.js"
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_search_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/search.css */ \"./src/style/search.css\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./src/js/menu.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst currentPage = document.body.dataset.currentPage;\r\n\r\n(0,_menu_js__WEBPACK_IMPORTED_MODULE_1__.setUpMenu)(currentPage);\r\n\r\nconst menu_filters = document.getElementById(\"more-filters\");\r\n//const delete_html_filter= document.getElementById(\"delete_html_filter\");\r\nconst button_filters = document.getElementById(\"filters\");\r\n//if I click I pass hover mouse  get other informations info\r\nlet selectedLanguage =\"en\";\r\n//default hide menu filters\r\nmenu_filters.style.display =\"none\";\r\n//take input category value \r\nconst searchButton = document.getElementById('cerca');\r\nconst categoryInput = document.getElementById('category');\r\nconst risultatiDiv = document.getElementById('risultati');\r\nrisultatiDiv.style.display = \"none\";\r\nconst searchButtonFilter = document.getElementById(\"search_filter\");\r\n\r\n//I whant to check if textbox category isn't empty \r\ncategoryInput.addEventListener(\"input\", () => {\r\n    const category = categoryInput.value.trim();\r\n    if (category !== \"\") {\r\n        searchButton.style.color = \"white\";\r\n    } else {\r\n        searchButton.style.color = \"grey\";\r\n}\r\n});\r\n\r\n\r\n\r\nfunction cleanResults(){\r\n    risultatiDiv.innerHTML = \"\"; \r\n}\r\n\r\n\r\nfunction buttonDelete(){\r\n//create button for delete \r\n    const deleteBt=document.createElement(\"button\");\r\n        deleteBt.id = \"delete_bt\";\r\n        deleteBt.type = \"button\";\r\n        deleteBt.classList.add(\"btn-close\");\r\n        deleteBt.setAttribute(\"aria-label\", \"Close\");\r\n        risultatiDiv.appendChild(deleteBt);\r\n\r\n    deleteBt.addEventListener(\"click\",()=>{\r\n        risultatiDiv.style.display=\"none\";\r\n        //risultatiDiv.innerHTML = \"\";\r\n        cleanResults()\r\n    })\r\n}\r\n\r\n\r\nfunction createInfoIcon(){\r\n//create icone info to information about book\r\n    const infoIcon = document.createElement('i');\r\n    infoIcon.classList.add('bi', 'bi-info-circle-fill');\r\n    infoIcon.id = \"info_icon\";\r\n    risultatiDiv.appendChild(infoIcon);\r\n    let infobox = null;\r\n\r\n//if I pass over the icon show alert with information\r\n    infoIcon.addEventListener(\"mouseover\", () => {\r\n        if (infobox) return;\r\n        infobox =document.createElement(\"div\");\r\n        infobox.id=\"info_box\";\r\n        infobox.textContent = \"List of books with authors and titles based on the selected category.\";\r\n    risultatiDiv.appendChild(infobox);\r\n    });\r\n\r\n    //if I exit from icon the infobox disappear\r\n    infoIcon.addEventListener(\"mouseleave\",()=>{\r\n        if (infobox) {\r\n            infobox.remove();\r\n            infobox = null;\r\n        }\r\n        \r\n    });\r\n\r\n}\r\n\r\n\r\nfunction fetchBookDescription(){\r\n    //if I click I pass hover mouse  get other informations info\r\n    const bookTitles = document.querySelectorAll(\".book-title\");\r\n    //when Iclick on titles description\r\n    bookTitles.forEach(title => {\r\n    title.addEventListener(\"click\", async() => {\r\n        \r\n        const row = title.closest(\".book-row\");\r\n        //call another API \r\n        //donm't usen encodeURIComponent bacause it trasform / in %\r\n        const url =`https://openlibrary.org${title.id}.json`;\r\n        console.log(\"Url richiesta desc:\", url)\r\n        console.log(\"stampo id:\", title.id)\r\n        try{\r\n            const response = await fetch(url);\r\n            if(!response.ok) \r\n                throw new Error(\"Error loading description\")\r\n                const data = await response.json();\r\n                console.log(\"Risultati descrizione API:\",data.description)\r\n            if (!row) \r\n                return;\r\n            // see if already exist a description box\r\n            if (row.nextElementSibling?.classList.contains(\"description-box\")) {\r\n                return;// not duplicate \r\n            }\r\n            let descriptionText = \"Description not available\";\r\n            if (data.description) {\r\n                //get text if it is a string or an object because we have differents types\r\n                let rawText = (typeof data.description === \"string\") ? data.description : (typeof data.description === \"object\" && data.description.value) \r\n                ? data.description.value : \"Description not available\";\r\n                // traslate language is it isn't in english\r\n                if (selectedLanguage !== \"en\") {\r\n                    descriptionText = await translateText(rawText, selectedLanguage);\r\n                    console.log(\"Descrizione tradotta:\", descriptionText);\r\n                } else {\r\n                    descriptionText = rawText;\r\n                }\r\n            }\r\n            // create description div when put my informations\r\n            const divPlace = document.createElement(\"div\");\r\n            divPlace.classList.add(\"description-box\");\r\n            const titleDesc= document.createElement(\"h5\")\r\n            titleDesc.classList.add(\"desc_title\")\r\n            titleDesc.textContent=\" Description:\"\r\n\r\n            const pDesc= document.createElement(\"p\");\r\n            pDesc.classList.add(\"desc_p\");\r\n            pDesc.textContent = descriptionText;\r\n            \r\n            divPlace.appendChild(titleDesc)\r\n            divPlace.appendChild(pDesc);\r\n            //insert under the title row\r\n            row.after(divPlace);\r\n\r\n            //create button for delete \r\n            const deleteBt=document.createElement(\"button\");\r\n            deleteBt.id = \"delete_bt-des\";\r\n            deleteBt.type = \"button\";\r\n            deleteBt.classList.add(\"btn-close\");\r\n            deleteBt.setAttribute(\"aria-label\", \"Close\");\r\n            divPlace.appendChild(deleteBt);\r\n\r\n            deleteBt.addEventListener(\"click\",()=>{\r\n                divPlace.remove();\r\n                //deleteBt.remove();\r\n            })\r\n    \r\n        }catch(error){\r\n            console.error(\"Error dowloand description\",error)\r\n        }\r\n        });\r\n    });\r\n}\r\n\r\n\r\nfunction CreateDom(data){\r\n    cleanResults()\r\n    //risultatiDiv.innerHTML = \"\"; // pulisce risultati precedenti\r\n    if(data.numFound==0){\r\n        cleanResults()\r\n        //risultatiDiv.innerHTML = \"\"; // pulisce risultati precedenti\r\n        alert(\"No books were found! Try a different search.\")\r\n    }else{\r\n        data.docs.forEach(doc => {\r\n            const rowDiv = document.createElement('div');\r\n            rowDiv.classList.add('book-row');\r\n            rowDiv.id = doc.key; \r\n            // remuve /works/ from key to have a valid ID\r\n            const inerrRowDiv = document.createElement('div');\r\n            inerrRowDiv.classList.add('inner-row');\r\n            rowDiv.appendChild(inerrRowDiv);\r\n\r\n            const titleElement = document.createElement('a');\r\n            titleElement.textContent = doc.title ?? \"Title not available\";\r\n            titleElement.id = doc.key;\r\n            titleElement.classList.add('book-title', 'btn', 'btn-primary');\r\n            titleElement.setAttribute('data-bs-toggle', 'collapse');\r\n            titleElement.setAttribute('href', '#collapseExample');\r\n            titleElement.setAttribute('role', 'button');\r\n            titleElement.setAttribute('aria-expanded', 'false');\r\n            titleElement.setAttribute('aria-controls', 'collapseExample');\r\n\r\n            const authorElement = document.createElement('h3');\r\n            authorElement.textContent = doc.author_name ? doc.author_name.join(\", \") : \"Autore sconosciuto\";\r\n            authorElement.classList.add('book-author');\r\n            authorElement.id = doc.key;\r\n            \r\n            risultatiDiv.style.display=\"block\";\r\n            inerrRowDiv.appendChild(authorElement);\r\n            inerrRowDiv.appendChild(titleElement);\r\n            rowDiv.appendChild(inerrRowDiv);\r\n            risultatiDiv.appendChild(rowDiv);\r\n\r\n        });\r\n        //create button for delete \r\n        buttonDelete();\r\n        //create infobox\r\n        createInfoIcon();\r\n        //make the fetch \r\n        fetchBookDescription();\r\n    }\r\n}\r\n\r\n\r\n//if I click on search button\r\nsearchButton.addEventListener(\"click\", async () => {\r\n    const category = categoryInput.value.trim();\r\n    if (!category){\r\n        alert(\"Please enter a valid category.\");\r\n        return;\r\n    };\r\n    const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +\"&limit=20\";\r\n    console.log(\"URL richiesta:\", url); \r\n    try {\r\n        const response = await fetch(url);\r\n        if (!response.ok) \r\n            throw new Error(\"Errore API \" + response.status);\r\n            const data = await response.json();\r\n            console.log(\"Risultati API:\", data.docs);\r\n        if(selectedLanguage===\"en\"){\r\n            console.log(\"selectedLanguage:\",selectedLanguage)\r\n            //ViewSearch(data);\r\n            CreateDom(data)\r\n        }\r\n        else{\r\n            console.log(\"lingua selezionata differente\")\r\n        }\r\n    } catch (error) {\r\n        console.error(\"Errore durante il recupero dei dati:\", error);\r\n    }\r\n});\r\n\r\n\r\nconst delete_html_filter= document.getElementById(\"delete_html_filter\");\r\n//if I click on more filters show menu filter\r\nbutton_filters.addEventListener(\"click\",()=>{\r\n    menu_filters.style.display=\"block\";\r\n})\r\n//add x to close menu filter (part in html)\r\ndelete_html_filter.addEventListener(\"click\",async()=>{\r\n    menu_filters.style.display=\"none\";\r\n});\r\n\r\n\r\n\r\nfunction changeSearchFilter(){\r\n    \r\n    const authorInput = document.getElementById(\"author\");\r\n    const titleInput = document.getElementById(\"title\");\r\n    const author = authorInput.value.trim();\r\n    const title = titleInput.value.trim();\r\n    if (author !== \"\" || title !== \"\"){\r\n        searchButtonFilter.style.color = \"white\";\r\n    }else{\r\n        searchButtonFilter.style.color = \"grey\";\r\n    }\r\n}\r\n\r\n\r\n/*search with author and title and language if there is also category,\r\neverything will be work also if there insn't one or more selections.*/\r\n//language selection:\r\n    \r\n/*first step get category and all the other choosen*/\r\n//const categoryInput = document.getElementById('category'); get value\r\nsearchButtonFilter.addEventListener(\"click\",async()=>{\r\n    const authorInput = document.getElementById(\"author\");\r\n    const titleInput = document.getElementById(\"title\");\r\n    //function to change color from grey to white to Search button in the filters\r\n    changeSearchFilter()\r\n\r\n   //same \r\n    console.log(authorInput.value ? authorInput.value : \"autore non selezionato\");\r\n    console.log(titleInput.value ? titleInput.value: \"titolo non selezionato\");\r\n    console.log (categoryInput.value ? categoryInput.value : \"categoria non selezionata\");\r\n    //console.log(languageSelecte.value ? languageSelecte.value : \"linguaggio non selezionato\");\r\n    console.log(\"Lingua usata nella ricerca:\", selectedLanguage);\r\n    const baseUrl= `https://openlibrary.org/search.json`\r\n    //object for create dynamic url, amazing!\r\n    const params = new URLSearchParams();\r\n    //category\r\n    if (categoryInput.value) {\r\n    params.append(\"subject\", categoryInput.value);\r\n    }\r\n    //author\r\n    if(authorInput.value){\r\n        params.append(\"author_name\",authorInput.value);\r\n    }\r\n    //title\r\n    if(titleInput.value){\r\n        params.append(\"title\",titleInput.value);\r\n    }\r\n    //limit \r\n    params.append(\"limit\", \"20\");\r\n    const url = `${baseUrl}?${params.toString()}`;\r\n    console.log(url);\r\n    try{\r\n        const response = await fetch(url);\r\n        if(!response.ok) throw new Error(\"Errore caricamento descrizione\")\r\n            const data = await response.json();\r\n        console.log(data);\r\n        //call function\r\n        CreateDom(data)\r\n    }catch(error){\r\n        console.error(\"Errore fetch dei filtri aggiuntivi\",error)\r\n    }\r\n});\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/search.js?\n}");

/***/ },

/***/ "./src/style/search.css"
/*!******************************!*\
  !*** ./src/style/search.css ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/style/search.css?\n}");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/search.js");
/******/ 	
/******/ })()
;