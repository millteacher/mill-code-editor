
let parseString = require('xml2js').parseString;
let mutil=require('mill-n-utils');


let sql=`SELECT * from order_info  i INNER JOIN order_payment_info p on i.order_payment_id=p.order_payment_id
	where id=? and date between ? and ? or arg like "%?%"
`;
	let sql2='SELECT * from order_info i INNER JOIN order_payment_info p on i.order_payment_id=p.order_payment_id INNER JOIN bus_store_user u ON p.store_id=u.store_id ORDER BY p.store_id desc';
function doJoin (sql2) {
	let joins=sql2.match(/\w+\s+JOIN/ig);
	if(!joins||!Array.isArray(joins))return sql2;
	joins.forEach(function  (item) {
		sql2=sql2.replace(item,"</table><table>");
	});
	return sql2;
}
function doOn (sql2) {
	let ons=sql2.match(/on\s+[\w\.]+\s*=\s*[\w\.]+/ig);
	if(!ons||!Array.isArray(ons))return sql2;
	ons.forEach(function  (item) {
		sql2=sql2.replace(item,"</table> <on>"+item+"</on>");
	});
	sql2=sql2.replace(/<\/on> <\/table>/g,"</on>");
	return sql2;
}
function delTableTag (sql2) {
	sql2=sql2.replace("<table>","◇");
	sql2=sql2.replace(/<\/table>([^◇]*)<\/table>/g,"</table>$1");
	return sql2.replace("◇","<table>");
}
function parseJoinSql(sql2) {
	
	sql2=sql2.replace(/from/i,"</fields><table>");
	sql2=sql2.replace(/\s\s/g," ");
	sql2=sql2.replace(/select/i,"<fields>");
	//处理join
	sql2=doJoin (sql2);
	//处理on
	sql2=doOn(sql2);
	//处理order by
	sql2=sql2.replace(/ORDER\s+BY\s+([\w\.]+)\s*(desc|asc)*/i,"</where><order by='$2'>$1</order>");
	//处理where
	sql2=sql2.replace(/<\/on> <\/where>/g,"</on>");
	sql2=sql2.replace(/\bwhere\b/i,"<where>");
	//处理between
	sql2=sql2.replace(/(\w+)\sbetween\s([\w\?]*\sand\s[\w\?]*)\s/g,"<between field='$1'>$2</between></where>");
	let xml='<select>'+sql2+'</table></select>';
	xml=delTableTag(xml);

	//处理and
	// sql2=sql2.replace(/\sand\s/ig,);
	mutil.mfs.write('temp.json',xml);
	parseString(xml, {async :true},function (err, result) {
		if(err)console.log(err);
		else{
			// console.log(JSON.stringify(result));
			mutil.mfs.writeJSON('sqltemp.json',result);
		}
	  
	});
	
}

parseJoinSql("select * from user_info");