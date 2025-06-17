setInterval(() => {
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        if (data.disableAll) return;

        let video = document.querySelector("video");
        if (video && data.autoplay) {
            if (video.paused) {
                video.play();
            }

            if (data.speedUp && video.playbackRate !== 16.0) {
                video.playbackRate = 16.0;
            } else if (!data.speedUp && video.playbackRate !== 1.0) {
                video.playbackRate = 1.0;
            }
        }
    });
}, 1000);

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "pauseVideo") {
        let video = document.querySelector("video");
        if (video) {
            video.pause();
        }
    }
});

setInterval(() => {
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        if (data.autoRefresh && !data.disableAll) {
            location.reload();
        }
    });
}, 600000); // 10 dakika
