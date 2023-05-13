const delay = ms => new Promise(res => setTimeout(res, ms));

const removeGarbage = async () => {
    await delay(3000);
    const remAddGamBut = document.querySelector('[class*="bottombar_AddGameButton_"]');
    const remFriendsBut = document.querySelector('[class*="bottombar_FriendsButton_"]');
    remAddGamBut.remove();
    remFriendsBut.remove();
}

const addButtons = async () => {
    await delay(3000);
    const divSet = document.createElement("div");
    divSet.classList.add("steamSettingsButton");
    divSet.addEventListener('click', function() {
        location.href = 'steam://settings'
    }, false);
    const divSetIcon = document.createElement("span");
    divSetIcon.classList.add("steamSettingsIcon");
    const setIcon = document.createTextNode("");
    divSetIcon.appendChild(setIcon);
    divSet.appendChild(divSetIcon);

    const parent = document.querySelector('[class*="bottombar_BottomBar_"]');
    const child = document.querySelector('[class*="bottombar_DownloadStatus_"]');
    parent.insertBefore(divSet, child);
}

removeGarbage()
addButtons()