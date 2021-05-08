setTimeout(skipSong, 500);

function skipSong() {

    try {
        let options = {}

        chrome.storage.sync.get("options", data => {
            Object.assign(options, data.options)

            let canSkip =
                (Boolean(options.canSkipDislike) && isLike() === false) ||
                (Boolean(options.canSkipLike) && isLike() === true)

            if (canSkip) {
                options.count = options.count ? Number(options.count) + 1 : 1
                chrome.storage.sync.set({ options })
                nextSong()
            }
        })
    } catch (err) {
        console.error(err);
    }
}

function isLike() {
    let likeStatus = document.getElementById("like-button-renderer").getAttribute("like-status")
    console.log(`like-status: ${likeStatus}`)
    switch (likeStatus) {
        case "LIKE":
            return true
        case "DISLIKE":
            return false
        default:
            return undefined
    }
}


function nextSong() {
    console.log("next song");
    document.getElementsByClassName("next-button")[0].click()
}