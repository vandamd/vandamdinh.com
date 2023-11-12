const apiKey = 'e0359fa55e2ec8f912a81467e43bd946';
const user = 'vandamd';
const limit = 1;
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&limit=${limit}&format=json`;
    
// Make the request to the Last.fm API
fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
    // Get the now playing track
    const track = data.recenttracks.track[0];
    const art = data.recenttracks.track[0].image[3]['#text'];
    const album = data.recenttracks.track[0].album['#text'];
    
    // Update the page with the artist and song name
    setTimeout(function() {
        document.getElementById('now-playing').innerHTML = `
        <a href="${track.url}" target="_blank"><img loading="lazy" src="${art}" alt="${album}" class="album-art"></a>`;
    }, 1000);
});