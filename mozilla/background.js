const ID_COPY_SCOUTING_PROFILE = "gphm-scouting-profile";
const ID_COPY_POPUP_FA = "gphm-open-popup-fadraft";
const ID_COPY_POPUP_DB = "gphm-open-popup-db";
const ID_WALK_SEASON = "gphm-smart-copy-league-season";
const ID_ASSISTANT_REPORT = "gphm-smart-copy-assistant-report";
const ID_COPY_PLAYER_PAGE = "gphm-smart-copy-player-page";
const ID_TESTER = "gphm-smart-copy-TESTER";
browser.contextMenus.create({
        id: ID_COPY_PLAYER_PAGE,
        title: "GPHM Smart Copy Player Page",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: ID_COPY_SCOUTING_PROFILE,
        title: "GPHM Smart Copy Scouting Profile",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: ID_COPY_POPUP_FA,
        title: "GPHM Smart Copy Open Popup - FA/Draft",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: ID_COPY_POPUP_DB,
        title: "GPHM Smart Copy Open Popup - DB",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: ID_WALK_SEASON,
        title: "GPHM Smart Copy Season",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: ID_ASSISTANT_REPORT,
        title: "GPHM Smart Assistant Report",
        contexts: ["page"],
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.create({
        id: ID_TESTER,
        title: "GPHM Smart Copy TESTER",
        contexts: ["page"], // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType
    },
    () => void browser.runtime.lastError,
);
browser.contextMenus.onClicked.addListener((info, tab) => {
    var copyFunc = ''

    if (info.menuItemId === ID_COPY_SCOUTING_PROFILE) {
        copyFunc = "copyToClipboardHandler";
    }
    if (info.menuItemId === ID_COPY_PLAYER_PAGE) {
        copyFunc = "copyToClipboardHandler";
    }
    else if (info.menuItemId === ID_COPY_POPUP_FA) {
        copyFunc = "copyToClipboardHandler";
    }
    else if (info.menuItemId === ID_COPY_POPUP_DB) {
        copyFunc = "copyToClipboardHandler";
    }
    else if (info.menuItemId === ID_WALK_SEASON) {
        copyFunc = "walkSeasonGamesHandler";
    }
    else if (info.menuItemId === ID_ASSISTANT_REPORT) {
        copyFunc = "assistantReportHandler";
    }
    else if (info.menuItemId === ID_TESTER) {
        copyFunc = "testerHandler";
    }
 
    // gphm-smart-copy.js defines function copyToClipboard.
    const code = copyFunc + "('" + info.menuItemId + "')";
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
