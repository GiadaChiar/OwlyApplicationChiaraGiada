
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


//I want to check if textbox category isn't empty 
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

//generic function to targetElement to choose when you want it 
function buttonDelete(targetElement){
    //create button for delete 
    const deleteButton=document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn-close");
    deleteButton.setAttribute("aria-label", "Close");
    //to find where you want it
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
    const infoIcon = document.createElement('i');
    infoIcon.classList.add('bi','bi-info-circle-fill');
    infoIcon.id = "info_icon";
    resultsDiv.appendChild(infoIcon);
    let infobox = null;

//if I pass over the icon show alert with information
    infoIcon.addEventListener("mouseover", () => {
        if (infobox) return;
        infobox =document.createElement("div");
        infobox.id="info_box";
        infobox.textContent = "List of books with authors and titles based on the selected category.";
    resultsDiv.appendChild(infobox);
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

            // create description div when put my informations
            const divDescription = document.createElement("div");
            divDescription.classList.add("description-box");
            const titleDesc= document.createElement("h5")
            titleDesc.classList.add("desc_title")
            titleDesc.textContent=" Description:"

            const pDescription= document.createElement("p");
            pDescription.classList.add("desc_p");
            pDescription.textContent = descriptionText;
            
            divDescription.appendChild(titleDesc)
            divDescription.appendChild(pDescription);
            //insert under the title row
            row.after(divDescription);
            buttonDelete(divDescription);
        }catch(error){
            console.error("Error to create or insert text to description section",error)
        }
    
    });
}

//create dom is too much long I needed to create a function to help me to create objects 
function createElements(tag,className,idName,text,fatherName,attributes ={}){
    //create element 
    let constName = document.createElement(tag);
    if(className) {
        className.split(' ').forEach(cls => constName.classList.add(cls));
    }
    if(idName){
        constName.id = idName;
    }
    if(text){
        constName.textContent = text;
    }
    if (attributes && typeof attributes ==='object'){
        for (let key in attributes){
            constName.setAttribute(key,attributes[key])
        }
    }
    if(fatherName){
        fatherName.appendChild(constName)
    }
    return constName;

}





function CreateDom(data){
    cleanResults()
    if(data.numFound==0){
        cleanResults()
        alert("No books were found! Try a different search.")
    }else{
        data.docs.forEach(doc => {
            let rowDiv = createElements('div','book-row',doc.key,undefined,resultsDiv);
            let insideRowDiv =createElements('div','inner-row',undefined,undefined,rowDiv);
            let titleElement = createElements('a','book-title btn btn-primary',doc.key,doc.title ?? "Title not available",insideRowDiv,{
                'data-bs-toggle': 'collapse',
                'href': '#collapseExample',
                'role':'button',
                'aria-expanded': 'false',
                'aria-controls': 'collapseExample'
            });
            
            /*titleElement.setAttribute('data-bs-toggle', 'collapse');
            titleElement.setAttribute('href', '#collapseExample');
            titleElement.setAttribute('role', 'button');
            titleElement.setAttribute('aria-expanded', 'false');
            titleElement.setAttribute('aria-controls', 'collapseExample');*/
            let authorElement= createElements('h3','book-author',doc.key,doc.author_name ? doc.author_name.join(", ") : "Author unknown",insideRowDiv);
            //append all elements
            resultsDiv.style.display="block";
            /*insideRowDiv.appendChild(authorElement);
            insideRowDiv.appendChild(titleElement);
            rowDiv.appendChild(insideRowDiv);
            resultsDiv.appendChild(rowDiv);*/



        });
        //create button for delete 
        buttonDelete(resultsDiv);
        //create infobox
        createInfoIcon();
        //make the fetch 
        fetchBookDescription();
    }
}


















/*

function CreateDom(data){
    cleanResults()
    if(data.numFound==0){
        cleanResults()
        alert("No books were found! Try a different search.")
    }else{
        data.docs.forEach(doc => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('book-row');
            rowDiv.id = doc.key; 
            // it removes /works/ from key to have a valid ID
            const insideRowDiv = document.createElement('div');
            insideRowDiv.classList.add('inner-row');
            rowDiv.appendChild(insideRowDiv);

            const titleElement = document.createElement('a');
            titleElement.textContent = doc.title ?? "Title not available";
            titleElement.id = doc.key;
            titleElement.classList.add('book-title', 'btn', 'btn-primary');
            titleElement.setAttribute('data-bs-toggle', 'collapse');
            titleElement.setAttribute('href', '#collapseExample');
            titleElement.setAttribute('role', 'button');
            titleElement.setAttribute('aria-expanded', 'false');
            titleElement.setAttribute('aria-controls', 'collapseExample');

            const authorElement = document.createElement('h3');
            authorElement.textContent = doc.author_name ? doc.author_name.join(", ") : "Author unknown";
            authorElement.classList.add('book-author');
            authorElement.id = doc.key;
            
            resultsDiv.style.display="block";
            insideRowDiv.appendChild(authorElement);
            insideRowDiv.appendChild(titleElement);
            rowDiv.appendChild(insideRowDiv);
            resultsDiv.appendChild(rowDiv);
        });
        //create button for delete 
        buttonDelete(resultsDiv);
        //create infobox
        createInfoIcon();
        //make the fetch 
        fetchBookDescription();
    }
}
*/

///change color write if it isn't empty 
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


//if I click on search button
searchButton.addEventListener("click", async () => {
    const category = categoryInput.value.trim();
    if (!category){
        alert("Please enter a valid category.");
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
        console.error("Error,fetch failed or not category found", error);
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
    const baseUrl= `https://openlibrary.org/search.json`
    //object for create dynamic url, amazing!
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