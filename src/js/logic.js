
import '../style/style.scss';
import '../style/menu.scss';
import { setUpMenu } from './menu.js';

//set current page to disable navigation menu 
const currentPage = window.location.pathname.split("/").pop();
setUpMenu(currentPage);
