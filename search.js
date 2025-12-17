


/*creo due costanti per le due classi*/
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const elencMenu= document.querySelectorAll('.off-screen-menu h3 a')//qualsiasi all


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
        risultatiDiv.innerHTML = ""; // pulisce risultati precedenti

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





            
    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }


});
