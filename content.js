setInterval(() => {
    let video = document.querySelector("video");
    if (video && video.paused) {
        video.play();
    }
}, 1000);
