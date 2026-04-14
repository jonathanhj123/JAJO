import { connect } from './connect.js';
import pg from 'pg';
import upload from 'pg-upload';

const db = await connect();
const timestamp = (await db.query('select now() as timestamp')).rows[0]['timestamp'];
console.log(`Recreating database on ${timestamp}...`);


//Drop alle gamle tables ved opstart
await db.query('drop table if exists block');
await db.query('drop table if exists transaction');
await db.query('drop table if exists transfers');
await db.query('drop table if exists currency');
await db.query('drop table if exists wallet_currency');
await db.query('drop table if exists address');
await db.query('drop table if exists wallet');

//lav block table
await db.query(` 
    create table block (
        block_id   integer,
        date  text,
        PreviousHash-block_id text,
        block_hash text
    )
`);
//importere csv data ind i SQL server
await upload(db, 'db/block.csv', `
    copy block (block_id, date, previoushash-block_id, block_hash)
    from stdin
    with csv header encoding 'utf-8'
`);

//Lav transaction table
await db.query(`
    create table transaction (
        block_block_id    integer,
        transaction_id   integer,
        transactions_hash    text
    )
`);
await upload(db, 'db/transaction.csv', `
    copy transaction (block_block_id, transaction_id, transactions_hash)
    from stdin
    with csv header encoding 'utf-8'
`);

//Lav transfers table
await db.query(`
    create table transfers (
        transaction_id foreign key  integer,
        currency_id foreign key   integer,
        address_id integer
    )
`);
//real = float (32bit floating)
await upload(db, 'db/transfers.csv', `
    copy transfers (transaction_id, currency_id, address_id)
    from stdin
    with csv header encoding 'utf-8'
`);



//Lav currency table
await db.query(`
    create table currency (
        name    text,
        currency_id    integer
    )   
`)
//bigint = 64 bit heltal
//numeric = 10 cifre før decimalkomma og 2 efter
await upload (db, 'db/currency.csv', `
    copy currency (name, currency_id)
    from stdin
    with csv header encoding 'utf-8'
`);


//Lav address table
await db.query(`
    create table address (
        address_id    integer,
        address_name    text,
        wallet_id int
    )   
`)
await upload (db, 'db/address.csv', `
    copy address (address_id, address_name, wallet_id)
    from stdin
    with csv header encoding 'utf-8'
`);

//Lav wallet_currency table
await db.query(`
    create table wallet_currency (
        currency_id integer,
        wallet_id   integer
    )   
`)
await upload (db, 'db/wallet_currency.csv', `
    copy wallet_currency (currency_id, wallet_id)
    from stdin
    with csv header encoding 'utf-8'
`);

//Lav wallet table
await db.query(`
    create table wallet (
        wallet_id integer,
        address_id integer
    )   
`)
await upload (db, 'db/wallet.csv', `
    copy wallet (wallet_id, address_id)
    from stdin
    with csv header encoding 'utf-8'
`);

await db.end();
console.log('Database successfully recreated.');