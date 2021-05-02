setTimeout(skipDislike, 500);

function skipDislike() {

    try {
        let options = {}

        chrome.storage.sync.get("options", data => {
            Object.assign(options, data.options)

            if (options.canSkipDislike) {
                if (isDislike()) {
                    options.count = options.count ? Number(options.count) + 1 : 1
                    chrome.storage.sync.set({ options })
                    nextSong()
                }
            } else {
                console.log("skip-dislike is disabled")
            }
        })
    } catch (err) {
        console.error(err);
    }
}

function isDislike() {
    let likeStatus = document.getElementById("like-button-renderer").getAttribute("like-status")
    console.log(`like-status: ${likeStatus}`)
    return likeStatus === "DISLIKE"
}

function nextSong() {
    console.log("Next");
    document.getElementsByClassName("next-button")[0].click()
}