// ─── Raw data tables ──────────────────────────────────────────────────────────
// These three arrays mirror the CSV files and the ER diagram.
// To add a song: add a row to SONGS_TABLE, a row to ARTIST_TABLE if needed,
// and one or more rows to SONG_ARTIST_TABLE.

const ARTIST_TABLE = [
  { artist_id: 1,  name: "The Weeknd"            },
  { artist_id: 2,  name: "Harry Styles"           },
  { artist_id: 3,  name: "The Kid LAROI"          },
  { artist_id: 4,  name: "Justin Bieber"          },
  { artist_id: 5,  name: "Billie Eilish"          },
  { artist_id: 6,  name: "Lil Nas X"              },
  { artist_id: 7,  name: "Jack Harlow"            },
  { artist_id: 8,  name: "Dua Lipa"               },
  { artist_id: 9,  name: "Olivia Rodrigo"         },
  { artist_id: 10, name: "Glass Animals"          },
  { artist_id: 11, name: "BTS"                    },
];

const SONGS_TABLE = [
  { song_id: 1,  artist_id: 1,  title: "Blinding Lights",   duration: "4:02" },
  { song_id: 2,  artist_id: 2,  title: "As It Was",          duration: "2:37" },
  { song_id: 3,  artist_id: 3,  title: "Stay",               duration: "2:21" },
  { song_id: 4,  artist_id: 5,  title: "Bad Guy",            duration: "3:14" },
  { song_id: 5,  artist_id: 6,  title: "Industry Baby",      duration: "3:32" },
  { song_id: 6,  artist_id: 8,  title: "Levitating",         duration: "3:23" },
  { song_id: 7,  artist_id: 6,  title: "Montero",            duration: "2:17" },
  { song_id: 8,  artist_id: 9,  title: "good 4 u",           duration: "2:58" },
  { song_id: 9,  artist_id: 1,  title: "Starboy",            duration: "3:51" },
  { song_id: 10, artist_id: 10, title: "Heat Waves",         duration: "3:59" },
  { song_id: 11, artist_id: 2,  title: "Watermelon Sugar",   duration: "2:54" },
  { song_id: 12, artist_id: 5,  title: "Happier Than Ever",  duration: "4:58" },
  { song_id: 13, artist_id: 4,  title: "Peaches",            duration: "3:18" },
  { song_id: 14, artist_id: 1,  title: "Save Your Tears",    duration: "3:35" },
  { song_id: 15, artist_id: 9,  title: "Drivers License",    duration: "4:02" },
  { song_id: 16, artist_id: 11, title: "Butter",             duration: "2:44" },
];

// Junction table — one row per song/artist link.
// Songs with multiple artists (collabs) have more than one row here.
const SONG_ARTIST_TABLE = [
  { artist_id: 1,  song_id: 1  },
  { artist_id: 2,  song_id: 2  },
  { artist_id: 3,  song_id: 3  },
  { artist_id: 4,  song_id: 3  }, // Stay: The Kid LAROI + Justin Bieber
  { artist_id: 5,  song_id: 4  },
  { artist_id: 6,  song_id: 5  },
  { artist_id: 7,  song_id: 5  }, // Industry Baby: Lil Nas X + Jack Harlow
  { artist_id: 8,  song_id: 6  },
  { artist_id: 6,  song_id: 7  },
  { artist_id: 9,  song_id: 8  },
  { artist_id: 1,  song_id: 9  },
  { artist_id: 10, song_id: 10 },
  { artist_id: 2,  song_id: 11 },
  { artist_id: 5,  song_id: 12 },
  { artist_id: 4,  song_id: 13 },
  { artist_id: 1,  song_id: 14 },
  { artist_id: 9,  song_id: 15 },
  { artist_id: 11, song_id: 16 },
];

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

const SONGS = [];

// ─── Playback state ───────────────────────────────────────────────────────────

let nowPlaying = null;
let queue = [];

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PRICE_SINGLE = 2;   // kr per song (1 or 2 songs)
const PRICE_BUNDLE = 5;   // kr for 3 songs
const CART_MAX = 3;

// ─── Cart state ───────────────────────────────────────────────────────────────

let cart = [];

// ─── Table join ───────────────────────────────────────────────────────────────
// Reads the three raw tables, joins them, and fills the SONGS array.
// Called once at the top of each page's DOMContentLoaded.

function buildSongs() {
  SONGS.length = 0;

  for (let i = 0; i < SONGS_TABLE.length; i++) {
    const row = SONGS_TABLE[i];

    // Collect all artist names linked to this song via SONG_ARTIST_TABLE
    const artistNames = [];

    for (let j = 0; j < SONG_ARTIST_TABLE.length; j++) {
      if (SONG_ARTIST_TABLE[j].song_id === row.song_id) {
        const linkedArtistId = SONG_ARTIST_TABLE[j].artist_id;

        for (let k = 0; k < ARTIST_TABLE.length; k++) {
          if (ARTIST_TABLE[k].artist_id === linkedArtistId) {
            artistNames.push(ARTIST_TABLE[k].name);
            break;
          }
        }
      }
    }

    SONGS.push({
      id:       row.song_id,
      title:    row.title,
      artist:   artistNames.join(", "),
      duration: row.duration,
      color:    COLORS[(row.song_id - 1) % COLORS.length],
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
    if (SONGS[i].id === songId) {
      return SONGS[i];
    }
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
    if (cart[i].id !== songId) {
      updated.push(cart[i]);
    }
  }
  cart = updated;
  saveCart();
}

function getCartTotal() {
  if (cart.length === 3) return PRICE_BUNDLE;
  return cart.length * PRICE_SINGLE;
}
