// player.js — controls the Now Playing screen (index.html)

function renderNowPlaying() {
  // TODO: update the now-playing section with the current nowPlaying song
  // Elements to update:
  //   #now-playing-art    → set style.background to nowPlaying.color
  //   #now-playing-title  → set textContent to nowPlaying.title
  //   #now-playing-artist → set textContent to nowPlaying.artist
}

function renderQueue() {
  // TODO: clear #queue-list and re-render it from the queue array
  // For each song in queue, create an <li> with:
  //   - position number (index + 1)
  //   - album art div with song.color as background
  //   - song title and artist
  // Hint: use document.createElement and appendChild, or build innerHTML
}

function updateProgress(percent) {
  // TODO: set the width of #progress-fill to percent + "%"
  // percent is a number between 0 and 100
}

function updateProgressTime(currentTime, totalTime) {
  // TODO: update #progress-current and #progress-total text content
  // currentTime and totalTime are strings like "1:24"
}

// ─── Entry point ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  buildSongs();
  loadCart();
  renderNowPlaying();
  renderQueue();

  // TODO: start a progress bar timer using setInterval to simulate playback
  // Hint: increment a counter every second, calculate percent, call updateProgress
});
