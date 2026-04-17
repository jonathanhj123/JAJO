// ─── Song catalog ────────────────────────────────────────────────────────────
// Each song object represents one track available in the jukebox.
// Add or remove songs here to change what appears in search results.

const SONGS = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "4:02",
    color: "linear-gradient(135deg, #2d1b33, #4a1942, #6b2d6b)",
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    duration: "2:37",
    color: "linear-gradient(135deg, #0e1a2a, #1b3a5c, #1e5080)",
  },
  {
    id: 3,
    title: "Stay",
    artist: "The Kid LAROI, J. Bieber",
    duration: "2:21",
    color: "linear-gradient(135deg, #1a2a1a, #1e3a2f, #0d4f3c)",
  },
  {
    id: 4,
    title: "Bad Guy",
    artist: "Billie Eilish",
    duration: "3:14",
    color: "linear-gradient(135deg, #2a0e0e, #4a1c1c, #6b2020)",
  },
  {
    id: 5,
    title: "Industry Baby",
    artist: "Lil Nas X, Jack Harlow",
    duration: "3:32",
    color: "linear-gradient(135deg, #2a1a0e, #3d2b1f, #5c3d1e)",
  },
  {
    id: 6,
    title: "Levitating",
    artist: "Dua Lipa",
    duration: "3:23",
    color: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  },
  {
    id: 7,
    title: "Montero",
    artist: "Lil Nas X",
    duration: "2:17",
    color: "linear-gradient(135deg, #0e1f0e, #1c3d1c, #246b24)",
  },
  {
    id: 8,
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    duration: "2:58",
    color: "linear-gradient(135deg, #1a1a1a, #2d2d2d, #404040)",
  },
  {
    id: 9,
    title: "Starboy",
    artist: "The Weeknd",
    duration: "3:51",
    color: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  },
  {
    id: 10,
    title: "Heat Waves",
    artist: "Glass Animals",
    duration: "3:59",
    color: "linear-gradient(135deg, #1a2a1a, #1e3a2f, #0d4f3c)",
  },
  {
    id: 11,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    duration: "2:54",
    color: "linear-gradient(135deg, #0e1a2a, #1b3a5c, #1e5080)",
  },
  {
    id: 12,
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    duration: "4:58",
    color: "linear-gradient(135deg, #2d1b33, #4a1942, #6b2d6b)",
  },
  {
    id: 13,
    title: "Peaches",
    artist: "Justin Bieber",
    duration: "3:18",
    color: "linear-gradient(135deg, #2a1a0e, #3d2b1f, #5c3d1e)",
  },
  {
    id: 14,
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:35",
    color: "linear-gradient(135deg, #2d1b33, #4a1942, #6b2d6b)",
  },
  {
    id: 15,
    title: "Drivers License",
    artist: "Olivia Rodrigo",
    duration: "4:02",
    color: "linear-gradient(135deg, #0e1f0e, #1c3d1c, #246b24)",
  },
  {
    id: 16,
    title: "Butter",
    artist: "BTS",
    duration: "2:44",
    color: "linear-gradient(135deg, #1a1a1a, #2d2d2d, #404040)",
  },
];

// ─── Playback state ───────────────────────────────────────────────────────────
// nowPlaying: the song currently being played
// queue: ordered list of songs coming up next

let nowPlaying = SONGS[0];

let queue = [
  SONGS[1],
  SONGS[2],
  SONGS[3],
  SONGS[4],
  SONGS[5],
  SONGS[6],
  SONGS[7],
];

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PRICE_SINGLE = 2; // kr per song (1 or 2 songs)
const PRICE_BUNDLE = 5; // kr for 3 songs
const CART_MAX = 3;

// ─── Cart state ───────────────────────────────────────────────────────────────
// Cart is stored in localStorage so it persists when navigating between pages.
// cart is an array of song objects (max CART_MAX items).

let cart = [];

function loadCart() {
  // TODO: read cart from localStorage, parse JSON, assign to cart
  // Hint: use localStorage.getItem("jukebox_cart")
  // Remember to handle the case where nothing is stored yet (null)
}

function saveCart() {
  // TODO: write the current cart array to localStorage as JSON
  // Hint: use localStorage.setItem("jukebox_cart", JSON.stringify(cart))
}

function addToCart(songId) {
  // TODO: find the song by id in SONGS
  // Check cart is not already full (cart.length < CART_MAX)
  // Check song is not already in cart
  // Push song to cart, then call saveCart()
  // Return true if added, false if not
}

function removeFromCart(songId) {
  // TODO: filter cart to remove the song with matching id
  // Call saveCart() after
}

function isCartFull() {
  // TODO: return true if cart.length >= CART_MAX
}

function isSongInCart(songId) {
  // TODO: return true if a song with this id is already in cart
}

function getCartTotal() {
  // TODO: return price based on cart length
  // 1 song = PRICE_SINGLE, 2 songs = PRICE_SINGLE * 2, 3 songs = PRICE_BUNDLE
}

function getSongById(songId) {
  // TODO: find and return the song from SONGS where song.id === songId
}
