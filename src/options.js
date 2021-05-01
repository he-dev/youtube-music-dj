const options = {}

chrome.storage.sync.get("options", data => {
    Object.assign(options, data.options)
    mainForm.canSkipDislike.checked = Boolean(options.canSkipDislike)
})

mainForm.canSkipDislike.addEventListener("change", event => {
    options.canSkipDislike = event.target.checked
    chrome.storage.sync.set({ options })
})