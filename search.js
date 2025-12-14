


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
            titleElement.classList.add('book-title');
            titleElement.id = doc.key;

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
            

            bookTitles.forEach(title =>{
                title.addEventListener("mouseover",()=>{
                    console.log("elemento trovato")
                    console.log(title.id)

                    const row = title.closest(".book-row");
                    //to resaile to the first element with that class from title
                    if (!row) return;

                    if (row.querySelector(".description-box")) return;

                        console.log("Sezione trovata")
                        const divDescription= document.createElement("div");
                        divDescription.classList.add="div_description"
                        descriptH3= document.createElement("h3")
                        descriptH3.textContent="Trovato L'elemeto" + title.id

                        divDescription.appendChild(descriptH3)
                        row.appendChild(divDescription)

                })

            })
            
    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }


});
