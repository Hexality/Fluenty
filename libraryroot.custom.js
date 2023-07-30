import { waitForElement } from './src/scripts/waitForElement.js';
import './src/scripts/frame.js';
import './src/scripts/library.js';
import './src/scripts/navIndicator.js';
import './src/scripts/reloadButton.js';
import './src/scripts/restartButton.js';
import './src/scripts/disableSmallMode.js';
window.opener.console.log('Loading components...');

const loader = async () => {
    const curtain = document.createElement('div');
    const logo = document.createElement('div');
    curtain.classList.add('loadCurtain');
    curtain.addEventListener('animationend', () => {
        curtain.remove();
    })
    logo.classList.add('skinLogoBox');
    curtain.appendChild(logo)
    const { matchedElements } = await waitForElement('[class*="steamdesktop_FocusNavigationRoot_"]', 1000);

    matchedElements.forEach((e) => {
        e.appendChild(curtain);
    })
}

loader()