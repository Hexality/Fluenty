import { waitForElement } from "./waitForElement.js";

const removeSmallMode = async () => {
    if(document.title !== 'View Root Menu') return;

    try {
        const { matchedElements } = await waitForElement('[class*="menu_MenuItem_"]', 3000);
        let targetWindow = window.opener;

        matchedElements.forEach(
            (e) => { 
                if(e.innerText == 'Small Mode') { 
                    targetWindow.console.log('Small mode button temporarily removed from the View menu to avoid unnecessary "known bug" reports.');
                    e.remove() 
                } 
            }
        )
    }

    catch(error) {
        console.error(error, 'took too long to find the requested element');
    }
}

removeSmallMode()