// ─── Color palette ────────────────────────────────────────────────────────────

const COLORS = [
  "linear-gradient(135deg, #2d1b33, #4a1942, #6b2d6b)",
  "linear-gradient(135deg, #0e1a2a, #1b3a5c, #1e5080)",
  "linear-gradient(135deg, #1a2a1a, #1e3a2f, #0d4f3c)",
  "linear-gradient(135deg, #2a0e0e, #4a1c1c, #6b2020)",
  "linear-gradient(135deg, #2a1a0e, #3d2b1f, #5c3d1e)",
  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(135deg, #0e1f0e, #1c3d1c, #246b24)",
  "linear-gradient(135deg, #1a1a1a, #2d2d2d, #404040)",
];

// Picks a color for a song based on its position in the list.
// When we run out of colors we start over from the beginning.
function getColor(index) {
  const colorIndex = index % COLORS.length;
  return COLORS[colorIndex];
}

// ─── Song catalog ─────────────────────────────────────────────────────────────
// Filled by buildSongs() — do not add songs here directly.
// Add songs to the CSV files and re-run: npm run create-db

const SONGS = [];

// ─── Playback state ───────────────────────────────────────────────────────────

let nowPlaying = null;
let queue = [];

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PRICE_SINGLE = 2;
const PRICE_BUNDLE = 5;
const CART_MAX = 3;

// ─── Cart state ───────────────────────────────────────────────────────────────

let cart = [];

// ─── Data loader ─────────────────────────────────────────────────────────────
// async/await means: "wait for the server to respond before moving on".
// await fetch() sends a request to the server and waits for the answer.
// await response.json() reads the answer and turns it into a JS array.

async function buildSongs() {
  const response = await fetch("/api/songs");
  const rows = await response.json();

  // Empty the array before filling it with fresh data from the server
  SONGS.length = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    SONGS.push({
      id:     row.song_id,
      title:  row.title,
      artist: row.artist,
      color:  getColor(i),
    });
  }

  nowPlaying = SONGS[0];

  // Fill the queue with songs 2 to 8 (skip the first one — that's now playing)
  queue = [];
  for (let i = 1; i < 8; i++) {
    if (SONGS[i]) {
      queue.push(SONGS[i]);
    }
  }
}

// ─── Cart helpers ─────────────────────────────────────────────────────────────

function loadCart() {
  // localStorage saves data in the browser so it survives page navigation.
  // getItem reads a saved value by name — returns null if nothing is saved yet.
  const stored = localStorage.getItem("jukebox_cart");
  if (stored) {
    // JSON.parse turns a text string back into a JavaScript array
    cart = JSON.parse(stored);
  }
}

function saveCart() {
  // JSON.stringify turns the cart array into a text string so it can be saved
  localStorage.setItem("jukebox_cart", JSON.stringify(cart));
}

function getSongById(songId) {
  return SONGS.find(function (song) { return song.id === songId; }) || null;
}

function isSongInCart(songId) {
  return cart.find(function (song) { return song.id === songId; }) !== undefined;
}

function addToCart(songId) {
  if (cart.length >= CART_MAX) return false;
  if (isSongInCart(songId)) return false;

  const song = getSongById(songId);
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
  if (cart.length === 3) {
    return PRICE_BUNDLE;
  }
  return cart.length * PRICE_SINGLE;
}
