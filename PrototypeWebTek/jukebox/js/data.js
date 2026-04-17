// ─── Color palette ────────────────────────────────────────────────────────────
// Assigned to songs by cycling through this list based on song_id.
// Add more gradients here if you add more songs.

var COLORS = [
  "linear-gradient(135deg, #2d1b33, #4a1942, #6b2d6b)",
  "linear-gradient(135deg, #0e1a2a, #1b3a5c, #1e5080)",
  "linear-gradient(135deg, #1a2a1a, #1e3a2f, #0d4f3c)",
  "linear-gradient(135deg, #2a0e0e, #4a1c1c, #6b2020)",
  "linear-gradient(135deg, #2a1a0e, #3d2b1f, #5c3d1e)",
  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(135deg, #0e1f0e, #1c3d1c, #246b24)",
  "linear-gradient(135deg, #1a1a1a, #2d2d2d, #404040)",
];

// ─── Song catalog ─────────────────────────────────────────────────────────────
// Populated by initData() — do not add songs here manually.
// Edit data/songs.csv, data/artist.csv, and data/song_artist.csv instead.

var SONGS = [];

// ─── Playback state ───────────────────────────────────────────────────────────

var nowPlaying = null;
var queue = [];

// ─── Pricing ──────────────────────────────────────────────────────────────────

var PRICE_SINGLE = 2;   // kr per song (1 or 2 songs)
var PRICE_BUNDLE  = 5;  // kr for 3 songs
var CART_MAX      = 3;

// ─── Cart state ───────────────────────────────────────────────────────────────
// Persisted in localStorage so it survives page navigation.

var cart = [];

function loadCart() {
  var stored = localStorage.getItem("jukebox_cart");
  if (stored) {
    cart = JSON.parse(stored);
  }
}

function saveCart() {
  localStorage.setItem("jukebox_cart", JSON.stringify(cart));
}

function getSongById(songId) {
  return SONGS.find(function (song) { return song.id === songId; });
}

function isCartFull() {
  return cart.length >= CART_MAX;
}

function isSongInCart(songId) {
  return cart.some(function (song) { return song.id === songId; });
}

function addToCart(songId) {
  if (isCartFull()) return false;
  if (isSongInCart(songId)) return false;
  var song = getSongById(songId);
  if (!song) return false;
  cart.push(song);
  saveCart();
  return true;
}

function removeFromCart(songId) {
  cart = cart.filter(function (song) { return song.id !== songId; });
  saveCart();
}

function getCartTotal() {
  if (cart.length === 3) return PRICE_BUNDLE;
  return cart.length * PRICE_SINGLE;
}

// ─── CSV parser ───────────────────────────────────────────────────────────────
// Splits a CSV string into an array of plain objects.
// Each object key is a column header, value is the cell value (always a string).

function parseCSV(text) {
  var lines = text.trim().split("\n");
  var headers = lines[0].split(",").map(function (h) { return h.trim(); });

  return lines.slice(1).map(function (line) {
    var values = line.split(",").map(function (v) { return v.trim(); });
    var obj = {};
    headers.forEach(function (header, i) {
      obj[header] = values[i] !== undefined ? values[i] : "";
    });
    return obj;
  });
}

// ─── Data loader ─────────────────────────────────────────────────────────────
// Fetches the three CSV files, parses them, joins the tables, and fills SONGS.
// Returns a Promise — call .then() to run code after data is ready.
//
// Join logic:
//   For each song row, look up all rows in song_artist where song_id matches.
//   Use those artist_ids to find artist names, then join them with ", ".
//   This handles solo songs (one row in song_artist) and collabs (multiple rows).

function initData() {
  return Promise.all([
    fetch("data/artist.csv").then(function (r) { return r.text(); }),
    fetch("data/songs.csv").then(function (r) { return r.text(); }),
    fetch("data/song_artist.csv").then(function (r) { return r.text(); }),
  ]).then(function (results) {
    var artists    = parseCSV(results[0]);
    var songsRaw   = parseCSV(results[1]);
    var songArtists = parseCSV(results[2]);

    // Clear and rebuild SONGS from the CSV data
    SONGS.length = 0;

    songsRaw.forEach(function (row) {
      var songId = parseInt(row.song_id);

      // Find all artist_ids linked to this song via song_artist
      var linkedArtistIds = songArtists
        .filter(function (sa) { return parseInt(sa.song_id) === songId; })
        .map(function (sa) { return parseInt(sa.artist_id); });

      // Look up each artist name
      var artistNames = linkedArtistIds.map(function (id) {
        var match = artists.find(function (a) { return parseInt(a.artist_id) === id; });
        return match ? match.name : "";
      }).filter(function (name) { return name !== ""; });

      SONGS.push({
        id:       songId,
        title:    row.title,
        artist:   artistNames.join(", "),
        duration: row.duration,
        color:    COLORS[(songId - 1) % COLORS.length],
      });
    });

    // Set initial playback state once data is loaded
    nowPlaying = SONGS[0];
    queue      = SONGS.slice(1, 8);
  });
}
