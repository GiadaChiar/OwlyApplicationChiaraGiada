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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchMenu: () => (/* binding */ fetchMenu),\n/* harmony export */   setUpMenu: () => (/* binding */ setUpMenu)\n/* harmony export */ });\n\r\n//MENU LOGIC\r\n//create a fetch to get menu in menu.html\r\n//const currentPage = document.body.dataset.currentPage;\r\n\r\n//function to load and add header(menu) to html file\r\nfunction fetchMenu(){\r\n    return fetch(\"menu.html\")\r\n    .then(res =>res.text()) //then response in text form\r\n    .then(html=>{ \r\n        const header = document.getElementById(\"header\");\r\n        header.innerHTML = html;\r\n        return header\r\n    })\r\n}\r\n\r\n\r\n//function to remuve disable class and add it to current page (link a)\r\nfunction disableLinkCurrentPage(header,currentPage){\r\n    header.querySelectorAll(\"a[data-page]\").forEach(link => {\r\n    link.classList.remove(\"disable\");\r\n    if (link.dataset.page === currentPage) {\r\n        link.classList.add(\"disable\");\r\n        }\r\n    });\r\n}\r\n\r\n\r\n//function to activate all toggle manu \r\nfunction activateToggleMenu(header){\r\nconst hamMenu = header.querySelector('.ham-menu');\r\nconst offScreenMenu = header.querySelector('.off-screen-menu');\r\nconst elencMenu= header.querySelectorAll('.off-screen-menu h3 a');// all\r\n\r\nhamMenu.addEventListener('click', () => {\r\n        hamMenu.classList.toggle('active');  // anable and disable X\r\n        offScreenMenu.classList.toggle('active'); // show/hidden menu\r\n        // block scrolling when menu is open\r\n        document.body.classList.toggle('no-scroll');\r\n    })\r\n\r\n    //if you clink in every other part\r\n    elencMenu.forEach(link => {\r\n        link.addEventListener('click', ()=>{\r\n            offScreenMenu.classList.toggle('active');//hidden menu\r\n            hamMenu.classList.toggle('active');  // anable and disable X\r\n            document.body.classList.toggle('no-scroll');//if it was blocked I active it\r\n        });\r\n    });\r\n}\r\n\r\n\r\n// function to recall all the functions about header(menu)\r\nfunction setUpMenu(currentPage){\r\n    fetchMenu()\r\n    .then(header=>{disableLinkCurrentPage(header,currentPage);\r\n    activateToggleMenu(header);\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/menu.js?\n}");

/***/ },

