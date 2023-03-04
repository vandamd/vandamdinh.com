let dots = 0;

function updateLoadingText() {
    const loadingText = document.getElementById('now-playing');
    dots = (dots + 1) % 4; // cycle through dots
    loadingText.innerHTML = `
    <div class="placeholder"><img class="album-art" src="/continuum.jpg"></img></div>
    <div class="now-playing-text">
        <p class="track">Loading Track${'.'.repeat(dots)}</p>
        <p class="artist">Probably Continuum - John Mayer</p>
    </div>
    `;
}

// update the loading text every 500 milliseconds
const intervalId = setInterval(updateLoadingText, 500);

const apiKey = 'e0359fa55e2ec8f912a81467e43bd946';
const user = 'vandamd';
const limit = 1;
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&limit=${limit}&format=json`;

// Set an interval to make the request to the Last.fm API every 5 seconds
setInterval(() => {

let now = new Date();
// Make the request to the Last.fm API
fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
    // Get the now playing track
    const track = data.recenttracks.track[0];
    const art = data.recenttracks.track[0].image[3]['#text'];
    const album = data.recenttracks.track[0].album['#text'];

    if (track['@attr'] && track['@attr'].nowplaying === 'true') {
        // Update the page with the artist and song name
        document.getElementById('now-playing').innerHTML = `
        <a href="${track.url}" target="_blank" class="track-link"></a>
        <div class="placeholder"><img src="${art}" alt="${album}" class="album-art"></div>
        <div class="now-playing-text">
            <p class="track">${track.name}</p>
            <p class="artist">${track.album['#text']} - ${track.artist['#text']}</p>
            <p class="indicator"><span class="magic-text">Now Playing</span></p>
        </div>
        `;
    } else {
        const trackDate = new Date(track.date['#text']);
        const elapsed = now - trackDate; 

        // Calculate the elapsed time in minutes
        const elapsedMinutes = Math.floor(elapsed / 1000 / 60);

        let formattedDate;
        if (elapsedMinutes < 60) {
        formattedDate = `${elapsedMinutes} minutes ago`;
        }
        else if (elapsedMinutes < 120) {
        // Calculate the elapsed time in hours
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        formattedDate = `${elapsedHours} hour ago`;
        } 
        else if (elapsedMinutes < 1440) {
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        formattedDate = `${elapsedHours} hours ago`;
        } 
        else {
        // Use the original date in YYYY-MM-DD HH:MM format
        formattedDate = trackDate.toISOString().slice(0, 10) + ", " + trackDate.toISOString().slice(11, 16);
        }

        // Show the latest track that was played
        document.getElementById('now-playing').innerHTML = `
        <a href="${track.url}" target="_blank" class="track-link"></a>
        <div class="placeholder"><img src="${art}" alt="${album}" class="album-art"></div>
        <div class="now-playing-text">
            <p class="track">${track.name}</p>
            <p class="artist">${track.album['#text']} - ${track.artist['#text']}</p>
            <p class="indicator">${formattedDate}</p>
        </div>
        `;
    }

    // Stop loading text
    clearInterval(intervalId);

    });
}, 10000); // Interval in milliseconds

// If click card, open link
const card = document.querySelector(".card")
card.addEventListener("click", function() {
    window.open(card.querySelector(".track-link").href);
}
);