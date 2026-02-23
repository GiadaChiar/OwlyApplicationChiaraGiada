
import '../style/search.css';
import { setUpMenu } from './menu.js';
import { updateButtonColor, cleanResults, createElements, createCloseButton, createInfoIcon, createDom,createDomBookDescription} from "./dom.js";
import { fetchJson,fetchBookData } from "./api.js";
import { initCloseButtonListener,initBookDescriptionListener } from "./event_old.js";
/*import { fetchJson, fetchBookData, createFilterFetch } from "./api.js";
import { createElements,createCloseButton,createInfoIcon,cleanResults,updateButtonColor,createDomBookDescription} from "./dom.js";
import { initBookDescriptionListener,initCloseButtonListener} from "./event.js";*/


document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.dataset.currentPage;
    setUpMenu(currentPage);

    const menu_filters = document.getElementById("more-filters");
    const button_filters = document.getElementById("filters");
    //if I click I pass hover mouse  get other informations info
    //default hide menu filters
    menu_filters.style.display = "none";
    //take input category value 
    const searchButton = document.getElementById('search');
    const categoryInput = document.getElementById('category');
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "none";
    const searchButtonFilter = document.getElementById("search_filter");
    const authorInput = document.getElementById("author");
    const titleInput = document.getElementById("title");
    const delete_html_filter = document.getElementById("delete_html_filter");

    updateButtonColor(categoryInput, authorInput, titleInput, searchButton, searchButtonFilter);//first state
    [categoryInput, authorInput, titleInput].forEach(input => {
        input.addEventListener('input', () => {
            updateButtonColor(categoryInput, authorInput, titleInput, searchButton, searchButtonFilter);
        });
    });
    

    //CHANGE UNE POINT--------------------------------------------------------------------
     //function to validate input 
    function validateSearchInputs(){
        alert("Please enter a valid category.");
            return;  
    }

    // X buttons 
    initCloseButtonListener(resultsDiv,cleanResults);

    //if I click on search button
    searchButton.addEventListener("click", async () => {
        const category = categoryInput.value.trim();
        if (!category){
            validateSearchInputs();  
            return;                                   
        };
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=20";
        console.log("URL request:", url); 
        try{
            const data = await fetchJson(url);
            console.log("request API:", data.docs);
            createDom(data,resultsDiv);
        } catch (error) {
            console.error("Error,fetch failed or not category found");
            alert("Error,fetch failed or not category found, try a different category");
        }
    });
    
})

