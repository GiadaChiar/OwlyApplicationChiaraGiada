
import '../style/style.css';

import { setUpMenu } from './menu.js';
const currentPage = document.body.dataset.currentPage;
setUpMenu(currentPage);
