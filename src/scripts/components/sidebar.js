export function createSidebar(t, si) {
  if (!!!t) {
    return `
    <div class="section">
        <!--
        <div class="button" id="menu">
            <div class="icon"></div>
        </div>
        -->
        <div title="Go back" class="button" id="back">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Library</div>
        </div>
        <div title="Library" class="button" id="library">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Library</div>
        </div>
        <div title="Collections" class="button" id="collections">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Collections</div>
        </div>
        <div title="Community" class="button" id="community">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Community</div>
        </div>
        <div title="Store" class="button" id="store">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Store</div>
        </div>
        <div title="Browser" class="button" id="browser">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Browser</div>
        </div>
    </div>
    <div class="section">
        <div title="Downloads" class="button" id="downloads">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Downloads</div>
        </div>
        <div title="Settings" class="button" id="settings">
            <div class="icon">
              <!---->
            </div>
            <div class="text">Settings</div>
        </div>
    </div>
    `;
  } else if (t) {
    const wrapper = document.querySelector('[class*="steamdesktop_Wrapper_"]');
    const libBut = t.querySelector("#library");
    const colBut = t.querySelector("#collections");
    const comBut = t.querySelector("#community");
    const strBut = t.querySelector("#store");
    const dowBut = t.querySelector("#downloads");
    const aI = wrapper.querySelector(".activeIndicator");

    /* function expandMenu() {
      const oF = document.querySelector('[class*="steamdesktop_OuterFrame_"]');
      if (t.classList.contains("active")) {
        t.classList.remove("active");
        oF.style.width = `${window.innerWidth - 48}px`;
      } else {
        t.classList.add("active");
        oF.style.width = `${window.innerWidth - 232}px`;
      }
    } */

    function navigate(s, el, nav, url) {
      if (!!!el.classList.contains("active") || s) {
        const lastActive = document.querySelector(".button.active");
        if (!!!s) {
          if(nav === '/browser') {
            window.opener.SteamUIStore.Navigate(
              "/browser",
              window.opener.MainWindowBrowserManager.LoadURL(url)
            );
          } else {
            window.opener.SteamUIStore.Navigate(nav);
          }
        }
        if (!!lastActive) {
          lastActive.classList.remove("active");
        }
        el.classList.add("active");
        aI.style.top = `${el.offsetTop}px`;
      }
    }

    if (!!!si) {
      libBut.addEventListener("click", () => navigate(false, libBut, '/library/home'));
      colBut.addEventListener("click", () => navigate(false, colBut, '/library/collections'));
      comBut.addEventListener("click", () => navigate(false, comBut, '/browser', window.opener.urlStore.m_steamUrls.CommunityHome.url));
      strBut.addEventListener("click", () => navigate(false, strBut, '/browser', window.opener.urlStore.m_steamUrls.StoreFrontPage.url));
      dowBut.addEventListener("click", () => navigate(false, dowBut, '/library/Downloads'));
      t.querySelector("#settings").addEventListener("click", () =>
        window.opener.open("steam://open/settings")
      );
      /* t.querySelector("#menu").addEventListener("click", () => expandMenu()); */
    } else {
      switch (window.opener.settingsStore.m_ClientSettings.start_page) {
        case "library":
          navigate(true, libBut);
          window.opener.console.log("Indicator: Library");
          break;
        case "store":
          navigate(true, strBut);
          window.opener.console.log("Indicator: Store");
          break;
      }
    }
  }
}
