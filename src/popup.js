document.addEventListener('DOMContentLoaded', () => {

    translate("mainTitle")
    translate("canSkipDislikeLabel")
    translate("skipCount", [options.count || 0])

});

function translate(id, placeholders) {
    document.getElementById(id).innerText = chrome.i18n.getMessage(id, placeholders)
}