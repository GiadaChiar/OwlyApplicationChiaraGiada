

//Events 

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