/***/ "./src/js/search.js"
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_search_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/search.css */ \"./src/style/search.css\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./src/js/menu.js\");\n\r\n\r\n\r\n\r\n\r\nconst currentPage = document.body.dataset.currentPage;\r\n(0,_menu_js__WEBPACK_IMPORTED_MODULE_1__.setUpMenu)(currentPage);\r\nconst menu_filters = document.getElementById(\"more-filters\");\r\nconst button_filters = document.getElementById(\"filters\");\r\n//if I click I pass hover mouse  get other informations info\r\n//default hide menu filters\r\nmenu_filters.style.display =\"none\";\r\n//take input category value \r\nconst searchButton = document.getElementById('search');\r\nconst categoryInput = document.getElementById('category');\r\nconst resultsDiv = document.getElementById('results');\r\nresultsDiv.style.display = \"none\";\r\nconst searchButtonFilter = document.getElementById(\"search_filter\");\r\nconst authorInput = document.getElementById(\"author\");\r\nconst titleInput = document.getElementById(\"title\");\r\nconst delete_html_filter= document.getElementById(\"delete_html_filter\");\r\n\r\n\r\n//I want to check if textbox category isn't empty \r\ncategoryInput.addEventListener(\"input\", () => {\r\n    const category = categoryInput.value.trim();\r\n    if (category !== \"\") {\r\n        searchButton.style.color = \"white\";\r\n    } else {\r\n        searchButton.style.color = \"grey\";\r\n    }\r\n});\r\n\r\n\r\nfunction cleanResults(){\r\n    resultsDiv.innerHTML = \"\"; \r\n}\r\n\r\n\r\n//create dom is too much long I needed to create a function to help me to create objects \r\nfunction createElements(tag,className,idName,text,fatherName,attributes ={}){\r\n    //create element \r\n    let constName = document.createElement(tag);\r\n    if(className) {\r\n        className.split(' ').forEach(cls => constName.classList.add(cls));\r\n    }\r\n    if(idName){\r\n        constName.id = idName;\r\n    }\r\n    if(text){\r\n        constName.textContent = text;\r\n    }\r\n    if (attributes && typeof attributes ==='object'){\r\n        for (let key in attributes){\r\n            constName.setAttribute(key,attributes[key])\r\n        }\r\n    }\r\n    if(fatherName){\r\n        fatherName.appendChild(constName)\r\n    }\r\n    return constName;\r\n\r\n}\r\n\r\n//generic function to targetElement to choose when you want it \r\nfunction buttonDelete(targetElement){\r\n    //create button for delete \r\n    /* const deleteButton=document.createElement(\"button\");\r\n    deleteButton.type = \"button\";\r\n    deleteButton.classList.add(\"btn-close\");\r\n    deleteButton.setAttribute(\"aria-label\", \"Close\");*/\r\n    let deleteButton = createElements('button','btn-close',undefined,undefined,undefined,{\r\n        \"aria-label\": \"Close\"\r\n    })\r\n    //to find where you want it\r\n    deleteButton.type = \"button\";\r\n    targetElement.appendChild(deleteButton)//father=targetElement\r\n    deleteButton.addEventListener(\"click\",()=>{\r\n        if(targetElement === resultsDiv){\r\n            resultsDiv.style.display=\"none\";\r\n            cleanResults()\r\n        }else{\r\n            targetElement.remove();\r\n        }\r\n    })\r\n}\r\n\r\n\r\nfunction createInfoIcon(){\r\n//create icone info to information about book\r\n    /*const infoIcon = document.createElement('i');\r\n    infoIcon.classList.add('bi','bi-info-circle-fill');\r\n    infoIcon.id = \"info_icon\";\r\n    resultsDiv.appendChild(infoIcon);*/\r\n    const infoIcon  = createElements('i','bi bi-info-circle-fill','info_icon',undefined,resultsDiv)\r\n    let infobox = null;\r\n\r\n//if I pass over the icon show alert with information\r\n    infoIcon.addEventListener(\"mouseover\", () => {\r\n        if (infobox) return;\r\n        infobox =document.createElement(\"div\");\r\n        infobox.id=\"info_box\";\r\n        infobox.textContent = \"List of books with authors and titles based on the selected category.\";\r\n    resultsDiv.appendChild(infobox);\r\n    });\r\n\r\n    //if I exit from icon the infobox disappear\r\n    infoIcon.addEventListener(\"mouseleave\",()=>{\r\n        if (infobox) {\r\n            infobox.remove();\r\n            infobox = null;\r\n        }\r\n    });\r\n}\r\n\r\n\r\nfunction fetchBookDescription(){\r\n    resultsDiv.addEventListener(\"click\", async(event)=>{\r\n        const title = event.target.closest(\".book-title\");\r\n        if(!title) return; //if I don't click in title exit\r\n        const row = title.closest(\".book-row\") //if I click on title\r\n        if(!row)return;\r\n        //call another API \r\n        //don't usen encodeURIComponent bacause it trasform / in %\r\n        const url =`https://openlibrary.org${title.id}.json`;\r\n        console.log(\"Url richiesta desc:\", url)\r\n        console.log(\"stampo id:\", title.id)\r\n        try{\r\n            const response = await fetch(url);\r\n            if(!response.ok){\r\n                throw new Error(\"Error, fetch failed or book's id not found\")\r\n            }\r\n            const data = await response.json();\r\n            console.log(\"Risultati descrizione API:\", data.description);\r\n                if (!row) \r\n                return;\r\n            // see if already exist a description box\r\n            if (row.nextElementSibling?.classList.contains(\"description-box\")) {\r\n                return;// not duplicate \r\n            }\r\n            let descriptionText = \"Description not available\";\r\n            if (data.description) {\r\n                //get text if it is a string or an object because we have differents types\r\n                let rawText = (typeof data.description === \"string\") ? data.description : (typeof data.description === \"object\" && data.description.value) \r\n                ? data.description.value : \"Description not available\";\r\n                descriptionText = rawText\r\n            }\r\n\r\n            // create description div when put my informations\r\n            /*\r\n            const divDescription = document.createElement(\"div\");\r\n            divDescription.classList.add(\"description-box\");\r\n            const titleDesc= document.createElement(\"h5\")\r\n            titleDesc.classList.add(\"desc_title\")\r\n            titleDesc.textContent=\" Description:\"*/\r\n            const divDescription = createElements('div','description-box',undefined,undefined,undefined)\r\n            const titleDescription = createElements('h5','desc_title\"',undefined,' Description:',undefined)\r\n\r\n            /*\r\n            const pDescription= document.createElement(\"p\");\r\n            pDescription.classList.add(\"desc_p\");\r\n            pDescription.textContent = descriptionText;\r\n            */\r\n            const pDescription = createElements('p','desc_p',undefined,descriptionText,undefined)\r\n            //append\r\n            divDescription.appendChild(titleDescription)\r\n            divDescription.appendChild(pDescription);\r\n            //insert under the title row\r\n            row.after(divDescription);\r\n            buttonDelete(divDescription);\r\n        }catch(error){\r\n            console.error(\"Error to create or insert text to description section\",error)\r\n        }\r\n    \r\n    });\r\n}\r\n\r\n\r\n\r\n\r\n\r\nfunction CreateDom(data){\r\n    cleanResults()\r\n    if(data.numFound==0){\r\n        cleanResults()\r\n        alert(\"No books were found! Try a different search.\")\r\n    }else{\r\n        data.docs.forEach(doc => {\r\n            let rowDiv = createElements('div','book-row',doc.key,undefined,resultsDiv);\r\n            let insideRowDiv =createElements('div','inner-row',undefined,undefined,rowDiv);\r\n            let authorElement= createElements('h3','book-author',doc.key + '-author',doc.author_name ? doc.author_name.join(\", \") : \"Author unknown\",insideRowDiv);\r\n            let titleElement = createElements('a','book-title btn btn-primary',doc.key,doc.title ?? \"Title not available\",insideRowDiv,{\r\n                'data-bs-toggle': 'collapse',\r\n                'href': '#collapseExample',\r\n                'role':'button',\r\n                'aria-expanded': 'false',\r\n                'aria-controls': 'collapseExample'\r\n            });\r\n            \r\n            resultsDiv.style.display=\"block\";\r\n        });\r\n        //create button for delete \r\n        buttonDelete(resultsDiv);\r\n        //create infobox\r\n        createInfoIcon();\r\n        //make the fetch \r\n        fetchBookDescription();\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n///change color write if it isn't empty \r\nfunction updateButtomColor(){\r\n    const author=authorInput.value.trim();\r\n    const title = titleInput.value.trim();\r\n    if (author !== \"\" || title !== \"\") {\r\n        searchButtonFilter.style.color = \"white\";\r\n    } else {\r\n        searchButtonFilter.style.color = \"grey\";\r\n    }\r\n}\r\n//recall function\r\nauthorInput.addEventListener(\"input\", updateButtomColor);\r\ntitleInput.addEventListener(\"input\", updateButtomColor);\r\n\r\n\r\n//if I click on search button\r\nsearchButton.addEventListener(\"click\", async () => {\r\n    const category = categoryInput.value.trim();\r\n    if (!category){\r\n        alert(\"Please enter a valid category.\");\r\n        return;                                     \r\n    };\r\n    const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +\"&limit=20\";\r\n    console.log(\"URL richiesta:\", url); \r\n    try {\r\n        const response = await fetch(url);\r\n        if (!response.ok){\r\n            throw new Error(\"Errore API \" + response.status);\r\n        }\r\n        const data = await response.json();\r\n        console.log(\"Risultati API:\", data.docs);\r\n        CreateDom(data)\r\n        \r\n    } catch (error) {\r\n        console.error(\"Error,fetch failed or not category found\", error);\r\n        alert(\"Error,fetch failed or not category found, try a different category\");\r\n    }\r\n});\r\n\r\n\r\n//if I click on more filters show menu filter\r\nbutton_filters.addEventListener(\"click\",()=>{\r\n    menu_filters.style.display=\"block\";\r\n})\r\n//add x to close menu filter (part in html)\r\ndelete_html_filter.addEventListener(\"click\",async()=>{\r\n    menu_filters.style.display=\"none\";\r\n});\r\n\r\n    \r\n/*first step get category and all the other choosen*/\r\n//const categoryInput = document.getElementById('category'); get value\r\nsearchButtonFilter.addEventListener(\"click\",async()=>{\r\n    const authorInput = document.getElementById(\"author\");\r\n    const titleInput = document.getElementById(\"title\");\r\n    //function to change color from grey to white to Search button in the filters\r\n    \r\n   //same \r\n    console.log(authorInput.value ? authorInput.value : \"author not selected\");\r\n    console.log(titleInput.value ? titleInput.value: \"title not selected\");\r\n    console.log (categoryInput.value ? categoryInput.value : \"category not selected\");\r\n    const baseUrl= `https://openlibrary.org/search.json`\r\n    //object for create dynamic url, amazing!\r\n    const params = new URLSearchParams();\r\n    //category\r\n    if (categoryInput.value) {\r\n    params.append(\"subject\", categoryInput.value);\r\n    }\r\n    //author\r\n    if(authorInput.value){\r\n        params.append(\"author_name\",authorInput.value);\r\n    }\r\n    //titleselectedLanguage\r\n    if(titleInput.value){\r\n        params.append(\"title\",titleInput.value);\r\n    }\r\n    //limit \r\n    params.append(\"limit\", \"20\");\r\n    const url = `${baseUrl}?${params.toString()}`;\r\n    console.log(url);\r\n    try{\r\n        const response = await fetch(url);\r\n        if(!response.ok) throw new Error(\"Error, filters fetch failed try differt search or review fetch\",error)\r\n            const data = await response.json();\r\n        console.log(data);\r\n        //call function\r\n        CreateDom(data)\r\n    }catch(error){\r\n        console.error(\"Error, creation filter Dom failed or insert\",error)\r\n        alert(\"Data entry error, please try again\")\r\n    }\r\n});\n\n//# sourceURL=webpack://owlyapplicationchiaragiada/./src/js/search.js?\n}");

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