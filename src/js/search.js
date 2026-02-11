

import '../style/search.css';

import { setUpMenu } from './menu.js';

const currentPage = document.body.dataset.currentPage;

setUpMenu(currentPage);

const menu_filters = document.getElementById("more-filters");
//const delete_html_filter= document.getElementById("delete_html_filter");
const button_filters = document.getElementById("filters");
//if I click I pass hover mouse  get other informations info
let selectedLanguage ="en";
//default hide menu filters
menu_filters.style.display ="none";
//take input category value 
const searchButton = document.getElementById('cerca');
const categoryInput = document.getElementById('category');
const risultatiDiv = document.getElementById('risultati');
risultatiDiv.style.display = "none";

/////////////////////////////////////////////----------------------------------------------------quui ---------------------------//
//I whant to check if textbox category isn't empty 
categoryInput.addEventListener("input", () => {
    const category = categoryInput.value.trim();
    if (category !== "") {
        searchButton.style.color = "white";
    } else {
        searchButton.style.color = "grey";
}
});
//////////////////////////////////////////////////aggiungi search -------------------------///////////////////////////////////////////




//DEVO CAMBIARE LA FUNZIONE//


function cleanResults(){
    risultatiDiv.innerHTML = ""; 
}


function buttonDelete(){
//create button for delete 
    const deleteBt=document.createElement("button");
        deleteBt.id = "delete_bt";
        deleteBt.type = "button";
        deleteBt.classList.add("btn-close");
        deleteBt.setAttribute("aria-label", "Close");
        risultatiDiv.appendChild(deleteBt);

    deleteBt.addEventListener("click",()=>{
        risultatiDiv.style.display="none";
        //risultatiDiv.innerHTML = "";
        cleanResults()
    })
}


function createInfoIcon(){
//create icone info to information about book
    const infoIcon = document.createElement('i');
    infoIcon.classList.add('bi', 'bi-info-circle-fill');
    infoIcon.id = "info_icon";
    risultatiDiv.appendChild(infoIcon);
    let infobox = null;

//if I pass over the icon show alert with information
    infoIcon.addEventListener("mouseover", () => {
        if (infobox) return;
        infobox =document.createElement("div");
        infobox.id="info_box";
        infobox.textContent = "List of books with authors and titles based on the selected category.";
    risultatiDiv.appendChild(infobox);
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
    //if I click I pass hover mouse  get other informations info
    const bookTitles = document.querySelectorAll(".book-title");
    //when Iclick on titles description
    bookTitles.forEach(title => {
    title.addEventListener("click", async() => {
        
        const row = title.closest(".book-row");
        //call another API 
        //donm't usen encodeURIComponent bacause it trasform / in %
        const url =`https://openlibrary.org${title.id}.json`;
        console.log("Url richiesta desc:", url)
        console.log("stampo id:", title.id)
        try{
            const response = await fetch(url);
            if(!response.ok) 
                throw new Error("Error loading description")
                const data = await response.json();
                console.log("Risultati descrizione API:",data.description)
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
                // traslate language is it isn't in english
                if (selectedLanguage !== "en") {
                    descriptionText = await translateText(rawText, selectedLanguage);
                    console.log("Descrizione tradotta:", descriptionText);
                } else {
                    descriptionText = rawText;
                }
            }
            // create description div when put my informations
            const divPlace = document.createElement("div");
            divPlace.classList.add("description-box");
            const titleDesc= document.createElement("h5")
            titleDesc.classList.add("desc_title")
            titleDesc.textContent=" Description:"

            const pDesc= document.createElement("p");
            pDesc.classList.add("desc_p");
            pDesc.textContent = descriptionText;
            
            divPlace.appendChild(titleDesc)
            divPlace.appendChild(pDesc);
            //insert under the title row
            row.after(divPlace);

            //create button for delete 
            const deleteBt=document.createElement("button");
            deleteBt.id = "delete_bt-des";
            deleteBt.type = "button";
            deleteBt.classList.add("btn-close");
            deleteBt.setAttribute("aria-label", "Close");
            divPlace.appendChild(deleteBt);

            deleteBt.addEventListener("click",()=>{
                divPlace.remove();
                //deleteBt.remove();
            })
    
        }catch(error){
            console.error("Error dowloand description",error)
        }
        });
    });
}


function CreateDom(data){
    cleanResults()
    //risultatiDiv.innerHTML = ""; // pulisce risultati precedenti
    if(data.numFound==0){
        cleanResults()
        //risultatiDiv.innerHTML = ""; // pulisce risultati precedenti
        alert("No books were found! Try a different search.")
    }else{
        data.docs.forEach(doc => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('book-row');
            rowDiv.id = doc.key; 
            // remuve /works/ from key to have a valid ID
            const inerrRowDiv = document.createElement('div');
            inerrRowDiv.classList.add('inner-row');
            rowDiv.appendChild(inerrRowDiv);

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
            authorElement.textContent = doc.author_name ? doc.author_name.join(", ") : "Autore sconosciuto";
            authorElement.classList.add('book-author');
            authorElement.id = doc.key;
            
            risultatiDiv.style.display="block";
            inerrRowDiv.appendChild(authorElement);
            inerrRowDiv.appendChild(titleElement);
            rowDiv.appendChild(inerrRowDiv);
            risultatiDiv.appendChild(rowDiv);

        });
        //create button for delete 
        buttonDelete();
        //create infobox
        createInfoIcon();
        //make the fetch 
        fetchBookDescription();
    }
}



