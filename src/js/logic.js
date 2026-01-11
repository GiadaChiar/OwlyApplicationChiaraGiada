
//import './style/style.scss';


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




