// search.js — controls the Search screen (search.html)

function renderResults(songsToShow) {
    const list = document.getElementById("results-list");
    list.innerHTML = "";

    songsToShow.forEach(function (song) {
      const li = document.createElement("li");
      li.className =
        "flex items-center gap-3 px-5 py-2.5 border-b border-zinc-800 min-h-[68px]";

      const inCart = isSongInCart(song.id);
      const cartFull = isCartFull();
      const full = inCart || cartFull;

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
        "<button " +
        'data-song-id="' +
        song.id +
        '" ' +
        (full ? "disabled " : "") +
        'class="shrink-0 h-[34px] px-3.5 rounded-full border text-[13px] font-semibold ' +
        (full
          ? "border-zinc-700 text-zinc-600 cursor-not-allowed"
          : "border-white text-white") +
        '">' +
        (inCart ? "Added" : cartFull ? "Cart full" : "Add") +
        "</button>";

      if (!full) {
        li.querySelector("button").addEventListener("click", function () {
          handleAddToCart(song.id);
        });
      }

      list.appendChild(li);
    });
  }

async function filterSongs(query) {
  const response = await fetch("/api/songs/search?q=" + query);
  const rows = await response.json();

  const results = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    results.push({
      id: row.song_id,
      title: row.title,
      artist: row.artist,
      color: getColor(i),
    });
  }
  return results;
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  badge.textContent = cart.length;
  if (cart.length === 0) {
    badge.classList.add("hidden");
  } else {
    badge.classList.remove("hidden");
  }
}

function handleAddToCart(songId) {
  addToCart(songId);
  updateCartBadge();
  filterSongs(document.getElementById("search-input").value).then(
    renderResults,
  );
}

// ─── Entry point ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async function () {
  await buildSongs();
  console.log("SONGS after build:", SONGS);
  loadCart();
  updateCartBadge();
  const results = await filterSongs(""); // ← fetch all songs via the API
  renderResults(results);

  document
    .getElementById("search-input")
    .addEventListener("input", async function () {
      const results = await filterSongs(this.value);
      renderResults(results);
    });
});
