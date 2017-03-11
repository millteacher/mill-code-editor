let mysql=require('mill-mysql-utils');
let SQLite3 = require('sqlite3').verbose();
let path = require('path');
let Promise = require('promise');
let conn=require('../config/conn.js');
let db = new SQLite3.Database(path.resolve(__dirname,"../cache/db/business.db"));

//获取链接配置
const config=conn.conn;

//向字段表中插入数据
let insertSql=`
	insert into mill_field
	(column_name,data_type,table_name,column_default,is_nullable,numeric_precision,numeric_scale,column_key,column_comment)
	values
`;
let getFieldSql=`
select table_name,column_name,data_type,column_default,is_nullable,numeric_precision,numeric_scale,column_key,column_comment from information_schema.\`columns\` where table_schema=?
`;


let insertFieldNameArr=["field_id","column_name","data_type","table_name","column_default","is_nullable","numeric_precision","numeric_scale","column_key","column_comment"];

mysql.simpleConfig(config);
/**
	查找MySQL中所有的字段信息
*/
function insertMultisim(getFieldSql,config,insertFieldNameArr,insertSql,cb) {
	let insertSqlFail="";
	return mysql.getQuery(getFieldSql,[config.database])
	.then(function (data) {
		data.rows.forEach(function (item,index) {
			let ge=index==data.rows.length-1?";":",";
			insertSqlFail+="(";
			insertFieldNameArr.forEach(function (fieldName,i) {
				let ge=i==insertFieldNameArr.length-1?"":",";
				if(cb){
					insertSqlFail+="'"+cb(item,fieldName)+"'"+ge;
				}else
				insertSqlFail+="'"+item[fieldName]+"'"+ge;
			});
			insertSqlFail+=")"+ge;
		});
		db.run(insertSql+insertSqlFail,function (err) {
			if(err){
				console.log(err);
			}
		});

	},function (msg) {
		console.log(msg.data);
	});
}

/**
	更新表的主键列
*/
function updateTableKey(tableName,columnName) {
	mysql.getQuery("update mill_table set primary_key=? where table_name=?",[columnName,tableName])
}
let insertTableResult=insertMultisim("SELECT table_name,table_comment,create_time,update_time from information_schema.`TABLES` where table_schema=?"
	,config,["table_name","table_comment","create_time","update_time"],
	"insert into mill_table (table_name,table_comment,create_time,update_time) values "
	,function (item,fieldName) {
		if(fieldName=="field_id"){
			return item['table_name']+'&'+item['column_name'];
		}
		if(fieldName=="create_time"||fieldName=="update_time"){
			return item[fieldName]?item[fieldName].getTime():null;
		}else{
			return item[fieldName];
		}
	});


insertTableResult.then(function () {
	insertMultisim(getFieldSql,config,insertFieldNameArr,insertSql);
});


