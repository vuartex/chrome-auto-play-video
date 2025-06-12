// Eklenti yüklendiğinde varsayılan ayarları kaydet
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        autoplay: true,
        pauseOnTabChange: false,
        disableAll: false,
        autoRefresh: false // ✅ yeni seçenek
    });
});

// Ayarları al / güncelle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSettings") {
        chrome.storage.sync.get(["autoplay", "pauseOnTabChange", "disableAll", "autoRefresh"], (data) => {
            sendResponse(data);
        });
        return true;
    } else if (request.action === "updateSettings") {
        chrome.storage.sync.set(request.settings);
    }
});

// Sekme değiştiğinde videoyu durdur
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.storage.sync.get("pauseOnTabChange", (data) => {
        if (data.pauseOnTabChange) {
            chrome.tabs.sendMessage(activeInfo.tabId, { action: "pauseVideo" });
        }
    });
});
