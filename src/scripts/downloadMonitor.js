let SharedJSContext = window.opener
import { waitForElement } from "./waitForElement.js";

class PromiseEventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (this.listeners[event]) {
            const index = this.listeners[event].indexOf(listener);
            if (index !== -1) {
                this.listeners[event].splice(index, 1);
            }
        }
    }
    async emit(event, ...args) {
        if (this.listeners[event]) {
            const promises = this.listeners[event].map(listener => listener(...args));
            return Promise.all(promises);
        }
    }
}
const emitter = new PromiseEventEmitter();

const updater = {
    // get the total percentage of the operation, including disk operations, downloads and processing
    total_percent: (data) => {
        return ((data.update_bytes_processed / data.update_bytes_to_process) * 100).toFixed(1)
    },
    // get the download percent
    download_percent: (data) => {
        return ((data.update_bytes_downloaded / data.update_bytes_to_download) * 100).toFixed(1)
    },
    parse_details: (data) => {
        return {
            name: data.strDisplayName,
            icon: `${data.unAppID}_${data.libraryAssets.strLogoImage}`,
            appid: data.unAppID
        }
    },
    format_bytes: (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1000;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }
}

function getAppDetails(appid) {
    return new Promise((resolve, reject) => {
        let register = SharedJSContext.SteamClient.Apps.RegisterForAppDetails(appid, (log) => {
            register.unregister();
            resolve(updater.parse_details(log));
        });
    });
}

emitter.on('downloadOverview', async (data) => {
    console.log(data)
    const { matchedElements } = await waitForElement('#downloads', 3000);

    function updateIndicator() {
        matchedElements[0].classList.toggle('downloading', data.update_state === 'Downloading');
        matchedElements[0].classList.toggle('pending', data.paused);
    }

    if (data.update_appid != 0) {
        getAppDetails(data.update_appid).then(async (gameInfo) => {
            updateIndicator()
            let message = `${data.update_state} (${updater.total_percent(data)}%)\nDownloading at ${updater.format_bytes(data.update_network_bytes_per_second)}/s\n${gameInfo.name} (${updater.download_percent(data)}%)`
            matchedElements[0].setAttribute('title', message)
        })
    } else {
        matchedElements[0].setAttribute('title', 'Downloads')
        updateIndicator()
    }
});

export function registerForUpdates() {
    SharedJSContext.SteamClient.Downloads.RegisterForDownloadOverview((event) => emitter.emit('downloadOverview', event))
}