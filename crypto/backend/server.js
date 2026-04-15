import express, { response } from "express";
import { pool } from "../db/connect.js";
import req from "express/lib/request.js";

const db = pool();

const port = 3005;
const server = express();
server.use(express.static("frontend"));
server.use(onEachRequest);
server.get("/api/activeAddresses/:name", getActiveAdresses);
server.get("/api/activeAddresses/:name", getActiveAdresses);
server.get("/api/transactionHash/:hash", getTransactionOnHash);
server.get("/api/transactionHashTimestamp/:hash", getTimeStampOnHash);
server.get("/api/blockHeight/:height", returnBlockOnHeight);
server.get("/api/blockHash/:hash", blockExistsOnHash);
server.get("/api/blockHashTransactions/:hash", transactionsOnBlockHash);
server.get("/api/currencyAndTimestampAddress/a0324425e7");
server.get("/api/addressCurrencyAmount/a0324425e7");
server.get("/api/addressCurrencyAmountSum/a0324425e7");
server.get("/api/addressAllTransactions/a0324425e7");
server.listen(port, onServerReady);

function onServerReady() {
  console.log("Webserver running on port", port);
}

function onEachRequest(request, response, next) {
  console.log(new Date(), request.method, request.url);
  next();
}

async function transactionsOnBlockHash(request, response) {
  const hash = request.params.hash;
  const dbResult = await db.query(
    `
    select t.transactions_hash
    from transaction t
    join block b on t.block_id = b.block_id
    where b.block_hash = $1
    `,
    [hash],
  );
  response.json(dbResult.rows);
}

async function blockExistsOnHash(request, response) {
  const hash = request.params.hash;
  const dbResult = await db.query(
    `
    select exists(
    select 1
    from block 
    where block_hash = $1
    )
    `,
    [hash],
  );
  response.json(dbResult.rows);
}

async function returnBlockOnHeight(request, response) {
  const height = request.params.height;
  const dbResult = await db.query(
    `
    select exists(
    select 1
    from block b
    where block_id = $1
    )
    `,
    [height],
  );

  response.json(dbResult.rows);
}

async function getActiveAdresses(request, response) {
  const name = request.params.name;
  const dbResult = await db.query(
    `
    SELECT DISTINCT a.address_name
    FROM address a
    JOIN transfers t ON (
        t.sender_address_id = a.address_id
        OR t.receiver_address_id = a.address_id
    )
    JOIN currency c ON c.currency_id = t.currency_id
    WHERE c.symbol = $1;
    `,
    [name],
  );

  response.json(dbResult.rows);
}

async function getTransactionOnHash(request, response) {
  const hash = request.params.hash;
  const dbResult = await db.query(
    `
    select distinct *
    from transfers tsf
    join transaction tx on tx.transaction_id = tsf.transaction_id
    where tx.transactions_hash = $1
    `,
    [hash],
  );

  response.json(dbResult.rows);
}

async function getTimeStampOnHash(request, response) {
  const hash = request.params.hash;
  const dbResult = await db.query(
    `
    select distinct date
    from block b
    join transaction tx on tx.block_id = b.block_id
    where tx.transactions_hash = $1
    `,
    [hash],
  );

  response.json(dbResult.rows);
}

/*async function onGetCostars(request, response) {
  const name = request.params.name;
  const dbResult = await db.query(
    `
        select distinct a2.actor_name as costar, m0.title as movie
        from actors a1
        join castings c1 on c1.actor_id = a1.actor_id
        join movies m0 on m0.movie_id = c1.movie_id
        join castings c2 on c2.movie_id = m0.movie_id
        join actors a2 on a2.actor_id = c2.actor_id
        where a1.actor_name = $1 and a1.actor_id <> a2.actor_id`,
    [name],
  );
  response.json(dbResult.rows);
}
*/
