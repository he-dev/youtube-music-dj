try {
    chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
        if (details.url?.startsWith("chrome://")) return undefined;

        console.log("url: " + details.url)
        chrome.scripting.executeScript({
            target: { tabId: details.tabId, allFrames: true },
            files: ["skip-song.js"]
        })
    })
} catch (e) {
    console.error(e);
}