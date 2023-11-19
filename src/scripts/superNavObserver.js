import { waitForElement } from './waitForElement.js';

function updateSelected(matchCase) {
    const elements = {
        "store": document.querySelector('#store'),
        "community": document.querySelector('#community'),
        "library": document.querySelector('#library')
    };

    const indicator = document.querySelector(".activeIndicator");
    const lastActive = document.querySelector(".button.active");

    if (lastActive !== null) {
        lastActive.classList.remove("active");
    }

    const selectedElement = elements[matchCase.toLowerCase()];

    if (selectedElement) {
        indicator.style.top = selectedElement.offsetTop + "px";
        selectedElement.classList.add("active");
    }
}

export async function handleSuperNavChanges() 
{
    const { matchedElements } = await waitForElement('[class^="supernav_SuperNav_"]', 3000);

    const mutationCallback = (mutationsList, _) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                if (!mutation.target.classList.contains("supernav_Selected_1gqEj")) 
                    continue;

                updateSelected(mutation.target.innerText)
            }
        }
    };

    const observer = new MutationObserver(mutationCallback);

    const config = {
        childList: true, subtree: true, attributes: true, attributeOldValue: true,
    };

    observer.observe(matchedElements[0], config);
}