/*


//function to create a section with div and description-----------------------------------------------------------------------------------
function ViewSearch(data){

    risultatiDiv.innerHTML = ""; // pulisce risultati precedenti
    if(data.numFound==0){
        risultatiDiv.innerHTML = ""; // pulisce risultati precedenti
        alert("No books were found! Try a different search.")
    }else{
        data.docs.forEach(doc => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('book-row');
            rowDiv.id = doc.key; 
            // rimuove /works/ dal key per avere un ID valido

            const inerrRowDiv = document.createElement('div');
            inerrRowDiv.classList.add('inner-row');
            rowDiv.appendChild(inerrRowDiv);

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
            authorElement.textContent = doc.author_name ? doc.author_name.join(", ") : "Autore sconosciuto";
            authorElement.classList.add('book-author');
            authorElement.id = doc.key;
            

            risultatiDiv.style.display="block";
            inerrRowDiv.appendChild(authorElement);
            inerrRowDiv.appendChild(titleElement);
            rowDiv.appendChild(inerrRowDiv);

            risultatiDiv.appendChild(rowDiv);

        });
        //create button for delete 
            const deleteBt=document.createElement("button");
                deleteBt.id = "delete_bt";
                deleteBt.type = "button";
                deleteBt.classList.add("btn-close");
                deleteBt.setAttribute("aria-label", "Close");
                risultatiDiv.appendChild(deleteBt);

            deleteBt.addEventListener("click",()=>{
                risultatiDiv.style.display="none";
                risultatiDiv.innerHTML = "";
            })

        //create icone info to information about book
            const infoIcon = document.createElement('i');
            infoIcon.classList.add('bi', 'bi-info-circle-fill');
            infoIcon.id = "info_icon";
            risultatiDiv.appendChild(infoIcon);

            let infobox = null;

        //if I pass over the icon show alert with information
            infoIcon.addEventListener("mouseover", () => {
                if (infobox) return;
                infobox =document.createElement("div");
                infobox.id="info_box";
                infobox.textContent = "List of books with authors and titles based on the selected category.";
            risultatiDiv.appendChild(infobox);
            });

            //if I exit from icon the infobox disappear
            infoIcon.addEventListener("mouseleave",()=>{
                if (infobox) {
                    infobox.remove();
                    infobox = null;
                }
                
            });

            //if I click I pass hover mouse  get other informations info
            const bookTitles = document.querySelectorAll(".book-title")
    

        bookTitles.forEach(title => {
        title.addEventListener("click", async() => {
            
            const row = title.closest(".book-row");
            //call another API 
            //donm't usen encodeURIComponent bacause it trasform / in %
            const url =`https://openlibrary.org${title.id}.json`;
            console.log("Url richiesta desc:", url)
            console.log("stampo id:", title.id)



        try{
            const response = await fetch(url);
            if(!response.ok) throw new Error("Error loading description")
            const data = await response.json();
            console.log("Risultati descrizione API:",data.description)



            if (!row) return;

            // controlla se c'è già una descrizione sotto questa riga
            if (row.nextElementSibling?.classList.contains("description-box")) {
                return; // evita duplicati
            }

            let descriptionText = "Description not available";

        if (data.description) {
            // ottieni il testo reale, sia che sia stringa o oggetto
            let rawText = (typeof data.description === "string") 
                ? data.description 
                : (typeof data.description === "object" && data.description.value) 
                    ? data.description.value 
                    : "Description not available";

            // traduci solo se lingua diversa da inglese
            if (selectedLanguage !== "en") {
                descriptionText = await translateText(rawText, selectedLanguage);
                console.log("Descrizione tradotta:", descriptionText);
            } else {
                descriptionText = rawText;
            }

        }



            // crea il div descrizione
            const divPlace = document.createElement("div");
            divPlace.classList.add("description-box");
            const titleDesc= document.createElement("h5")
            titleDesc.classList.add("desc_title")
            titleDesc.textContent=" Description:"

            const pDesc= document.createElement("p");
            pDesc.classList.add("desc_p");
            pDesc.textContent = descriptionText;
            
            divPlace.appendChild(titleDesc)
            divPlace.appendChild(pDesc);
            
            // inserisce subito sotto la riga del libro
            row.after(divPlace);

             //create button for delete 
            const deleteBt=document.createElement("button");
                deleteBt.id = "delete_bt-des";
                deleteBt.type = "button";
                deleteBt.classList.add("btn-close");
                deleteBt.setAttribute("aria-label", "Close");
                divPlace.appendChild(deleteBt);

            deleteBt.addEventListener("click",()=>{
                
                divPlace.remove();
                deleteBt.remove();
            })
        

        }catch(error){
            console.error("Errore caricamento descrizione",error)
        }
        
            
        });
    });


}}

*/

