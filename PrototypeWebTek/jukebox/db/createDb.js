import { connect } from "./connect.js";
import upload from "pg-upload";

const db = await connect();
const timestamp = (await db.query("select now() as timestamp")).rows[0]["timestamp"];
console.log(`Recreating jukebox database on ${timestamp}...`);

// Drop old tables (song_artist first because it references the others)
await db.query("drop table if exists song_artist");
await db.query("drop table if exists songs");
await db.query("drop table if exists artist");

// Create artist table
await db.query(`
  create table artist (
    artist_id integer unique not null,
    name      text not null
  )
`);

await upload(db, "data/artist.csv", `
  copy artist (artist_id, name)
  from stdin
  with csv header encoding 'utf-8'
`);

// Create songs table
await db.query(`
  create table songs (
    song_id   integer unique not null,
    artist_id integer not null references artist (artist_id),
    title     text not null
  )
`);

await upload(db, "data/songs.csv", `
  copy songs (song_id, artist_id, title)
  from stdin
  with csv header encoding 'utf-8'
`);

// Create song_artist junction table
await db.query(`
  create table song_artist (
    artist_id integer not null references artist (artist_id),
    song_id   integer not null references songs (song_id)
  )
`);

await upload(db, "data/song_artist.csv", `
  copy song_artist (artist_id, song_id)
  from stdin
  with csv header encoding 'utf-8'
`);

await db.end();
console.log("Jukebox database successfully recreated.");
