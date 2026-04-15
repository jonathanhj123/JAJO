SELECT DISTINCT a.address_name
FROM address a
JOIN transfers t ON (
    t.sender_address_id = a.address_id
    OR t.receiver_address_id = a.address_id
)
JOIN currency c ON c.currency_id = t.currency_id
WHERE c.symbol = $1;


select distinct *
from transfers tsf
join transaction tx on tx.transaction_id = tsf.transaction_id
where tx.transactions_hash = $1


select distinct date
from block b
join transaction tx on tx.block_id = b.block_id
where tx.transactions_hash = $1

select *
from block b
where block_id = $1


select exists(
select 1
from block 
where block_hash = '0002a81'
)

select t.transaction_id
from transaction t
join block b on t.block_id = b.block_id
where b.block_hash = $1


select c.symbol, MIN(date) as first, MAX(date) as last
from block b
join transaction tx on b.block_id =  tx.block_id
join transfers tsf on tsf.transaction_id = tx.transaction_id
join currency c on tsf.currency_id = c.currency_id
JOIN address a ON (tsf.sender_address_id = a.address_id OR tsf.receiver_address_id = a.address_id)
where a.address_name= 'a0324425e7'
group by symbol;
