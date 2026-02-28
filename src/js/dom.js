//Create Dom and elements
// Change button color depending on input values
export function updateButtonColor(categoryInput,authorInput,titleInput,searchButton,searchButtonFilter){
    const author=authorInput.value.trim();
    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    if (author !== "" || title !== "") {
        searchButtonFilter.style.color = "white";
    }else {
        searchButtonFilter.style.color = "grey";
    }
    if(category !== ""){
        searchButton.style.color = "white";
    }
    else {
        searchButton.style.color = "grey";
    }
}


// Clear the results container
export function cleanResults(resultsDiv){
    resultsDiv.innerHTML = ""; 
}


// Helper to create a DOM element
export function createElements({tag,className,id,textContent,parentElement,attributes ={}}){
    let element= document.createElement(tag);
    if(className) {
        className.split(' ').forEach(cls => element.classList.add(cls));
    }
    if(id){
        element.id = id;
    }
    if(textContent){
        element.textContent = textContent;
    }
    if (attributes && typeof attributes ==='object'){
        for (let key in attributes){
            element.setAttribute(key,attributes[key])
        }
    }
    if(parentElement){
        parentElement.appendChild(element)
    }
    return element;
}


// Add a close button to a target element
export function createCloseButton(targetElement){
    let deleteButton = createElements({tag:'button',className:'btn-close',parentElement:targetElement,attributes:{
        "aria-label": "Close"
    }})
    //to find where you want it
    deleteButton.type = "button";
}


// Add an info icon with hover description
export function createInfoIcon(resultsDiv){
    const infoIcon  = createElements({tag:'i',className:'bi bi-info-circle-fill',id:'info_icon',parentElement:resultsDiv})
    let infobox = null;
//if I pass over the icon show alert with information
    infoIcon.addEventListener("mouseover", () => {
        if (infobox) return;
        infobox = createElements({tag:"div",id:"info_box",textContent: "List of books with authors and titles based on the selected category.",parentElement: resultsDiv});
    });
    //if I exit from icon the infobox disappear
    infoIcon.addEventListener("mouseleave",()=>{
        if (infobox) {
            infobox.remove();
            infobox = null;
        }
    });
}


// Create the book list in the DOM
export function createDom(data,resultsDiv){
    cleanResults(resultsDiv)
    if(data.numFound==0){
        createPopUp({
            title: "No books were found!",
            message: "Try a different search."
        });
        return;
    }else{
        data.docs.forEach(doc => {
            let rowDiv = createElements({tag:'div',className:'book-row',parentElement:resultsDiv, attributes:{'data-work-id': doc.key}});
            let insideRowDiv =createElements({tag:'div',className:'inner-row',parentElement: rowDiv});
            let authorElement= createElements({tag:'h3',className:'book-author',textContent:doc.author_name ? doc.author_name.join(", ") : "Author unknown",parentElement:insideRowDiv,attributes:{'data-work-id': doc.key}});
            let titleElement = createElements({tag:'a',className:'book-title btn btn-primary',textContent:doc.title ?? "Title not available",parentElement:insideRowDiv,attributes:{
                'data-work-id': doc.key, 
                'data-bs-toggle': 'collapse',
                'href': '#collapseExample',
                'role':'button',
                'aria-expanded': 'false',
                'aria-controls': 'collapseExample'
            }});
        });
        
        resultsDiv.style.display="block";
        //create button for delete 
        createCloseButton(resultsDiv);
        //create infobox if isn't
        if (!document.getElementById("info_icon")) {
        createInfoIcon(resultsDiv);
        }
    }
}


// Create the book description section under a row
export function createDomBookDescription(data,row){
    if (row.nextElementSibling?.classList.contains("description-box")) return;// not duplicate 
    let descriptionText = "Description not available";
            if (data.description) {
                //get text if it is a string or an object because we have differents types
                let rawText = (typeof data.description === "string") ? data.description : (typeof data.description === "object" && data.description.value) 
                ? data.description.value : "Description not available";
                descriptionText = rawText
            }
            const divDescription = createElements({tag:'div',className:'description-box'})
            const titleDescription = createElements({tag:'h5',className:'desc_title',textContent:' Description:'})
            const pDescription = createElements({tag:'p',className:'desc_p',textContent: descriptionText})
            divDescription.appendChild(titleDescription)
            divDescription.appendChild(pDescription);
            row.after(divDescription);
            createCloseButton(divDescription);
}


// Create a popup with title and message
export function createPopUp({ title = "Alert", message = "", id = "custom-popup" }) {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const overlay = createElements({tag: "div",id: id,className: "popup-overlay",parentElement: document.body});
    const popupBox = createElements({tag: "div",className: "popup-box",parentElement: overlay,attributes: { "role": "alert" }});
    createElements({ tag: "h4", textContent: title, parentElement: popupBox });
    createElements({ tag: "p", textContent: message, parentElement: popupBox });
    createCloseButton(popupBox);
    const closeBtn = popupBox.querySelector(".btn-close");
    closeBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
    return overlay;
}