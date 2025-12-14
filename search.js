

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
/*
searchButton.addEventListener("click", async () => {
    const category = categoryInput.value.trim();
    console.log("Categoria cercata:", category);

    if (!category) return;

    const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=2";
    console.log("URL di ricerca:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Errore API " + response.status);
        }

        const data = await response.json();
        console.log("Risultati API:", data.docs); // <-- QUI

        
        const Title = data.docs.map(book => book.title);
        const Author = data.docs.map(book => book.author_name ? book.author_name.join(", ") : "Autore sconosciuto");
        const key = data.docs.map(book => book.key);
        
        
        data.docs.forEach(doc =>{
            generalDiv= document.createElement('div');
            generalDiv.classList.add('book-div');

            const titleElement = document.createElement('h3');
            titleElement.textContent = doc.title ?? "Titolo non disponibile";
            titleElement.id='bookTitle';

            const authorElement = document.createElement('p');
            authorElement.textContent=doc.author_name ? doc.author_name.join(", ") : "Autore sconosciuto";
            authorElement.id='bookAuthor';

            infoid= document.createElement('p');
            infoid.textContent= doc.key;


            generalDiv.appendChild(authorElement);
            generalDiv.appendChild(titleElement);
            risultatiDiv.appendChild(generalDiv);


        });

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }
});
*/

searchButton.addEventListener("click", async () => {
    const category = categoryInput.value.trim();
    if (!category) return;

    const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}` +"&limit=20";

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore API " + response.status);

        const data = await response.json();
        console.log("Risultati API:", data.docs); // <-- QUI
        risultatiDiv.innerHTML = ""; // pulisce risultati precedenti

        data.docs.forEach(doc => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('book-row');
            rowDiv.id = `book-${doc.key.replace("/works/", "")}`; 
            // rimuove /works/ dal key per avere un ID valido

            const inerrRowDiv = document.createElement('div');
            inerrRowDiv.classList.add('inner-row');
            rowDiv.appendChild(inerrRowDiv);

            const titleElement = document.createElement('a');
            titleElement.textContent = doc.title ?? "Titolo non disponibile";
            titleElement.classList.add('book-title');

            const authorElement = document.createElement('h3');
            authorElement.textContent = doc.author_name ? doc.author_name.join(", ") : "Autore sconosciuto";
            authorElement.classList.add('book-author');
            
            inerrRowDiv.appendChild(authorElement);
            inerrRowDiv.appendChild(titleElement);
            rowDiv.appendChild(inerrRowDiv);

            risultatiDiv.appendChild(rowDiv);

            // esempio: aggiungere evento click per maggiori dettagli
            rowDiv.addEventListener('click', () => {
                console.log("Dettagli libro:", doc.key);
                // qui puoi aprire modal o redirect
            });
        });

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }
});
