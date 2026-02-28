

import { fetchBookData } from "./api.js";
import { createDomBookDescription } from "./dom.js";


//Close button functionality
function handleCloseButtonClick(event,resultsDiv,cleanResults){
    const button = event.target.closest(".btn-close");//Find the closest .btn-close element from the clicked target
    if (!button) return;// Exit if the clicked element is not a close button
    const targetElement = button.parentElement;
        if(targetElement === resultsDiv){ 
            resultsDiv.style.display="none";
            cleanResults(resultsDiv)
        }else{
            targetElement.remove();
        }
}

//Initialize close button listener
export function initCloseButtonListener(resultsDiv,cleanResults){
    resultsDiv.addEventListener("click", (event)=>{
        handleCloseButtonClick(event,resultsDiv,cleanResults);
    });
}



//BOOK TITLE
//Handle click on book titles and fetch book data
async function handleBookClick(event){
    const title = event.target.closest(".book-title");
        if(!title) return; //Exit if the clicked element is not a book title
        const row = title.closest(".book-row") 
        if(!row)return;// Exit if the book title is not inside a book row
        let titleId = title.dataset.workId
        if (!titleId) return;// Get book key from data attribute, exit if missing
        try {
        const data = await fetchBookData(titleId);
        createDomBookDescription(data, row);
    } catch (error) {
        console.error("Error fetching book description", error);
    }
}

//listener clean recall function
export function initBookDescriptionListener(resultsDiv){
    resultsDiv.addEventListener("click",handleBookClick);
    
}


