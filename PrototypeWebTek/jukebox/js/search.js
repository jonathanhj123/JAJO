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

function filterSongs(query) {
  // TODO: return a filtered array from SONGS where
  // song.title or song.artist contains the query string (case-insensitive)
  // If query is empty, return all SONGS
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

document.addEventListener("DOMContentLoaded", function () {
  loadCart();
  updateCartBadge();
  renderResults(SONGS);

  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      // TODO: call filterSongs with this.value, then pass result to renderResults
    });
});
