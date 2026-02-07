
//import './style/style.scss';
import '../style/style.css';

//create a fetch to get menu in menu.html-->

    fetch("menu.html")
    .then(res =>res.text()) //then response in text form
    .then(html=>{
        document.getElementById("header").innerHTML = html;
    })

/*if current page is index.html  remove every classess disable and
add class=disable to index.html link*/

const currentPage = document.body.dataset.currentPage;

document.querySelectorAll("a[data-page]").forEach(link => {
    link.classList.remove("disable");

    if (link.dataset.page === currentPage) {
    link.classList.add("disable");
    }
});


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