//--------------------end function-----------------------------------------------------


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
        if (!response.ok) throw new Error("Errore API " + response.status);

        const data = await response.json();
        console.log("Risultati API:", data.docs); // <-- QUI

        if(selectedLanguage==="en"){
            console.log("selectedLanguage:",selectedLanguage)

            //ViewSearch(data);
            CreateDom(data)
        }
        else{
            console.log("lingua selezionata differente")
        }
        
        
            
    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }


});


const delete_html_filter= document.getElementById("delete_html_filter");

//if I click on more filters show menu filter
button_filters.addEventListener("click",()=>{
    menu_filters.style.display="block";
})

//add x to close menu filter (part in html)

delete_html_filter.addEventListener("click",async()=>{
    menu_filters.style.display="none";
});








/*search with author and title and language if there is also category,
everything will be work also if there insn't one or more selections.*/
//language selection:
    
/*first step get category and all the other choosen*/
//const categoryInput = document.getElementById('category'); get value
const searchButtonFilter= document.getElementById("search_filter")
searchButtonFilter.addEventListener("click",async()=>{
    const authorInput= document.getElementById("author");
    const titleInput = document.getElementById("title");

   //same 
    console.log(authorInput.value ? authorInput.value : "autore non selezionato");
    console.log(titleInput.value ? titleInput.value: "titolo non selezionato");
    console.log (categoryInput.value ? categoryInput.value : "categoria non selezionata");
    //console.log(languageSelecte.value ? languageSelecte.value : "linguaggio non selezionato");
    console.log("Lingua usata nella ricerca:", selectedLanguage);


    const baseUrl= `https://openlibrary.org/search.json`
    
    //object for create dynamic url, fantastic!
    const params = new URLSearchParams();

    //category
    if (categoryInput.value) {
    params.append("subject", categoryInput.value);
    }

    //author
    if(authorInput.value){
        params.append("author_name",authorInput.value);
    }

    //title
    if(titleInput.value){
        params.append("title",titleInput.value);
    }
    //limit 
    params.append("limit", "20");

    const url = `${baseUrl}?${params.toString()}`;
    console.log(url);

    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error("Errore caricamento descrizione")
            const data = await response.json();
        console.log(data);

//----------------------------------------da qui------------------------------------------------------------------
       // ViewSearch(data);
    CreateDom(data)

        
//----------------------------------------------------------a qui------------
        ///create a fun ction to do that and recall it


    }catch(error){
        console.error("Errore fetch dei filtri aggiuntivi",error)
    }


})