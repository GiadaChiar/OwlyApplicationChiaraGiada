//Events 
authorInput.addEventListener("input", updateButtonColor);
titleInput.addEventListener("input", updateButtonColor);
categoryInput.addEventListener("input", updateButtonColor);


//listener CloseButton
//listener clean recall function
function initCloseButtonListener(){
    resultsDiv.addEventListener("click",handleCloseButtonClick);
}

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


//listener clean recall function
function initBookDescriptionListener(){
    resultsDiv.addEventListener("click",handleBookClick);
}

//async function handleBookClick
async function handleBookClick(event){
    const title = event.target.closest(".book-title");
        if(!title) return; //if I don't click in title exit
        const row = title.closest(".book-row") //if I click on title
        if(!row)return;
        let fulltitle =title.id;
        let titleId = fulltitle.replace("-title", "");
        console.log(title);
        await fetchBookData(titleId,row);
}