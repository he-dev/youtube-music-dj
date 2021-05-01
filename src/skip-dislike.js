setTimeout(skipDislike, 500);

function skipDislike() {

    let options = {}

    chrome.storage.sync.get("options", data => {
        Object.assign(options, data.options)

        if (!options.canSkipDislike) {
            console.log("skip-dislike is disabled")
            return
        }

        try {

            let likeStatus = document.getElementById("like-button-renderer").getAttribute("like-status")
            console.log(`like-status: ${likeStatus}`)

            if (likeStatus === "DISLIKE") {
                options.count = options.count ? Number(options.count) + 1 : 1
                chrome.storage.sync.set({ options })
                nextSong()
            }

        } catch (err) {
            console.error(err);
            console.log("music not running will try in 2 seconds");
        }
    })
}

function nextSong() {
    console.log("Next");
    document.getElementsByClassName("next-button")[0].click()
}