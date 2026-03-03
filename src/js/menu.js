
//MENU LOGIC

// Load menu HTML and insert it into the page
export function fetchMenu() {
    return fetch("menu.html")
        .then(res => res.text()) //then response in text form
        .then(html => {
            const header = document.getElementById("header");
            header.innerHTML = html;
            return header
        })
}


// Disable link for the current page
function disableLinkCurrentPage(header, currentPage) {
    const links = header.querySelectorAll("a[data-page]")
    links.forEach(link => {
        link.classList.remove("disable");
        const hrefLink = link.getAttribute("href");
        if (hrefLink === currentPage) {
            link.classList.add("disable");
        }
    });
}



// Enable toggle menu and handle off-screen menu links
function activateToggleMenu(header) {
    const hamMenu = header.querySelector('.ham-menu');
    const offScreenMenu = header.querySelector('.off-screen-menu');
    const menuLinks = header.querySelectorAll('.off-screen-menu h3 a');

    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');  // anable and disable X
        offScreenMenu.classList.toggle('active'); // show/hidden menu
        document.body.classList.toggle('no-scroll');
    })

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            offScreenMenu.classList.toggle('active');//hidden menu
            hamMenu.classList.toggle('active');  // anable and disable X
            document.body.classList.toggle('no-scroll');//if it was blocked I active it
        });
    });
}


// Update hash links to point to index.html if on another page
function changeLinkNavigation(header, currentPage) {
    if (currentPage !== "index.html") {
        const links = header.querySelectorAll("a[data-page]")
        links.forEach(link => {
            const hrefLink = link.getAttribute("href");
            if (hrefLink.startsWith("#")) {
                const newhref = "index.html" + hrefLink;
                link.setAttribute("href", newhref);
            }
        })
    }
}


// Initialize all menu logic
export function setUpMenu(currentPage) {
    fetchMenu()
        .then(header => {
            disableLinkCurrentPage(header, currentPage);
            changeLinkNavigation(header, currentPage);
            activateToggleMenu(header);
        })
}
