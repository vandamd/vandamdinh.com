let dots = 0;

function updateLoadingText() {
    const loadingText = document.getElementById('now-playing');
    dots = (dots + 1) % 4; // cycle through dots
    loadingText.innerHTML = `Loading${'.'.repeat(dots)}`;
}

// update the loading text every 500 milliseconds
const intervalId = setInterval(updateLoadingText, 500);

const apiKey = 'e0359fa55e2ec8f912a81467e43bd946';
const user = 'vandamd';
const limit = 4;
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

    if (track['@attr'] && track['@attr'].nowplaying === 'true') {
        // Update the page with the artist and song name
        document.getElementById('now-playing').innerHTML = `

        <img src="now_playing_light.gif" style="width: 10px; height: 10px; "alt="Audio animation" id="dark-mode-on">
        <img src="now_playing_dark.gif" style="width: 10px; height: 10px; "alt="Audio animation" id="dark-mode-off">

        Listening now: ${track.name} - ${track.artist['#text']}`;
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
        document.getElementById('now-playing').innerHTML = `${formattedDate} - ${track.name} by ${track.artist['#text']}`;
    }

    // Stop loading text
    clearInterval(intervalId);

    });
}, 2000); // Interval in milliseconds