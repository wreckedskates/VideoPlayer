const video = document.getElementById('main-video');
const playlist = document.getElementById('playlist');
const prevButton = document.getElementById('prev-video');
const nextButton = document.getElementById('next-video');

const videos = [
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_01.mp4', title: '1. Three Dog Night - Never Been To Spain' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_02.mp4', title: '2. Father John Mistry - Well, You Can Do It Without Me' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_03.mp4', title: '3. Sterophonics - Have a Nice Day' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_04.mp4', title: '4. Secret Machines - The Road Leads Where Its Lead' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_05.mp4', title: '5. Teleman - Fun Destruction' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_06.mp4', title: '6. Fight Like Apes - Crouching Bees' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_07.mp4', title: '7. Plastic Bertrand - Ca Plane Pour Moi' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_08.mp4', title: '8. The Coral - Dreaming of You' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_09.mp4', title: '9. Fugazi - Waiting Room' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_10.mp4', title: '10. Louis XIV - Guilt by Association' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_11.mp4', title: '11. The Faint - The Geeks Were Right' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_12.mp4', title: '12. K. Flay - Blood In The Cut' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_13.mp4', title: '13. Ra Ra Riot - Ghost Under Rocks' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_14.mp4', title: '14. Solillaquists of Sound - As If We Existed' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_15.mp4', title: '15. Toro y Moi - Hollywood' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_16.mp4', title: '16. The Weeknd - Starboy' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_17.mp4', title: '17. Buck 65 - Cold Steel Drum' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_18.mp4', title: '18. Au Revoir Simone - Shadows' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_19.mp4', title: '19. SOHN - The Wheel' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_20.mp4', title: '20. Duran Duran - Come Undone' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_21.mp4', title: '21. The Rural Alberta Advantage - Vulcan, AB' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_22.mp4', title: '22. Jonsi - Go Do' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_23.mp4', title: '23. Oakenfold - Starry Eyed Surprise' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_24.mp4', title: '24. Saint Motel - Move' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_25.mp4', title: '25. Major Lazer - Lean On' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_26.mp4', title: '26. Kevin Rudolf - Let It Rock' },
    { src: 'https://pooveyfarmsracingtv.com/2024_Mix_Tape_Chapter_27.mp4', title: '27. Kid Cudi - Up Up & Away' },
    // ... more videos
];

let currentVideoIndex = 0;

function loadVideo(index) {
    if (index >= 0 && index < videos.length) {
        video.src = videos[index].src;
        video.load(); // Important: Reload the video element
        video.play();
        currentVideoIndex = index;

        // Update active class in playlist
        const listItems = playlist.querySelectorAll('li');
        listItems.forEach((li, i) => {
            li.classList.toggle('active', i === index);
        });
    }
}

// Populate playlist
videos.forEach((vid, index) => {
    const li = document.createElement('li');
    li.textContent = vid.title;
    li.addEventListener('click', () => loadVideo(index));
    playlist.appendChild(li);
});

// Initial video load
loadVideo(0);

// Navigation buttons
prevButton.addEventListener('click', () => loadVideo(currentVideoIndex - 1));
nextButton.addEventListener('click', () => loadVideo(currentVideoIndex + 1));

// Autoplay next video
video.addEventListener('ended', () => {
    loadVideo(currentVideoIndex + 1);
});