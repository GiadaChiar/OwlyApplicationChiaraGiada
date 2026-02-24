
import '../style/style.scss';
import '../style/menu.scss';
import { setUpMenu } from './menu.js';

const currentPage = window.location.pathname.split("/").pop();
//const currentPage = document.header.dataset.currentPage;
setUpMenu(currentPage);
