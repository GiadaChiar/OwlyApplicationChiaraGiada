
import '../style/search.scss';
import '../style/menu.scss';
import { setUpMenu } from './menu.js';
import { updateButtonColor, cleanResults, createElements, createCloseButton, createInfoIcon, createDom,createDomBookDescription} from "./dom.js";
import { fetchJson,fetchBookData,createFilterFetch } from "./api.js";
import { initCloseButtonListener,initBookDescriptionListener } from "./event.js";


document.addEventListener('DOMContentLoaded', () => {
    //const currentPage = document.header.dataset.currentPage;
    const currentPage = window.location.pathname.split("/").pop();
    setUpMenu(currentPage);

    //take input category value
    const menu_filters = document.getElementById("more-filters")
    const searchButton = document.getElementById('search');
    const categoryInput = document.getElementById('category');
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "none";
    const searchButtonFilter = document.getElementById("search_filter");
    const authorInput = document.getElementById("author");
    const titleInput = document.getElementById("title");
    const deleteButtonFilter = document.getElementById("delete_html_filter");
    const buttonFilter = document.getElementById("filters");

    //if I click I pass hover mouse  get other informations info
    //default hide menu filters
    menu_filters.style.display = "none";

    buttonFilter.addEventListener("click",()=>{
        menu_filters.style.display="block";
    })
    //add x to close menu filter (part in html)
    deleteButtonFilter.addEventListener("click",async()=>{
        menu_filters.style.display="none";
    });
    
    updateButtonColor(categoryInput, authorInput, titleInput, searchButton, searchButtonFilter);//first state
    [categoryInput, authorInput, titleInput].forEach(input => {
        input.addEventListener('input', () => {
            updateButtonColor(categoryInput, authorInput, titleInput, searchButton, searchButtonFilter);
        });
    });
    

    //CHANGE UNE POINT--------------------------------------------------------------------
     //function to validate input 
    /*function validateSearchInputs(){
        alert("Please enter a valid category.");
            return;  
    }*/
    function validateSearchInputs(category, author, title){
    if (!category && !author && !title) {
        alert("Please enter at least one search field.");
        return false;
    }
    return true;
}

    // X buttons 
    initCloseButtonListener(resultsDiv, cleanResults);
    
     //call fiunction if I click on title
    initBookDescriptionListener(resultsDiv, fetchBookData);

    //if I click on search button only category
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


    //if I click on Search but for title and author 
    searchButtonFilter.addEventListener("click",async()=>{
        //if you are not a new insert 
        if(authorInput.value ==="" && titleInput.value ===""){
            validateSearchInputs();
            return;
        }
        const url = createFilterFetch(categoryInput,authorInput,titleInput);
        try{
            const data = await fetchJson(url); 
            console.log(data);
            //call function
            createDom(data,resultsDiv);
        }catch(error){
            console.error("Error, creation filter Dom failed or insert",error)
            alert("Data entry error, please try again")
        }
    });
})

