browser.contextMenus.create({
        id: "gphm-smart-copy-scouting-profile",
        title: "GPHM Smart Copy Scouting Profile",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: "gphm-smart-copy-player-popup-draft",
        title: "GPHM Smart Copy Player - Draft",
        contexts: ["selection"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        //id: "gphm-smart-copy-player-popup-draft",
        id: "gphm-smart-copy-player-popup-all",
        title: "GPHM Smart Copy Player - DB",
        contexts: ["selection"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.onClicked.addListener((info, tab) => {
    var copyFunc = ''

    if (info.menuItemId === "gphm-smart-copy-player-popup-draft") {
        copyFunc = "copyPopupDraft";
    }
    else if (info.menuItemId === "gphm-smart-copy-player-popup-all") {
        copyFunc = "copyPopupAll";
    }
    else if (info.menuItemId === "gphm-smart-copy-scouting-profile") {
        copyFunc = "copyToClipboard2";
    }
        // gphm-smart-copy.js defines function copyToClipboard.
        const code = copyFunc + "()";
        browser.tabs.executeScript({
            code: "typeof " + copyFunc + " === 'function';",
        }).then((results) => {
            // The content script's last expression will be true if the function
            // has been defined. If this is not the case, then we need to run
            // gphm-smart-copy.js to define function copyToClipboard.
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "gphm-smart-copy.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {
            // This could happen if the extension is not allowed to run code in
            // the page, for example if the tab is a privileged page.
            console.error("Failed to copy text: " + error);
        });
});

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
