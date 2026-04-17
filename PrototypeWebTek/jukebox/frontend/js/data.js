// ─── Color palette ────────────────────────────────────────────────────────────
// Assigned to songs by cycling through this list based on song_id.

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
// The keyword 'await' pauses the function until the data arrives —
// everything after it runs only once the response is ready.

async function buildSongs() {
  const response = await fetch("/api/songs");
  const rows = await response.json();

  SONGS.length = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    SONGS.push({
      id:     row.song_id,
      title:  row.title,
      artist: row.artist,
      color:  COLORS[(row.song_id - 1) % COLORS.length],
    });
  }

  nowPlaying = SONGS[0];
  queue = SONGS.slice(1, 8);
}

// ─── Cart helpers ─────────────────────────────────────────────────────────────

function loadCart() {
  const stored = localStorage.getItem("jukebox_cart");
  if (stored) {
    cart = JSON.parse(stored);
  }
}

function saveCart() {
  localStorage.setItem("jukebox_cart", JSON.stringify(cart));
}

function getSongById(songId) {
  for (let i = 0; i < SONGS.length; i++) {
    if (SONGS[i].id === songId) return SONGS[i];
  }
  return null;
}

function isCartFull() {
  return cart.length >= CART_MAX;
}

function isSongInCart(songId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === songId) return true;
  }
  return false;
}

function addToCart(songId) {
  if (isCartFull()) return false;
  if (isSongInCart(songId)) return false;

  const song = getSongById(songId);
  if (!song) return false;

  cart.push(song);
  saveCart();
  return true;
}

function removeFromCart(songId) {
  const updated = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== songId) updated.push(cart[i]);
  }
  cart = updated;
  saveCart();
}

function getCartTotal() {
  if (cart.length === 3) return PRICE_BUNDLE;
  return cart.length * PRICE_SINGLE;
}
