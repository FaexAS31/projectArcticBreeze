import { toggleContent } from '../../components/sidemenu/sidemenu.js';
import { menu } from '../sidemenu/settings.js';

export const init = () => {
    //console.log('Initializing footer');
}

    const homeLinks = document.querySelectorAll('.home-link');
    homeLinks.forEach(e => {
        e.addEventListener('click', () => {
            //console.log('Home link clicked');
            toggleContent(menu[0]);
        });
    });