//call fiunction if I click on title
initBookDescriptionListener(resultsDiv, fetchBookData);


    /*
    //recall function
    initCloseButtonListener();
    
    
    
    function createDom(data){
        cleanResults(resultsDiv)
        if(data.numFound==0){
            cleanResults(resultsDiv)
            alert("No books were found! Try a different search.")
        }else{
            data.docs.forEach(doc => {
                let rowDiv = createElements({tag:'div',className:'book-row',id:doc.key,parentElement:resultsDiv});
                let insideRowDiv =createElements({tag:'div',className:'inner-row',parentElement: rowDiv});
                let authorElement= createElements({tag:'h3',className:'book-author',id:doc.key + "-author",textContent:doc.author_name ? doc.author_name.join(", ") : "Author unknown",parentElement:insideRowDiv});
                let titleElement = createElements({tag:'a',className:'book-title btn btn-primary',id:doc.key + "-title",textContent:doc.title ?? "Title not available",parentElement:insideRowDiv,attributes:{
                    'data-bs-toggle': 'collapse',
                    'href': '#collapseExample',
                    'role':'button',
                    'aria-expanded': 'false',
                    'aria-controls': 'collapseExample'
                }});
                resultsDiv.style.display="block";
            });
            //create button for delete 
            createCloseButton(resultsDiv);
            //create infobox if isn't
            if (!document.getElementById("info_icon")) {
            createInfoIcon(resultsDiv);
            }
        }
    }
    
    
    //function to validate input 
    function validateSearchInputs(){
        alert("Please enter a valid category.");
            return;  
    }
    
    
    //if I click on search button
    searchButton.addEventListener("click", async () => {
        const category = categoryInput.value.trim();
        if (!category){
            validateSearchInputs();  
            return;                                   
        };
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=20";
        console.log("URL request:", url); 
        try{
            const data = await fetchJson(url);
            console.log("request API:", data.docs);
            createDom(data);
        } catch (error) {
            console.error("Error,fetch failed or not category found");
            alert("Error,fetch failed or not category found, try a different category");
        }
    });
    
    
    //if I click on more filters show menu filter
    button_filters.addEventListener("click",()=>{
        menu_filters.style.display="block";
    })
    //add x to close menu filter (part in html)
    delete_html_filter.addEventListener("click",async()=>{
        menu_filters.style.display="none";
    });
    
        
    //first step get category and all the other choosen
    //const categoryInput = document.getElementById('category'); get value
    searchButtonFilter.addEventListener("click",async()=>{
        //if you are not a new insert 
        if(authorInput.value ==="" && titleInput.value ===""){
            validateSearchInputs();
            return;
        }
        const url = createFilterFetch (categoryInput,authorInput,titleInput);
        try{
            const data = await fetchJson(url); 
            console.log(data);
            //call function
            createDom(data);
        }catch(error){
            console.error("Error, creation filter Dom failed or insert",error)
            alert("Data entry error, please try again")
        }
    });
    
    
    
    //call function with listener about title
    initBookDescriptionListener();
*/
    /*
    import { fetchJson, fetchBookData, createFilterFetch } from "./api.js";
    import { createElements,createCloseButton,createInfoIcon,cleanResults,updateButtonColor,createDomBookDescription} from "./dom.js";
    import { initBookDescriptionListener,initCloseButtonListener} from "./event.js";
    
    const currentPage = document.body.dataset.currentPage;
    setUpMenu(currentPage);
    const menu_filters = document.getElementById("more-filters");
    const button_filters = document.getElementById("filters");
    //if I click I pass hover mouse  get other informations info
    //default hide menu filters
    menu_filters.style.display ="none";
    //take input category value 
    const searchButton = document.getElementById('search');
    const categoryInput = document.getElementById('category');
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "none";
    const searchButtonFilter = document.getElementById("search_filter");
    const authorInput = document.getElementById("author");
    const titleInput = document.getElementById("title");
    const delete_html_filter= document.getElementById("delete_html_filter");
    
    
    updateButtonColor(categoryInput,authorInput,titleInput,searchButton,searchButtonFilter);//first state
    
    
    //recall function
    initCloseButtonListener();
    
    
    
    function createDom(data){
        cleanResults(resultsDiv)
        if(data.numFound==0){
            cleanResults(resultsDiv)
            alert("No books were found! Try a different search.")
        }else{
            data.docs.forEach(doc => {
                let rowDiv = createElements({tag:'div',className:'book-row',id:doc.key,parentElement:resultsDiv});
                let insideRowDiv =createElements({tag:'div',className:'inner-row',parentElement: rowDiv});
                let authorElement= createElements({tag:'h3',className:'book-author',id:doc.key + "-author",textContent:doc.author_name ? doc.author_name.join(", ") : "Author unknown",parentElement:insideRowDiv});
                let titleElement = createElements({tag:'a',className:'book-title btn btn-primary',id:doc.key + "-title",textContent:doc.title ?? "Title not available",parentElement:insideRowDiv,attributes:{
                    'data-bs-toggle': 'collapse',
                    'href': '#collapseExample',
                    'role':'button',
                    'aria-expanded': 'false',
                    'aria-controls': 'collapseExample'
                }});
                resultsDiv.style.display="block";
            });
            //create button for delete 
            createCloseButton(resultsDiv);
            //create infobox if isn't
            if (!document.getElementById("info_icon")) {
            createInfoIcon(resultsDiv);
            }
        }
    }
    
    
    //function to validate input 
    function validateSearchInputs(){
        alert("Please enter a valid category.");
            return;  
    }
    
    
    //if I click on search button
    searchButton.addEventListener("click", async () => {
        const category = categoryInput.value.trim();
        if (!category){
            validateSearchInputs();  
            return;                                   
        };
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=20";
        console.log("URL request:", url); 
        try{
            const data = await fetchJson(url);
            console.log("request API:", data.docs);
            createDom(data);
        } catch (error) {
            console.error("Error,fetch failed or not category found");
            alert("Error,fetch failed or not category found, try a different category");
        }
    });
    
    
    //if I click on more filters show menu filter
    button_filters.addEventListener("click",()=>{
        menu_filters.style.display="block";
    })
    //add x to close menu filter (part in html)
    delete_html_filter.addEventListener("click",async()=>{
        menu_filters.style.display="none";
    });
    
        
    //first step get category and all the other choosen
    //const categoryInput = document.getElementById('category'); get value
    searchButtonFilter.addEventListener("click",async()=>{
        //if you are not a new insert 
        if(authorInput.value ==="" && titleInput.value ===""){
            validateSearchInputs();
            return;
        }
        const url = createFilterFetch (categoryInput,authorInput,titleInput);
        try{
            const data = await fetchJson(url); 
            console.log(data);
            //call function
            createDom(data);
        }catch(error){
            console.error("Error, creation filter Dom failed or insert",error)
            alert("Data entry error, please try again")
        }
    });
    
    
    
    //call function with listener about title
    initBookDescriptionListener();
    
    
    */
