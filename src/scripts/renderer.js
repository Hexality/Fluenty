import { createSidebar } from "./components/sidebar.js";
import { waitForElement } from "./waitForElement.js";

export async function renderer() {
  function removeEl(e) {
    const t = async (_) => {
      await waitForElement(_, 1000).then((_) =>
        _.matchedElements.forEach((_) => {
          _.remove();
        })
      );
    };
    if (e.length > 1) {
      e.forEach((_) => t(_));
    } else {
      t(e);
    }
  }
  await waitForElement('[class*="steamdesktop_FocusNavigationRoot_"]').then(
    (v) => {
      v.matchedElements.forEach(async () => {
        (
          await waitForElement('[class*="steamdesktop_Wrapper_"]')
        ).matchedElements.forEach(async (wrapper) => {
          const aI = document.createElement("div");
          const sidebar = document.createElement("div");

          aI.setAttribute("class", "activeIndicator");
          sidebar.setAttribute("id", "sidebar");

          sidebar.innerHTML = createSidebar();

          (
            await waitForElement('[class*="steamdesktop_OuterFrame_"]')
          ).matchedElements.forEach(async function (oF) {
            wrapper.insertBefore(aI, oF);
            createSidebar(sidebar);
            wrapper.insertBefore(sidebar, oF);
            createSidebar(sidebar, true);
            removeEl([
              '[class*="gamelistbar_GameListHomeAndSearch_"]',
              '[class*="steamdesktop_URLBarReplacement_"]'
            ]);
          });
        });
      });
    }
  );
}
