export async function handleLibraryContainerResize() {

    function prepareResizeListener(matchingElement) {

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;

                var seperator = document.querySelector('[class*="library_LibraryWindowDivider_"]')
                seperator.style.marginLeft = `${newWidth}px`;
            }
        });

        resizeObserver.observe(matchingElement);
    }


    const targetNode = document.body;
    const config = { childList: true, subtree: true };
  
    const observer = new MutationObserver(mutationsList => {
        const matchingElements = document.querySelector('[class*="library_LeftListSizableContainer_"]');

        if (matchingElements != null) {
            prepareResizeListener(matchingElements);
        }
    });
  
    observer.observe(targetNode, config);
}