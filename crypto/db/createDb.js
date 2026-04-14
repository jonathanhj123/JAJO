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
        block_id  integer unique not null references transaction (block_id),
        date  text  not null,
        PreviousHash-block_id text not null,
        block_hash text  not null
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
        block_id  integer not null,
        transaction_id   integer unique not null,
        transactions_hash    text not null
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
        transaction_id  integer not null,
        currency_id   integer not null,
        address_id integer not null
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
        name    text not null,
        currency_id    integer unique not null references wallet_currency (currency_id)
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
        address_id    integer unique not null references wallet (address_id),
        address_name    text not null,
        wallet_id int not null
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
        currency_id integer not null,
        wallet_id   integer not null
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
        wallet_id integer unique not null references wallet_currency (wallet_id),
        address_id integer not null
    )   
`)
await upload (db, 'db/wallet.csv', `
    copy wallet (wallet_id, address_id)
    from stdin
    with csv header encoding 'utf-8'
`);

await db.end();
console.log('Database successfully recreated.');