setInterval(() => {
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        if (data.disableAll) return; // Eğer uzantı kapatılmışsa hiçbir işlem yapma
        
        let video = document.querySelector("video");
        if (video) {
            if (data.autoplay && video.paused) {
                video.play();
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
