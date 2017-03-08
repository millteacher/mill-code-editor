
function parseJoinSql(argument) {
	let sql='SELECT * from order_info i INNER JOIN order_payment_info p on i.order_payment_id=p.order_payment_id';
	let sql2='SELECT * from order_info i INNER JOIN order_payment_info p on i.order_payment_id=p.order_payment_id INNER JOIN bus_store_user u ON p.store_id=u.store_id ORDER BY p.store_id';
	let joins=sql2.match(/\w+\s+JOIN/g);
	console.warn(joins);
}

parseJoinSql();