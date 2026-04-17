CREATE TABLE "songs" (
  "song_id" integer PRIMARY KEY,
  "artist_id" integer,
  "title" text
);

CREATE TABLE "song_artist" (
  "artist_id" integer NOT NULL,
  "song_id" integer NOT NULL
);

CREATE TABLE "artist" (
  "artist_id" integer PRIMARY KEY,
  "name" text
);

CREATE TABLE "artist_song_artist" (
  "artist_artist_id" integer,
  "song_artist_artist_id" integer,
  PRIMARY KEY ("artist_artist_id", "song_artist_artist_id")
);

ALTER TABLE "artist_song_artist" ADD FOREIGN KEY ("artist_artist_id") REFERENCES "artist" ("artist_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "artist_song_artist" ADD FOREIGN KEY ("song_artist_artist_id") REFERENCES "song_artist" ("artist_id") DEFERRABLE INITIALLY IMMEDIATE;


CREATE TABLE "songs_song_artist" (
  "songs_song_id" integer,
  "song_artist_song_id" integer,
  PRIMARY KEY ("songs_song_id", "song_artist_song_id")
);

ALTER TABLE "songs_song_artist" ADD FOREIGN KEY ("songs_song_id") REFERENCES "songs" ("song_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "songs_song_artist" ADD FOREIGN KEY ("song_artist_song_id") REFERENCES "song_artist" ("song_id") DEFERRABLE INITIALLY IMMEDIATE;

