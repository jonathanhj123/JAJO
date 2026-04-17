// search.js — controls the Search screen (search.html)

function renderResults(songsToShow) {
  // TODO: clear #results-list and render one <li> per song in songsToShow
  // Each row should contain:
  //   - album art div (song.color as background)
  //   - song title and artist
  //   - an add button showing "2 kr"
  //     → if isCartFull() or isSongInCart(song.id): show "Full" and disable
  //     → otherwise: clicking it calls handleAddToCart(song.id)
  // Hint: give each add button a data-song-id attribute so you can identify it
}

async function filterSongs(query) {
  const response = await fetch("/api/songs/search?q=" + query);
  const rows = await response.json();

  const results = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    results.push({
      id:     row.song_id,
      title:  row.title,
      artist: row.artist,
      color:  getColor(i),
    });
  }
  return results;
}

function updateCartBadge() {
  // TODO: update the text content of #cart-badge to cart.length
  // If cart is empty, hide the badge (add a "hidden" class or set display none)
  // If cart has items, make sure the badge is visible
}

function handleAddToCart(songId) {
  // TODO: call addToCart(songId)
  // After adding: call updateCartBadge() and re-render results
  // so buttons update to "Full" when the cart is full
}

// ─── Entry point ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async function () {
  await buildSongs();
  loadCart();
  updateCartBadge();
  renderResults(SONGS);

  document.getElementById("search-input").addEventListener("input", async function () {
    const results = await filterSongs(this.value);
    renderResults(results);
  });
});
