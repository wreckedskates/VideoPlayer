// sharedPlaylistCore.js

let video;
let playlist;
let prevButton;
let nextButton;
let currentVideoIndex = 0;
let nextVideo = null;
let preloading = false;
let videoList;

function initPlaylist(config) {
    video = document.getElementById('main-video');
    playlist = document.getElementById('playlist');
    prevButton = document.getElementById('prev-video');
    nextButton = document.getElementById('next-video');

    videoList = config.videos || [];
    currentVideoIndex = 0;

    // Populate playlist UI
    playlist.innerHTML = '';
    videoList.forEach((vid, index) => {
        const li = document.createElement('li');
        li.textContent = vid.title;
        li.addEventListener('click', () => loadVideo(index));
        playlist.appendChild(li);
    });

    // Button events
    prevButton.addEventListener('click', () => loadVideo(currentVideoIndex - 1));
    nextButton.addEventListener('click', () => loadVideo(currentVideoIndex + 1));

    video.addEventListener('ended', playNextVideo);
    video.addEventListener('timeupdate', maybePreloadNext);

    // Start with first video
    loadVideo(0);
}

function loadVideo(index, autoplay = true) {
    if (index < 0) index = videoList.length - 1;
    if (index >= videoList.length) index = 0;

    video.src = videoList[index].src;
    video.load();
    if (autoplay) video.play();
    currentVideoIndex = index;

    // Update active state
    const items = playlist.querySelectorAll('li');
    items.forEach((li, i) => li.classList.toggle('active', i === index));

    preloadNextVideo();
}

function preloadNextVideo() {
    if (preloading) return;
    preloading = true;

    let nextIndex = (currentVideoIndex + 1) % videoList.length;
    if (nextVideo) nextVideo.remove();

    nextVideo = document.createElement('video');
    nextVideo.src = videoList[nextIndex].src;
    nextVideo.preload = 'auto';
    nextVideo.muted = true;
    nextVideo.style.display = 'none';
    nextVideo.addEventListener('loadeddata', () => preloading = false);
    document.body.appendChild(nextVideo);
}

function playNextVideo() {
    if (nextVideo) {
        video.src = nextVideo.src;
        video.load();
        video.play();
        nextVideo.remove();
        nextVideo = null;
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;

        const items = playlist.querySelectorAll('li');
        items.forEach((li, i) => li.classList.toggle('active', i === currentVideoIndex));

        preloadNextVideo();
    }
}

function maybePreloadNext() {
    if (video.duration - video.currentTime < 3 && !nextVideo && !preloading) {
        preloadNextVideo();
    }
}

// Expose initializer
window.initPlaylist = initPlaylist;
