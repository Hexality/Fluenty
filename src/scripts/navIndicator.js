import { waitForElement } from "./waitForElement.js";
import { insertBefore } from "./insertBefore.js";

let lastTab;

const waitButton = async (value, t) => {
    const { matchedElements } = await waitForElement(value, t);
    return matchedElements;
}

const addIndicator = async () => { const { matchedElements } = await waitForElement(
    '[class*="steamdesktop_OuterFrame_"]',
    3000
  );
  matchedElements.forEach(() => {
    const pageIndicator = document.createElement('div');
    pageIndicator.classList.add('side-indicator')
    insertBefore('#custom.frame', pageIndicator,'#custom .header')
  });
};

addIndicator();

const addIndicatorListener = async () => {
    const { matchedElements } = await waitForElement(
        '',
        3000
    );

    matchedElements.forEach(() => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        const indicator = waitButton('#custom .side-indicator', 3000);
        const libBut =  document.querySelector('#custom .lib-button');
        const colBut =  document.querySelector('#custom .col-button');
        const comBut =  document.querySelector('#custom .com-button');
        const strBut =  document.querySelector('#custom .str-button');
        const downBut=  document.querySelector('#custom [class*="bottombar_DownloadStatus_"]');

        libBut.addEventListener("click", (e) => {
            let opener = window.opener.MainWindowBrowserManager.m_history.location.pathname
            if(opener.includes('library/home')) {
            }
            
            lastTab = opener    
        })
        colBut.addEventListener("click", (e) => {
            
        })
        comBut.addEventListener("click", (e) => {
            
        })
        strBut.addEventListener("click", (e) => {
            
        })
        downBut.addEventListener("click", (e) => {
            
        })

        .style.setProperty('top',`${libBut.offsetTop + 10}px`);
        window.opener.SteamUIStore.Navigate('/library/home');
        document.querySelector('#custom .active').classList.toggle('active');
        libBut.classList.toggle('active');

        document.querySelector('#custom .side-indicator').style.setProperty('top',`${colBut.offsetTop + 10}px`);
        window.opener.SteamUIStore.Navigate('/library/collections');
        document.querySelector('#custom .active').classList.toggle('active');
        colBut.classList.toggle('active');

        document.querySelector('#custom .side-indicator').style.setProperty('top',`${comBut.offsetTop + 10}px`);
        window.opener.SteamUIStore.Navigate('/browser', window.opener.MainWindowBrowserManager.LoadURL(window.opener.urlStore.m_steamUrls.CommunityHome.url));
        document.querySelector('#custom .active').classList.toggle('active');
        comBut.classList.toggle('active');

        document.querySelector('#custom .side-indicator').style.setProperty('top',`${strBut.offsetTop + 10}px`);
        window.opener.SteamUIStore.Navigate('/browser', window.opener.MainWindowBrowserManager.LoadURL(window.opener.urlStore.m_steamUrls.StoreFrontPage.url));
        document.querySelector('#custom .active').classList.toggle('active');
        strBut.classList.toggle('active');

        document.querySelector('#custom .side-indicator').style.setProperty('top',`${downBut.offsetTop + 12}px`);
        window.opener.SteamUIStore.Navigate('/library/downloads');
        document.querySelector('#custom .active').classList.toggle('active');
        downBut.classList.toggle('active');
    });
}