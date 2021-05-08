// chrome.runtime.onInstalled.addListener(function() {
//     console.log("Initialized!")
//         //if(/^/.test(current_tab_info))

//     //chrome.tabs.executeScript(null, { file: "./gMusicScript.js" })
// });

try {
    chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
        console.log("url: " + details.url)
        chrome.scripting.executeScript({
            target: { tabId: details.tabId, allFrames: true },
            files: ["skip-song.js"]
        })
    })
} catch (e) {
    console.error(e);
}