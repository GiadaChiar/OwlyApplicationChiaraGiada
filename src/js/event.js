

//Events 
/*authorInput.addEventListener("input", updateButtonColor);
titleInput.addEventListener("input", updateButtonColor);
categoryInput.addEventListener("input", updateButtonColor);
*/



/*
function handleCloseButtonClick(event){
    const button = event.target.closest(".btn-close");//near parent
    if (!button) return;//if you click on another element exit
    const targetElement = button.parentElement;
        if(targetElement === resultsDiv){
            resultsDiv.style.display="none";
            cleanResults()
        }else{
            targetElement.remove();
        }
}
*/

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
/*export function initCloseButtonListener(){
    resultsDiv.addEventListener("click",handleCloseButtonClick);
}*/
/*
//listener CloseButton
//listener clean recall function
export function initCloseButtonListener(resultsDiv,cleanResults){
    resultsDiv.addEventListener("click", (event)=>{
        handleCloseButtonClick(event,resultsDiv,cleanResults);
    });
}


*/



/*

//async function handleBookClick
async function handleBookClick(event,fetchBookData){
    const title = event.target.closest(".book-title");
        if(!title) return; //if I don't click in title exit
        const row = title.closest(".book-row") //if I click on title
        if(!row)return;
        let fulltitle =title.id;
        let titleId = fulltitle.replace("-title", "");
        console.log(title);
        await fetchBookData(titleId,row);
}

//listener clean recall function
export function initBookDescriptionListener(resultsDiv,fetchBookData){
    resultsDiv.addEventListener("click",(event)=>{
        handleBookClick(event,fetchBookData);
    });
}
    */