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
where tx.transaction.hash = $1