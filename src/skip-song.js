
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Wait a few moments for the player to load the current song.
setTimeout(skipSong, randomInt(1000, 1500));

function skipSong() {

    try {

        if (isPlaying()) {
            chrome.storage.sync.get("options", data => {
                let options = {}
                Object.assign(options, data.options)
                console.log(options)
                if (canSkip(getLikeStatus(), options)) {
                    nextSong()
                    options.count = options.count ? Number(options.count) + 1 : 1
                    chrome.storage.sync.set({ options })
                }
            })
        }
        else {
            console.debug("Not playing.")
        }

    } catch (err) {
        console.error(err);
    }
}

function getLikeStatus() {
    return document.getElementById("like-button-renderer").getAttribute("like-status")
}

function isPlaying() {
    let playPauseStatus = document.getElementById("play-pause-button").getAttribute("title")
    console.debug(`play-pause: ${playPauseStatus}`)
    // When playing the button shows "Pause".
    return playPauseStatus === "Pause"
}

function canSkip(likeStatus, options) {
    switch (likeStatus) {
        case "LIKE":
            if (Boolean(options.canSkipLike) === true) {
                console.log(`Skipping ${likeStatus}...`)
                return true
            } else {
                console.log(`Skipping ${likeStatus} disabled.`)
            }
            break
        case "DISLIKE":
            if (Boolean(options.canSkipDislike) === true) {
                console.log(`Skipping ${likeStatus}...`)
                return true
            } else {
                console.log(`Skipping ${likeStatus} disabled.`)
            }
            break
        case "INDIFFERENT":
            console.log(`Playing ${likeStatus}...`)
            break
    }
    return false
}


function nextSong() {
    console.log("Clicking next song...");
    document.getElementsByClassName("next-button")[0].click()
}