
import '../style/style.scss';
import '../style/menu.scss';
import { setUpMenu } from './menu.js';

const currentPage = document.header.dataset.currentPage;
setUpMenu(currentPage);
