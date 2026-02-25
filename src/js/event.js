

import { fetchBookData } from "./api.js";
import { createDomBookDescription } from "./dom.js";


//CLOSE BUTTON

function handleCloseButtonClick(event,resultsDiv,cleanResults){
    const button = event.target.closest(".btn-close");//near parent
    if (!button) return;//if you click on another element exit
    const targetElement = button.parentElement;
        if(targetElement === resultsDiv){
            resultsDiv.style.display="none";
            cleanResults(resultsDiv)
        }else{
            targetElement.remove();
        }
}

//listener CloseButton
//listener clean recall function
export function initCloseButtonListener(resultsDiv,cleanResults){
    resultsDiv.addEventListener("click", (event)=>{
        handleCloseButtonClick(event,resultsDiv,cleanResults);
    });
}



//BOOK TITLE
//async function handleBookClick
async function handleBookClick(event){
    const title = event.target.closest(".book-title");
        if(!title) return; //if I don't click in title exit
        const row = title.closest(".book-row") //if I click on title
        if(!row)return;
        let fulltitle =title.id;
        let titleId = fulltitle.replace("-title", "");
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


