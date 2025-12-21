


/*creo due costanti per le due classi*/
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const elencMenu= document.querySelectorAll('.off-screen-menu h3 a')//qualsiasi all
const menu_filters= document.getElementById("more-filters");
//const delete_html_filter= document.getElementById("delete_html_filter");
const button_filters = document.getElementById("filters");



//default hide menu filters
menu_filters.style.display="none";


hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');  // attivo/disattivo la X
    offScreenMenu.classList.toggle('active'); // mostro/nascondo il menu
    
    // Blocca lo scroll quando il menu è aperto
    document.body.classList.toggle('no-scroll');
})

//su qualsiasi elemento che clicchi 
elencMenu.forEach(link => {
    link.addEventListener('click', ()=>{
        offScreenMenu.classList.toggle('active');//nascondo menu
        hamMenu.classList.toggle('active');  // attivo/disattivo la X
        document.body.classList.toggle('no-scroll');//se era bloccato lo riattiva

    });
});

//take input category value 
const searchButton = document.getElementById('cerca');
const categoryInput = document.getElementById('category');
const risultatiDiv = document.getElementById('risultati');
risultatiDiv.style.display="none";


//I whant to check if textbox category isn't empty 
categoryInput.addEventListener("input", () => {
    const category = categoryInput.value.trim();
    if (category !== "") {
        searchButton.style.color = "white";
    } else {
        searchButton.style.color = "grey";
}
});



//function to create a section with div and description-----------------------------------------------------------------------------------
function ViewSearch(data){

    risultatiDiv.innerHTML = ""; // pulisce risultati precedenti
    if(data.numFound==0){
        risultatiDiv.innerHTML = ""; // pulisce risultati precedenti
        alert("Nessun libro è stato trovato! Cambiare la ricerca")


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
            titleElement.textContent = doc.title ?? "Titolo non disponibile";
            titleElement.id = doc.key;
            titleElement.classList.add('book-title', 'btn', 'btn-primary');
            titleElement.setAttribute('data-bs-toggle', 'collapse');
            titleElement.setAttribute('href', '#collapseExample');
            titleElement.setAttribute('role', 'button');
            titleElement.setAttribute('aria-expanded', 'false');
            titleElement.setAttribute('aria-controls', 'collapseExample');

        /*   <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
    </a>*/

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

        //if I pass over the icon show alert with information
            infoIcon.addEventListener("mouseover", () => {
                infobox =document.createElement("div");
                infobox.id="info_box";
                infobox.textContent = "Lista dei Libri con autori e titoli in base alla categoria selezionata.";
            risultatiDiv.appendChild(infobox);
            });

            //if I exit from icon the infobox disappear
            infoIcon.addEventListener("mouseleave",()=>{
                infobox.remove();
            })

            //if I click I pass hover mouse  get other informations info
            bookTitles= document.querySelectorAll(".book-title")
    

        bookTitles.forEach(title => {
        title.addEventListener("click", async() => {
            
            const row = title.closest(".book-row");
            //call another API 
            //donm't usen encodeURIComponent bacause it trasform / in %
            const url =`https://openlibrary.org${title.id}.json`;
            console.log("Url richiesta desc:", url)
            console.log("stampo id:", title.id)


            /* try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore API " + response.status);

        const data = await response.json();
        console.log("Risultati API:", data.docs);*/

        try{
            const response = await fetch(url);
            if(!response.ok) throw new Error("Errore caricamento descrizione")
            const data = await response.json();
            console.log("Risultati descrizione API:",data.description)



            if (!row) return;

            // controlla se c'è già una descrizione sotto questa riga
            if (row.nextElementSibling?.classList.contains("description-box")) {
                return; // evita duplicati
            }

            //check data if it is an object or a string or it is empty
            let descriptionText = "Descrizione non disponibile";

            if (typeof data.description === "string") {
                descriptionText = data.description;
            } else if (
                typeof data.description === "object" &&
                data.description?.value
            ) {
                descriptionText = data.description.value;
            }
            // crea il div descrizione
            const divPlace = document.createElement("div");
            divPlace.classList.add("description-box");
            const titleDesc= document.createElement("h5")
            titleDesc.classList.add="desc_title"
            titleDesc.textContent=" Description:"

            const pDesc= document.createElement("p");
            pDesc.classList.add="desc_p"
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
            console.log("Errore caricamento descrizione")
        }
        
            
        });
    });


}}



//--------------------end function-----------------------------------------------------


//if I click on search button


searchButton.addEventListener("click", async () => {
    const category = categoryInput.value.trim();
    if (!category){
        alert("Per favore, inserisci una categoria valida.");
        return;
    };

    const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=20";
    console.log("URL richiesta:", url); 

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore API " + response.status);

        const data = await response.json();
        console.log("Risultati API:", data.docs); // <-- QUI
        
        ViewSearch(data);
            
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

/*first step get category and all the other choosen*/
//const categoryInput = document.getElementById('category'); get value
const searchButtonFilter= document.getElementById("search_filter")
searchButtonFilter.addEventListener("click",async()=>{
    const authorInput= document.getElementById("author");
    const titleInput = document.getElementById("title");
    const languageSelecte = document.getElementsByClassName("dropdown-item")
    //late language but l have to add it 
   /* if(authorInput.value) {
        console.log(authorInput.value);
    }else {
        console.log("autore non selezionato")
    }*/
   //same 
    console.log(authorInput.value ? authorInput.value : "autore non selezionato");
    console.log(titleInput.value ? titleInput.value: "titolo non selezionato");
    console.log (categoryInput.value ? categoryInput.value : "categoria non selezionata");
    console.log(languageSelecte.value ? languageSelecte.value : "linguaggio non selezionato");

   
//author_name
   //language
   //title

   //fetch more filters
   /* const url = `https://openlibrary.org/search.json?subject=${categoryInput.value}&author_name=${encodeURIComponent(authorInput.value)}`+"&limit=20";

    if(categoryInput.value){
        const catUrl= + `subject=${categoryInput.value}`
    } 

    if(authorInput.value){
        const authUrl= + `author_name=${encodeURIComponent(authorInput.value)}`
        if(categoryInput.value){
            const authorInput = + `&author_name=${encodeURIComponent(authorInput.value)}`
        }
    }
    
    console.log("URL richiesta:", url); */

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
    params.append("limit", "5");

    const url = `${baseUrl}?${params.toString()}`;
    console.log(url);

    try{
        response = await fetch(url);
        if(!response.ok) throw new Error("Errore caricamento descrizione")
            const data = await response.json();
        console.log(data);

//----------------------------------------da qui------------------------------------------------------------------
        ViewSearch(data);

        
//----------------------------------------------------------a qui------------
        ///create a fun ction to do that and recall it


    }catch(error){
        console.log("Errore fetch dei filtri aggiuntivi")
    }


})