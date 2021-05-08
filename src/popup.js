const options = {}

document.addEventListener('DOMContentLoaded', () => {

    chrome.storage.sync.get("options", data => {
        Object.assign(options, data.options)
        mainForm.canSkipDislike.checked = Boolean(options.canSkipDislike)
        mainForm.canSkipLike.checked = Boolean(options.canSkipLike)

        translate("mainTitle")
        translate("canSkipDislikeLabel")
        translate("canSkipLikeLabel")
        translate("canSkipLikeHint")
        translate("skipCount", [options.count || 0])
    })

    mainForm.canSkipDislike.addEventListener("change", event => {
        options.canSkipDislike = event.target.checked
        chrome.storage.sync.set({ options })
    })

    mainForm.canSkipLike.addEventListener("change", event => {
        options.canSkipLike = event.target.checked
        chrome.storage.sync.set({ options })
    })
});



function translate(id, placeholders) {
    document.getElementById(id).innerText = chrome.i18n.getMessage(id, placeholders)
}