document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        document.getElementById("disableAll").checked = data.disableAll;
        document.getElementById("autoplay").checked = data.autoplay;
        document.getElementById("pauseOnTabChange").checked = data.pauseOnTabChange;
    });

    document.getElementById("save").addEventListener("click", () => {
        chrome.runtime.sendMessage({
            action: "updateSettings",
            settings: {
                disableAll: document.getElementById("disableAll").checked,
                autoplay: document.getElementById("autoplay").checked,
                pauseOnTabChange: document.getElementById("pauseOnTabChange").checked
            }
        });
    });
});
