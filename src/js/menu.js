

/*
//function to remuve disable class and add it to current page (link a)
function disableLinkCurrentPage(header,currentPage){
    header.querySelectorAll("a[data-page]").forEach(link => {
    link.classList.remove("disable");
    if (link.dataset.page === currentPage) {
        link.classList.add("disable");
        }
    });
}
*/

//function to activate all toggle manu 
function activateToggleMenu(header){
const hamMenu = header.querySelector('.ham-menu');
const offScreenMenu = header.querySelector('.off-screen-menu');
const elencMenu= header.querySelectorAll('.off-screen-menu h3 a');// all

hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');  // anable and disable X
        offScreenMenu.classList.toggle('active'); // show/hidden menu
        // block scrolling when menu is open
        document.body.classList.toggle('no-scroll');
    })

    //if you clink in every other part
    elencMenu.forEach(link => {
        link.addEventListener('click', ()=>{
            offScreenMenu.classList.toggle('active');//hidden menu
            hamMenu.classList.toggle('active');  // anable and disable X
            document.body.classList.toggle('no-scroll');//if it was blocked I active it
        });
    });
}

/*
//change link a if I am in a different page from index.html
function changeLinkNavigation(header,currentPage) {
    if (currentPage !== "index") {
        header.querySelectorAll("a[data-page]").forEach(link => {
            if(link.getAttribute(href) !== currentPage & link.getAttribute)
            link.href = "/index" + link.getAttribute(href)
        });

    }
}
*/


// function to recall all the functions about header(menu)
export function setUpMenu(currentPage){
    fetchMenu()
    .then(header=>{disableLinkCurrentPage(header,currentPage);
    activateToggleMenu(header);
    })
}
