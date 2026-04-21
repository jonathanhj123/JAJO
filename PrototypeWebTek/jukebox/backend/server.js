import express from "express";
import { pool } from "../db/connect.js";

const db = pool();

const port = 3006;
const server = express();

server.use(express.static("frontend"));
server.use(onEachRequest);

server.get("/api/songs", getAllSongs);
server.get("/api/songs/search", searchSongs);

server.listen(port, onServerReady);

function onServerReady() {
  console.log("Jukebox server running on port", port);
}

function onEachRequest(request, response, next) {
  console.log(new Date(), request.method, request.url);
  next();
}

// GET /api/songs
// Returns all songs with their full artist string (joined from song_artist + artist)
async function getAllSongs(request, response) {
  const dbResult = await db.query(`
    with song_artists as (
      select sa.song_id, string_agg(a.name, ', ' order by a.artist_id) as artist
      from song_artist sa
      join artist a on a.artist_id = sa.artist_id
      group by sa.song_id
    )
    select s.song_id, s.title, sa.artist
    from songs s
    join song_artists sa on sa.song_id = s.song_id
    order by s.song_id
  `);

  response.json(dbResult.rows);
}

// GET /api/songs/search?q=sometext
// Returns songs where the title or any artist name contains the query string
async function searchSongs(request, response) {
  const q = request.query.q || "";
  const searchTerm = "%" + q + "%";

  const dbResult = await db.query(
    `
    with song_artists as (
      select sa.song_id, string_agg(a.name, ', ' order by a.artist_id) as artist
      from song_artist sa
      join artist a on a.artist_id = sa.artist_id
      group by sa.song_id
    )
    select s.song_id, s.title, sa.artist
    from songs s
    join song_artists sa on sa.song_id = s.song_id
    where s.title ilike $1 or sa.artist ilike $1
    order by s.song_id
  `,
    [searchTerm],
  );

  response.json(dbResult.rows);
}
