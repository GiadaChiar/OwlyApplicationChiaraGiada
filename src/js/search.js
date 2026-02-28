
import '../style/search.scss';
import '../style/menu.scss';
import { setUpMenu } from './menu.js';
import { updateButtonColor, cleanResults,createDom,createPopUp} from "./dom.js";
import { fetchJson,createFilterFetch } from "./api.js";
import { initCloseButtonListener,initBookDescriptionListener } from "./event.js";

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split("/").pop();
    setUpMenu(currentPage);

    // DOM elements
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

    menu_filters.style.display = "none";

    buttonFilter.addEventListener("click",()=>{
        menu_filters.style.display="block";
    })
    deleteButtonFilter.addEventListener("click",async()=>{
        menu_filters.style.display="none";
    });
    // Update button colors based on input
    updateButtonColor(categoryInput, authorInput, titleInput, searchButton, searchButtonFilter);//first state
    [categoryInput, authorInput, titleInput].forEach(input => {
        input.addEventListener('input', () => {
            updateButtonColor(categoryInput, authorInput, titleInput, searchButton, searchButtonFilter);
        });
    });
    
    // Validate search inputs
    function validateSearchInputs(category, author, title){
        if (!category && !author && !title) {
        createPopUp({
            title: "No Results!",
            message: "Please enter at least one search field."
        });
        return false;
    }
    return true;
    }


    // Initialize X button and book description listeners
    initCloseButtonListener(resultsDiv, cleanResults);
    initBookDescriptionListener(resultsDiv);

    // Search by category only
    searchButton.addEventListener("click", async () => {
        const category = categoryInput.value.trim();
        if (!validateSearchInputs(category, "", "")) return;
            createPopUp({
            title: "Loading ...",
            message: "Please wait the results.",
            id:"loading-popup"
        });
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=20";
        console.log("URL request:", url); 
        try{
            const data = await fetchJson(url);
            const popupToRemove = document.getElementById("loading-popup");
            if (popupToRemove) popupToRemove.remove();
            createDom(data, resultsDiv);
        } catch (error) {
            console.error("Error,fetch failed or not category found");
            createPopUp({
            title: "No category found!",
            message: "fetch failed or not category found, try a different category"
            });
        }
    });


    // Search by category, author, and title
    searchButtonFilter.addEventListener("click",async()=>{
        if (!validateSearchInputs(
            categoryInput.value.trim(),
            authorInput.value.trim(),
            titleInput.value.trim()
        )) return;
        createPopUp({
            title: "Loading ...",
            message: "Please wait the results.",
            id:"loading-popup"
        });

        const url = createFilterFetch(categoryInput,authorInput,titleInput);
        try{
            const data = await fetchJson(url); 
            //remuve pop-up
            const popupToRemove = document.getElementById("loading-popup");
            if (popupToRemove) popupToRemove.remove();
            createDom(data, resultsDiv);
        }catch(error){
            createPopUp({
            title: "Error!",
            message: "Data entry error, please try again"
            });
        }
    });
})

