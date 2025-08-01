const video = document.getElementById('main-video');
const playlist = document.getElementById('playlist');
const prevButton = document.getElementById('prev-video');
const nextButton = document.getElementById('next-video');

const videos = [
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_01.mp4', title: '1. Beans On Toast - Things' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_02.mp4', title: '2. Ruarri Joseph - Hope for Grey Trousers' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_03.mp4', title: '3. The Charlatans - The Blind Stagger' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_04.mp4', title: '4. Gang of Youths - Magnolia' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_05.mp4', title: '5. Catfish and the Bottlemen - 7' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_06.mp4', title: '6. The Voidz - Alien Crime Lord' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_07.mp4', title: '7. John Lord Fonda - So Far Away' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_08.mp4', title: '8. Sir Sly - High' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_09.mp4', title: '9. KONGOS - Autocorrect' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_10.mp4', title: '10. renforshort - feel good inc.' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_11.mp4', title: '11. hard life - BEESWAX' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_12.mp4', title: '12. The Streets - Lets Push Things Forward' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_13.mp4', title: '13. Flobots - Defend Atlantis' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_14.mp4', title: '14. Silversun Pickups - Growing Old Is Getting Old' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_15.mp4', title: '15. The Stills - Yesterday Never Tomorrows' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_16.mp4', title: '16. Palomar - Our Haunt' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_17.mp4', title: '17. Sunny Day Real Estate - Television' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_18.mp4', title: '18. The Avalanches - Oh The Sunn!' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_19.mp4', title: '19. The Constellations - We are Here to Save The Day' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_20.mp4', title: '20. Grandaddy - Now Its On' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_21.mp4', title: '21. The Spinto Band - Japan Is an Island' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_22.mp4', title: '22. Enon - Disposable Parts' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_23.mp4', title: '23. Buzzcocks - Ever Fallen in Love' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_24.mp4', title: '24. TV On The Radio - Dirtywhirl' },
    { src: 'https://pooveyfarmsracingtv.com/2023_Mix_Tape_Chapter_25.mp4', title: '25. Twenty One Pilots - Heathens' },
    // ... more videos
];

let currentVideoIndex = 0;
let nextVideo = null;
let preloading = false;

function loadVideo(index, autoplay = true) {
    if (index >= 0 && index < videos.length) {
        video.src = videos[index].src;
        video.load();
        if (autoplay) video.play();
        currentVideoIndex = index;

        const listItems = playlist.querySelectorAll('li');
        listItems.forEach((li, i) => {
            li.classList.toggle('active', i === index);
        });

        if (!preloading) {
            preloadNextVideo();
        }
    } else if (index >= videos.length) {
        loadVideo(0);
    } else if (index < 0) {
        loadVideo(videos.length - 1);
    }
}

function preloadNextVideo() {
    if (preloading) return;

    preloading = true;
    let nextIndex = (currentVideoIndex + 1) % videos.length;
    if (nextVideo) {
        nextVideo.remove();
    }
    nextVideo = document.createElement('video');
    nextVideo.src = videos[nextIndex].src;
    nextVideo.preload = 'auto';
    nextVideo.muted = true;
    nextVideo.style.display = 'none';
    nextVideo.addEventListener('loadeddata', () => {
        preloading = false;
    });
    document.body.appendChild(nextVideo);
}

videos.forEach((vid, index) => {
    const li = document.createElement('li');
    li.textContent = vid.title;
    li.addEventListener('click', () => loadVideo(index));
    playlist.appendChild(li);
});

loadVideo(0);

prevButton.addEventListener('click', () => loadVideo(currentVideoIndex - 1));
nextButton.addEventListener('click', () => loadVideo(currentVideoIndex + 1));

video.addEventListener('ended', () => {
    if (nextVideo) {
        video.src = nextVideo.src;
        video.load();
        video.play();
        nextVideo.remove();
        nextVideo = null;
        preloadNextVideo(); // Preload the NEXT after playing
    }
});

video.addEventListener('timeupdate', () => {
    if (video.duration - video.currentTime < 3 && !nextVideo && !preloading) {
        preloadNextVideo();
    }
});
