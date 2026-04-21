// player.js controls the Now Playing screen in index.html

function renderNowPlaying() {

  // set nowPlayingArt to "now-playing-art", from index.html
  const nowPlayingArt = document.getElementById("now-playing-art");
  // set nowPlayingtitle to "now-playing-title", from index.html
  const nowPlayeringTitle = document.getElementById("now-playing-title");
  // set nowPlayingArtist to "now-playing-artist", from index.html
  const nowPlayingArtist = document.getElementById("now-playing-artist");

  // set nowPlayingArt style to nowPlaying.color
  nowPlayingArt.style.background = nowPlaying.color;
  // set nowPlayingTitle text to nowPlaying.tilte
  nowPlayingTitle.innerHTML = nowPlaying.title;
  // set nowPlayingArtist text to nowPlaying.Artist
  nowPlayingArtist.innerHTML = nowPlaying.artist;

}


function renderQueue() {

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
  // running renderNowPlaying(); function
  renderNowPlaying();

  // running renderQueue(); function
  renderQueue();

});
