document.addEventListener("DOMContentLoaded", () => {
    // Ayarları yükle
    chrome.runtime.sendMessage({ action: "getSettings" }, (data) => {
        document.getElementById("disableAll").checked = data.disableAll;
        document.getElementById("autoplay").checked = data.autoplay;
        document.getElementById("pauseOnTabChange").checked = data.pauseOnTabChange;
        document.getElementById("autoRefresh").checked = data.autoRefresh;
        document.getElementById("speedUp").checked = data.speedUp || false;
    });

    // Ayarları kaydet
    document.getElementById("save").addEventListener("click", () => {
        chrome.runtime.sendMessage({
            action: "updateSettings",
            settings: {
                disableAll: document.getElementById("disableAll").checked,
                autoplay: document.getElementById("autoplay").checked,
                pauseOnTabChange: document.getElementById("pauseOnTabChange").checked,
                autoRefresh: document.getElementById("autoRefresh").checked,
                speedUp: document.getElementById("speedUp").checked
            }
        });
    });

    // Video ID'ye göre izlenmiş göster
    document.getElementById("markWatched").addEventListener("click", () => {
        const newVideoId = document.getElementById("videoIdInput").value;
        if (!newVideoId) {
            alert("Lütfen bir video ID giriniz.");
            return;
        }

        const payload = {
            "data": `a:6:{s:4:"tckn";s:11:"19946472338";s:7:"current";i:5;s:9:"contentId";i:${newVideoId};s:11:"currentTime";i:324;s:12:"sectorLength";i:81;s:4:"time";i:${Math.floor(Date.now() / 1000)}}`,
            "iss": "obagovtr",
            "iat": Math.floor(Date.now() / 1000),
            "nbf": Math.floor(Date.now() / 1000)
        };

        const header = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
        const encodedPayload = btoa(JSON.stringify(payload));
        const signature = "tt9J63IUoNmAXwlZ0Em4bMcBrhjPL0Kvj8FuxI50lhg";

        const fakeToken = `${header}.${encodedPayload}.${signature}`;

        fetch("https://omba.eba.gov.tr/Ogrenci/api/SaveContentWatchProgress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: fakeToken })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Sunucu yanıtı:", data);
            alert(`Durum: ${data.message || "Gönderildi"}`);
        })
        .catch(err => {
            console.error("Hata:", err);
            alert("İstek gönderilirken hata oluştu.");
        });
    });
});
