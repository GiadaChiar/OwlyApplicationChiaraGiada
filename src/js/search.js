
import '../style/search.css';
import { setUpMenu } from './menu.js';


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


//I want to check if textbox category isn't empty and change color
categoryInput.addEventListener("input", () => {
    const category = categoryInput.value.trim();
    if (category !== "") {
        searchButton.style.color = "white";
    } else {
        searchButton.style.color = "grey";
    }
});


function cleanResults(){
    resultsDiv.innerHTML = ""; 
}


//create dom is too much long I needed to create a function to help me to create objects 
function createElements({tag,className,id,textContent,parentElement,attributes ={}}){
    //create element 
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


//generic function to targetElement to choose when you want it 
function createCloseButton(targetElement){
    let deleteButton = createElements({tag:'button',className:'btn-close',attributes:{
        "aria-label": "Close"
    }})
    //to find where you want it
    deleteButton.type = "button";
    targetElement.appendChild(deleteButton)//father=targetElement
    deleteButton.addEventListener("click",()=>{
        if(targetElement === resultsDiv){
            resultsDiv.style.display="none";
            cleanResults()
        }else{
            targetElement.remove();
        }
    })
}


function createInfoIcon(){
//create icone info to information about book
    const infoIcon  = createElements({tag:'i',className:'bi bi-info-circle-fill',id:'info_icon',parentElement:resultsDiv})
    let infobox = null;

//if I pass over the icon show alert with information
    infoIcon.addEventListener("mouseover", () => {
        if (infobox) return;
        /*infobox =document.createElement("div");
        infobox.id="info_box";
        infobox.textContent = "List of books with authors and titles based on the selected category.";
    resultsDiv.appendChild(infobox);*/
        let infobox = createElements({tag:"div",id:"info_box",textContent:"List of books with authors and titles based on the selected category.",parentElement:resultsDiv})

    });

    //if I exit from icon the infobox disappear
    infoIcon.addEventListener("mouseleave",()=>{
        if (infobox) {
            infobox.remove();
            infobox = null;
        }
    });
}


function fetchBookDescription(){
    resultsDiv.addEventListener("click", async(event)=>{
        const title = event.target.closest(".book-title");
        if(!title) return; //if I don't click in title exit
        const row = title.closest(".book-row") //if I click on title
        if(!row)return;
        //call another API 
        //don't usen encodeURIComponent bacause it trasform / in %
        const url =`https://openlibrary.org${title.id}.json`;
        console.log("Url richiesta desc:", url)
        console.log("stampo id:", title.id)
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Error, fetch failed or book's id not found")
            }
            const data = await response.json();
            console.log("Risultati descrizione API:", data.description);
                if (!row) 
                return;
            // see if already exist a description box
            if (row.nextElementSibling?.classList.contains("description-box")) {
                return;// not duplicate 
            }
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
            //append
            divDescription.appendChild(titleDescription)
            divDescription.appendChild(pDescription);
            //insert under the title row
            row.after(divDescription);
            createCloseButton(divDescription);
        }catch(error){
            console.error("Error to create or insert text to description section",error)
        }
    });
}



function CreateDom(data){
    cleanResults()
    if(data.numFound==0){
        cleanResults()
        alert("No books were found! Try a different search.")
    }else{
        data.docs.forEach(doc => {
            let rowDiv = createElements({tag:'div',className:'book-row',id:doc.key,parentElement:resultsDiv});
            let insideRowDiv =createElements({tag:'div',className:'inner-row',parentElement: rowDiv});
            let authorElement= createElements({tag:'h3',className:'book-author',id:doc.key,textContent:doc.author_name ? doc.author_name.join(", ") : "Author unknown",parentElement:insideRowDiv});
            let titleElement = createElements({tag:'a',className:'book-title btn btn-primary',id:doc.key,textContent:doc.title ?? "Title not available",parentElement:insideRowDiv,attributes:{
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
        //create infobox
        createInfoIcon();
        //make the fetch 
        fetchBookDescription();
    }
}


//change color write if it isn't empty 
function updateButtomColor(){
    const author=authorInput.value.trim();
    const title = titleInput.value.trim();
    if (author !== "" || title !== "") {
        searchButtonFilter.style.color = "white";
    } else {
        searchButtonFilter.style.color = "grey";
    }
}
//recall function
authorInput.addEventListener("input", updateButtomColor);
titleInput.addEventListener("input", updateButtomColor);

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
    console.log("URL richiesta:", url); 
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error("Errore API " + response.status);
        }
        const data = await response.json();
        console.log("Risultati API:", data.docs);
        CreateDom(data)
        
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


function CreateFilterFetch(categoryInput,authorInput,titleInput){
    const baseUrl= `https://openlibrary.org/search.json`
    const params = new URLSearchParams();
    //category
    if (categoryInput.value) {
    params.append("subject", categoryInput.value);
    }
    //author
    if(authorInput.value){
        params.append("author_name",authorInput.value);
    }
    //titleselectedLanguage
    if(titleInput.value){
        params.append("title",titleInput.value);
    }
    //limit 
    params.append("limit", "20");
    const url = `${baseUrl}?${params.toString()}`;
    console.log(url);
    return url;
}

    
/*first step get category and all the other choosen*/
//const categoryInput = document.getElementById('category'); get value
searchButtonFilter.addEventListener("click",async()=>{
    const authorInput = document.getElementById("author");
    const titleInput = document.getElementById("title");
    //function to change color from grey to white to Search button in the filters
   //same 
    console.log(authorInput.value ? authorInput.value : "author not selected");
    console.log(titleInput.value ? titleInput.value: "title not selected");
    console.log (categoryInput.value ? categoryInput.value : "category not selected");
    //if you are not a new insert 
    if(authorInput.value ==="" && titleInput.value ===""){
        validateSearchInputs();
        return;
    }
    const url = CreateFilterFetch(categoryInput,authorInput,titleInput);
    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error("Error, filters fetch failed try differt search or review fetch",error)
            const data = await response.json();
        console.log(data);
        //call function
        CreateDom(data)
    }catch(error){
        console.error("Error, creation filter Dom failed or insert",error)
        alert("Data entry error, please try again")
    }
});
