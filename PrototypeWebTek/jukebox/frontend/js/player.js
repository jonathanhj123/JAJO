// player.js — controls the Now Playing screen (index.html)

function renderNowPlaying() {
  // TODO: update the now-playing section with the current nowPlaying song
  // Elements to update:
  //   #now-playing-art    → set style.background to nowPlaying.color
  //   #now-playing-title  → set textContent to nowPlaying.title
  //   #now-playing-artist → set textContent to nowPlaying.artist

  // set nowPlayingArt to "now-playing-art", from index.html
  const nowPlayingArt = document.getElementById("now-playing-art");
  // set nowPlayingtitle to "now-playing-title", from index.html
  const nowPlayeringTitle = document.getElementById("now-playing-title");
  // set nowPlayingArtist to "now-playing-artist", from index.html
  const nowPlayingArtist = document.getElementById("now-playing-artist");

  // set nowPlayingArt style to nowPlaying.color
  nowPlayingArt.innerHTML = `linear-gradient(135deg, ${nowPlaying.color}, #1a1a1a)`;
  // set nowPlayingTitle text to nowPlaying.tilte
  nowPlayingTitle.innerHTML = nowPlaying.title;
  // set nowPlayingArtist text to nowPlaying.Artist
  nowPlayingArtist.innerHTML = nowPlaying.artist;
}

function renderQueue() {
  // TODO: clear #queue-list and re-render it from the queue array
  // For each song in queue, create an <li> with:
  //   - position number (index + 1)
  //   - album art div with song.color as background
  //   - song title and artist
  // Hint: use document.createElement and appendChild, or build innerHTML

  // setting queueList to the element "queue-list"
  const queueList = document.getElementById("queue-list");
  
  //Clearing out any of stuff
  queueList.innerHTML = "";


  // A foorEach-loop, which adds the queue into the HTML (The factory line)
  queue.forEach((song, index) =>{

    // Create an empty element
    const li = document.createElement("li");

    // Styling the new empty element
    li.className = "flex items-center gap-3 p-3 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors";

    // Calculate the number of each song in the queue
    const position = index + 1;

    // Building the new elements content (HTML)
    li.innerHTML = `
      <span class="text-xs text-zinc-500 w-4 font-mono">${position}</span>
      <div class="w-10 h-10 rounded-lg shrink-0" style="background: ${song.color}"></div>
      <div class="flex-1 min-w-0">
        <div class="font-medium truncate text-sm">${song.title}</div>
        <div class="text-xs text-zinc-400 truncate">${song.artist}</div>
      </div>
    `;

    // Our finished element gets attached tot he <ul> container in the index.html
    // This makes our element visible for the user
    queueList.appendChild(li);

  })

}

// ─── Entry point ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async function () {

  // wait for the songs to be fetched
  await buildSongs();

  // When the data is ready, we render the UI
  renderNowPlaying();
  renderQueue();

});
