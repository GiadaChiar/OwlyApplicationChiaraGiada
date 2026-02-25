
//MENU LOGIC
//create a fetch to get menu in menu.html
//const currentPage = document.body.dataset.currentPage;

//function to load and add header(menu) to html file
export function fetchMenu(){
    return fetch("menu.html")
    .then(res =>res.text()) //then response in text form
    .then(html=>{ 
        const header = document.getElementById("header");
        header.innerHTML = html;
        return header
    })
}



function disableLinkCurrentPage(header, currentPage) {
    const links = header.querySelectorAll("a[data-page]")
    console.log("Presa la funzione in carica", currentPage)
    links.forEach(link => {
        link.classList.remove("disable");
        const hrefLink = link.getAttribute("href");
        if (hrefLink === currentPage) {
        console.log("La pagina corrente è :", currentPage)
        link.classList.add("disable");
        console.log("aggiunto disable page:", currentPage)
        }
    });
}



//function to activate all toggle manu 
function activateToggleMenu(header){
const hamMenu = header.querySelector('.ham-menu');
const offScreenMenu = header.querySelector('.off-screen-menu');
const menuLinks= header.querySelectorAll('.off-screen-menu h3 a');// all

hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');  // anable and disable X
        offScreenMenu.classList.toggle('active'); // show/hidden menu
        // block scrolling when menu is open
        document.body.classList.toggle('no-scroll');
    })

    //if you clink in every other part
    menuLinks.forEach(link => {
        link.addEventListener('click', ()=>{
            offScreenMenu.classList.toggle('active');//hidden menu
            hamMenu.classList.toggle('active');  // anable and disable X
            document.body.classList.toggle('no-scroll');//if it was blocked I active it
            console.log("toggle menu ok")
        });
    });
}


//function add index.html into # if current page is different to index.html
function changeLinkNavigation(header, currentPage) {
    if (currentPage !== "index.html") {
        const links = header.querySelectorAll("a[data-page]")
        links.forEach(link => {
            const hrefLink = link.getAttribute("href");
            if (hrefLink.startsWith("#")) {
                const newhref = "index.html" + hrefLink ;
                link.setAttribute("href", newhref);
            }
        })
    }
}


// function to recall all the functions about header(menu)
export function setUpMenu(currentPage){
    fetchMenu()
        .then(header => {
        disableLinkCurrentPage(header, currentPage);
        changeLinkNavigation(header, currentPage);
        activateToggleMenu(header);
    })
}
