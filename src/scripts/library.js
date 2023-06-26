import { waitForElement } from "./waitForElement.js";

const remComp = () => {
  const el = ['.content-frame [class*="gamelistbar_GameListHomeAndSearch_"]'];

  el.forEach(async (e) => {
    const { matchedElements } = await waitForElement(
        e,
        3000
    );
    console.log(matchedElements)
    matchedElements.forEach(() => {
        document.querySelector(e).remove();
    });
  });
};

const start = async () => {
  const { matchedElements } = await waitForElement(
    '[class*="steamdesktop_LocalContentContainer_"]',
    3000
  );
  matchedElements.forEach(() => {
    /* remComp() */
  });
};

start()