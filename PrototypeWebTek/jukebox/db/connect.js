import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const env = {
  host: process.env.pg_host,
  port: parseInt(process.env.pg_port),
  database: process.env.pg_database,
  user: process.env.pg_user,
  password: process.env.pg_password,
  ssl: { rejectUnauthorized: false },
};

// Single connection — used for one-off scripts like createDb.js.
export async function connect() {
  const client = new pg.Client(env);
  await client.connect();
  return client;
}

// Connection pool — used by the server so multiple requests can share connections.
export function pool() {
  return new pg.Pool(env);
}
