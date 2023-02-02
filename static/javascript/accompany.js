// JavaScript for Accompany
// Track/Album Search from last.fm

// Lyrics from lyrist
// https://github.com/asrvd/lyrist

// Last.fm API
const apiKey = 'e0359fa55e2ec8f912a81467e43bd946';
const urlsearch = 'https://ws.audioscrobbler.com/2.0/?method=album.search&album=';
const urltracks = 'https://ws.audioscrobbler.com/2.0/?method=album.getInfo&mbid=';
const urllyrics = 'https://lyrist.vercel.app/api/';
const urldeezersearch = 'https://api.deezer.com/search?q=';
const urldeezeralbum = 'https://www.deezer.com/album/';
const urlstream = 'https://api.song.link/v1-alpha.1/links?url=';
const corsProxy = 'https://cors-anywhere.herokuapp.com/';
// const corsProxy = '';

// Search Album Function
function searchAlbums(searchTerm) {
    // Make the search request to the Last.fm API
    const searchUrl = urlsearch + searchTerm + '&api_key=' + apiKey + '&format=json';
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            const albums = data.results.albummatches.album;

            // Clear any existing search results
            const results = document.getElementById('results');
            results.innerHTML = '';

            // Display the search results
            albums.forEach(album => {
                const albumElement = document.createElement('div');
                albumElement.classList.add('album-card');

                // Add the click event handler to each album element
                albumElement.addEventListener('click', () => {
                    // Navigate to the "/lyrics" page with the album information as query parameters
                    window.location.href = `/lyrics?albumName=${encodeURIComponent(album.name)}&artistName=${encodeURIComponent(album.artist)}&mbid=${album.mbid}`;
                });

                albumElement.innerHTML = `
                    <img class='album-cover' src="${album.image[3]["#text"]}" alt="${album.name} by ${album.artist}">
                    <h3>${album.name}
                    <br>${album.artist}</h3>
                `;
                results.appendChild(albumElement);
            });
        })
        .catch(error => console.log(error));
}


// Track List Function
function displayTracklist(albumName, artistName, mbid) {
    getStreamLinks(albumName, artistName).then(streamLinks => {

        // Make the request to the Last.fm API to get the tracklist
        const tracksUrl = urltracks + mbid + '&artist=' + artistName + '&album=' + albumName + '&api_key=' + apiKey + '&format=json';

        fetch(tracksUrl)
            .then(response => response.json())
            .then(data => {
                const tracklist = data.album.tracks.track;
                const albumImage = data.album.image[3]["#text"];

                // Wrap the tracklist in a container element
                const tracklistContainer = document.createElement('div');
                tracklistContainer.classList.add('tracklist-container');

                // Add the event listener to the container
                tracklistContainer.addEventListener('click', (event) => {
                    // Check if the target of the event is the album cover
                    if (event.target.matches('.album-cover, .fixed')) {
                        return;
                    }
                    tracklistContainer.classList.toggle('collapsed');
                });

                // Display the Album Name and Artist Name
                const albumInfoElement = document.createElement('div');
                albumInfoElement.classList.add('album-info');
                const albumNames = document.createElement('div');
                albumNames.classList.add('album-names');
                albumNames.innerHTML = `<h1 class='fixed'>${albumName}</h1> <h3 class='fixed'>${artistName}</h3>`;
                albumInfoElement.appendChild(albumNames);
                tracklistContainer.appendChild(albumInfoElement);
                
                // Make the album cover a link from getStreamLink function
                const albumCoverElement = document.createElement('a');
                albumCoverElement.classList.add('album-cover');
                albumCoverElement.href = streamLinks;
                albumCoverElement.target = '_blank';
                albumCoverElement.innerHTML = `<img class='album-cover' src="${albumImage}" alt="${albumName} by ${artistName}">`;
                albumCoverElement.classList.add('album-cover');

                const streamElement = document.createElement('div');
                streamElement.classList.add('overlay');
                streamElement.innerHTML = 'Stream';
                albumInfoElement.prepend(streamElement);
                albumInfoElement.prepend(albumCoverElement);

                // Display the tracklist
                const tracklistElement = document.createElement('ul');
                tracklist.forEach(track => {
                    const trackElement = document.createElement('li');
                    trackElement.classList.add('fixed');
                    trackElement.innerHTML = `${track.name}`;

                    // Add the event listener to the track element
                    trackElement.addEventListener('click', () => {
                        const selectedTrackElements = tracklistElement.querySelectorAll('.selected');
                        selectedTrackElements.forEach(selectedTrackElement => {
                            selectedTrackElement.classList.remove('selected');
                        });
                        trackElement.classList.add('selected');
                        displayLyrics(track.name, artistName);
                    });

                    tracklistElement.appendChild(trackElement);
                });
                tracklistContainer.appendChild(tracklistElement);

                // Make the first track selected and display lyrics
                const firstTrack = tracklistContainer.querySelector('li');
                firstTrack.classList.add('selected');
                displayLyrics(firstTrack.textContent, artistName);

                // Append the tracklist container to the page
                document.body.appendChild(tracklistContainer);
            })
            .catch(error => console.log(error));
    });
}


// Display Lyrics Function
let lastRequestTime = 0;
const cache = {};

function displayLyrics(trackName, artistName) {
    const currentTime = Date.now();

    if (currentTime - lastRequestTime < 5000) {
        setTimeout(() => {
            displayLyrics(trackName, artistName);
        }, 5000 - (currentTime - lastRequestTime));
        return;
    }

    lastRequestTime = currentTime;

    const cacheKey = trackName + '-' + artistName;
    if (cache[cacheKey]) {
        // Get the lyrics parent element
        const lyricsParent = document.querySelector('#lyrics-parent');
        lyricsParent.innerHTML = cache[cacheKey];
        return;
    }

    const lyricsUrl = corsProxy + urllyrics + trackName + '/' + artistName;

    fetch(lyricsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch lyrics with status code: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const lyrics = data.lyrics;
            const source = data.source;

            // Get the lyrics parent element
            const lyricsParent = document.querySelector('#lyrics-parent');

            const lyricsHtml = `<div class="lyrics-container">
                <h1>${trackName}</h1>
                <p>${lyrics.replace(/\n/g, '<br>')}</p>
                <p class="source">Lyrics provided by ${source}</p>
            </div>`;
            cache[cacheKey] = lyricsHtml;
            lyricsParent.innerHTML = lyricsHtml;
        })
        .catch(error => {
            console.error(error);
        });
}

async function getStreamLinks(albumName, artistName) {
    // Query urldeezersearch with albumName and artistName
    const response = await fetch(`${corsProxy}${urldeezersearch}${albumName} ${artistName}`);
    const data = await response.json();

    // Check if there is a matching album and artist
    let albumId;
    for (const item of data.data) {
        if (item.album.title === albumName && item.artist.name === artistName) {
            albumId = item.album.id;
            break;
        }
    }
    if (!albumId) {
        return null;
    }

    // Get the Deezer URL for the album
    const deezerUrl = `${urldeezeralbum}${albumId}`;

    // Get the Songlink page URL
    const response2 = await fetch(`${urlstream}${deezerUrl}`);
    const data2 = await response2.json();
    
    const pageUrl = data2.pageUrl;
    
    return pageUrl;



}
