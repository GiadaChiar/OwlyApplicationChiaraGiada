
import '../style/style.scss';
import '../style/menu.scss';
import { setUpMenu } from './menu.js';

const currentPage = document.body.dataset.currentPage;
setUpMenu(currentPage);
