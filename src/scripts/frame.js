import { waitForElement } from "./waitForElement.js";
import { insertBefore } from "./insertBefore.js";
/* import { provideFluentDesignSystem, fluentMenu, fluentMenuItem } from "./fluentui-web-components.2.5.15.min.js" */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let el = document.createElement("div");
el.setAttribute("id", "custom");
el.classList.add("trashcol");

const fluentImporter = () => {
  const head = document.querySelector('head');
  const loader = head.querySelector('script[src*="libraryroot.custom.js"]');
  const baseUrl = loader.src.replace('libraryroot.custom.js','');

  const script = document.createElement('script');
  script.setAttribute('id','FLUENTUIMODULE');
  script.setAttribute('type','module');
  script.setAttribute('src',(baseUrl+'src/scripts/fluentui-web-components.2.5.15.min.js'));

  head.insertBefore(script,loader);
}

const createNodes = () => {
  const frame = document.createElement("div");
  frame.setAttribute("id", "custom");
  frame.classList.add("frame");
  let el = [];
  let i;
  for (i = 0; i < 11; i++) {
    let node = document.createElement("div");
    if (i < 6) {
      switch (i) {
        case 0:
          node.classList.add("page");
          break;
        case 1:
          node.classList.add("header");
          break;
        case 2:
          node.classList.add("content-frame");
          break;
        case 3:
          node.classList.add("nav-frame");
          break;
        case 4:
          node.classList.add("sidebar", "bottom-nav");
          break;
        case 5:
          node.classList.add("sidebar", "top-nav");
          break;
      }
    } else if (i >= 6) {
      node.classList.add("sidebar", "navbuttons");
      node.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="" fill="white"/>
        </svg>      
      `;
      switch (i) {
        case 6:
          node.classList.add("stg-button");
          node.addEventListener("click", () => { location.href = 'steam://open/settings' }, false);
          break;
        case 7:
          node.classList.add("str-button");
          node.addEventListener(
            "click",
            () => {
              window.opener.SteamUIStore.Navigate(
                "/browser",
                window.opener.MainWindowBrowserManager.LoadURL(
                  window.opener.urlStore.m_steamUrls.StoreFrontPage.url
                )
              );
            },
            false
          );
          break;
        case 8:
          node.classList.add("com-button");
          node.addEventListener(
            "click",
            () => {
              window.opener.SteamUIStore.Navigate(
                "/browser",
                window.opener.MainWindowBrowserManager.LoadURL(
                  window.opener.urlStore.m_steamUrls.CommunityHome.url
                )
              );
            },
            false
          );
          break;
        case 9:
          node.classList.add("col-button");
          node.addEventListener(
            "click",
            () => {
              window.opener.SteamUIStore.Navigate("/library/collections");
            },
            false
          );
          break;
        case 10:
          node.classList.add("lib-button");
          node.addEventListener(
            "click",
            () => {
              window.opener.SteamUIStore.Navigate("/library/home");
            },
            false
          );
          break;
      }
    }
    el.push(node);
  }
  let x = el.length - 1;
  el.forEach((e) => {
    if (x > 6) {
      el[5].appendChild(el[x]);
    } else if (x == 6) {
      el[4].appendChild(el[6]);
    } else if (x == 5) {
      el[3].appendChild(el[5]);
    } else if (x == 4) {
      el[3].appendChild(el[4]);
    } else if (x == 3) {
      el[0].appendChild(el[3]);
    } else if (x == 2) {
      el[0].appendChild(el[2]);
    } else if (x == 1) {
      frame.appendChild(el[1]);
    } else if (x == 0) {
      frame.appendChild(el[0]);
    }
    x--;
  });
  return frame;
};

const insertNavigation = () => {
  const parent = document.querySelector('[class*="steamdesktop_OuterFrame_"]');
  const before = document.querySelector(
    '[class*="steamdesktop_ContentFrame_"]'
  );
  const child = createNodes();

  parent.insertBefore(child, before);
};

const updateNavIcons = () => {
  const vl = [
    '[class*="bottombar_DownloadStatus_"] [class*="bottombar_Icon_"]',
    '[class*="titlebarcontrols_AnnouncementsButton_"]',
  ]

  const ic = [
    '',
    ''
  ]
};

const moveElements = (parent, child) => {
  if (!!parent && !!child) {
    document.querySelector(parent).appendChild(document.querySelector(child));
  } else {
    if (!!!parent) {
      console.log("Element 'parent' not specified");
    }
    if (!!!child) {
      console.log("Element 'child' not specified");
    }
  }
};

const removeGarb = () => {
  const elements = [
    '[class*="steamdesktop_URLBarReplacement_"]',
    '[class*="gamelistbar_GameListHomeAndSearch_"]',
    '[class*="bottombar_BottomBarContainer_"]',
    '[class*="steamdesktop_TopBar_"]',
    '[class*="steamdesktop_FocusBar_"]',
    '[class*="titlebarcontrols_WalletBalance_"]'
  ];

  elements.forEach((e) => {
    document.querySelector(e)?.remove();
  });
};

const elemels = async () => {
  const { matchedElements } = await waitForElement(
    '[class*="steamdesktop_OuterFrame_"]',
    3000
  );
  matchedElements.forEach(() => {
    insertNavigation();

    updateNavIcons();

    moveElements(
      '#custom .bottom-nav',
      '[class*="bottombar_DownloadStatus_"]'
    );

    moveElements("#custom .header", '[class*="steamdesktop_TitleBar_"]');

    moveElements(
      "#custom .content-frame",
      '[class*="steamdesktop_ContentFrame_"]'
    );

    insertBefore(
      ".sidebar.top-nav",
      '[class*="supernav_Arrow_25lBL"]:nth-child(1)',
      ".sidebar.navbuttons.lib-button"
    );

    removeGarb();

    fluentImporter();

    window.opener.console.log('Main module loaded successfully.');
  });
};

elemels();