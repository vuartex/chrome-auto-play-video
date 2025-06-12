// Otomatik video oynatma kontrolü
setInterval(() => {
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        if (data.disableAll) return; // Eğer uzantı kapatılmışsa hiçbir işlem yapma

        let video = document.querySelector("video");
        if (video && data.autoplay && video.paused) {
            video.play();
        }
    });
}, 1000);

// Sekme değiştiğinde videoyu durdurma
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "pauseVideo") {
        let video = document.querySelector("video");
        if (video) {
            video.pause();
        }
    }
});

// Sayfayı 5 saniyede bir yenileme
setInterval(() => {
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        if (data.autoRefresh && !data.disableAll) {
            location.reload();
        }
    });
}, 600000); // 10 dakika = 600000 ms

