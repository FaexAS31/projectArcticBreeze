import { toggleContent } from '../../components/sidemenu/sidemenu.js';
import { menu } from '../sidemenu/settings.js';

export const init = () => {
    //console.log('Initializing Layout');
    handleSensorClick();

};

function handleSensorClick() {

    var sensor = document.getElementById('sensor');
    var sensorText = document.getElementById('sensor-text');

    sensor.addEventListener('click', () => toggleContent(menu[2]));
    sensorText.addEventListener('click', () => toggleContent(menu[2]));
}

