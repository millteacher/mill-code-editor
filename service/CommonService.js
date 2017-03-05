var SQLite3=require('sqlite3');
var Promise=require('promise');
var path=require('path');
var sqls=require('../config/sqls.js');
var db = null,url=null;
function setDb (file) {
	url=file;
	db=new SQLite3.Database(path.resolve(__dirname,"../cache/db/"+file+".db"));
}
function insert (arr,tableName) {
	var sql=sqls[url][tableName]['insert'];
	return runSql (sql,arr);
}

function runSql (sql,parmas) {
	return new Promise(function  (resolve,reject) {
		
		db.run(sql,parmas,function  (err) {
			if(err){
				reject(err);
			}else{
				resolve();
			}
		});
	});
}

function update (arr,tableName) {
	var sql=sqls[url][tableName]['update'];
	return runSql (sql,arr);
}

function deleteRow (arr,tableName) {
	var sql=sqls[url][tableName]['deleteRow'];
	return runSql (sql,arr);
}
function deleteAll (tableName) {
	var sql='delete from '+tableName;
	return runSql (sql,[]);
}

function getRow (arr,tableName) {//查询一行
	var sql=sqls[url][tableName]['getRow'];
	return new Promise(function  (resolve,reject) {
		db.get(sql,arr,function  (err,data) {
			if(err)reject(err);
			else{
				resolve(data);
			}
		});
	});
}

function getAll (arr,tableName) {//查所有数据一般需要做分页
	var sql=sqls[url][tableName]['getAll'];
	return new Promise(function  (resolve,reject) {
		db.all(sql,arr,function  (err,data) {
			if(err)reject(err);
			else{
				resolve(data);
			}
		});
	});
}

module.exports={
	getAll:getAll,
	getRow:getRow,
	deleteRow:deleteRow,
	insert:insert,
	update:update,
	setDb:setDb,
	deleteAll:deleteAll
}

/*var promiseResult=getAll({

	id:4
});

promiseResult.then(function  (data) {
	console.log(data);
},function  (err) {
	console.error(err);
});*/