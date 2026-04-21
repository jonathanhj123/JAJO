// search.js — controls the Search screen (search.html)

// Returns the HTML for the Add button on each song row.
// The button is greyed out and disabled when the song is already in the cart
// or when the cart is full.
function buildButtonHTML(songId, inCart, cartFull) {
  let label = "Add";
  if (inCart) {
    label = "Added";
  } else if (cartFull) {
    label = "Cart full";
  }

  let style = "border-white text-white";
  if (inCart || cartFull) {
    style = "border-zinc-700 text-zinc-600 cursor-not-allowed";
  }

  let disabledAttr = "";
  if (inCart || cartFull) {
    disabledAttr = "disabled ";
  }

  return (
    "<button " +
    'data-song-id="' +
    songId +
    '" ' +
    disabledAttr +
    'class="shrink-0 h-[34px] px-3.5 rounded-full border text-[13px] font-semibold ' +
    style +
    '">' +
    label +
    "</button>"
  );
}

// Creates and returns one <li> row for a song.
// Attaches a click handler to the Add button if the song can still be added.
function buildSongListItem(song) {
  const li = document.createElement("li");
  li.className =
    "flex items-center gap-3 px-5 py-2.5 border-b border-zinc-800 min-h-[68px]";

  const inCart = isSongInCart(song.id);
  const cartFull = cart.length >= CART_MAX;

  li.innerHTML =
    '<div class="w-12 h-12 rounded-md shrink-0" style="background:' +
    song.color +
    '"></div>' +
    '<div class="flex-1 min-w-0">' +
    '<p class="text-[15px] font-medium truncate">' +
    song.title +
    "</p>" +
    '<p class="text-[13px] text-zinc-500 mt-0.5 truncate">' +
    song.artist +
    "</p>" +
    "</div>" +
    buildButtonHTML(song.id, inCart, cartFull);

  if (!inCart && !cartFull) {
    li.querySelector("button").addEventListener("click", function () {
      handleAddToCart(song.id);
    });
  }

  return li;
}

// Clears the results list and fills it with a new set of songs.
function renderResults(songsToShow) {
  const list = document.getElementById("results-list");
  list.innerHTML = "";

  for (let i = 0; i < songsToShow.length; i++) {
    list.appendChild(buildSongListItem(songsToShow[i]));
  }
}

// Fetches songs from the server and converts them into display objects.
// Passing an empty string returns all songs.
async function filterSongs(query) {
  const response = await fetch("/api/songs/search/" + query);
  const rows = await response.json();

  const results = [];
  for (let i = 0; i < rows.length; i++) {
    results.push({
      id: rows[i].song_id,
      title: rows[i].title,
      artist: rows[i].artist,
      color: getColor(i),
    });
  }

  return results;
}

// Updates the number shown on the cart badge in the header.
// The badge is hidden when the cart is empty.
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  badge.textContent = cart.length;

  if (cart.length === 0) {
    badge.classList.add("hidden");
  } else {
    badge.classList.remove("hidden");
  }
}

// Adds a song to the cart, then refreshes the badge and the song list.
async function handleAddToCart(songId) {
  addToCart(songId);
  updateCartBadge();

  const query = document.getElementById("search-input").value;
  const results = await filterSongs(query);
  renderResults(results);
}

// ─── This is where the magic happens ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async function () {
  await buildSongs();
  loadCart();
  updateCartBadge();

  const results = await filterSongs("");
  renderResults(results);

  document
    .getElementById("search-input")
    .addEventListener("input", async function () {
      const results = await filterSongs(this.value);
      renderResults(results);
    });
});
