var SQLite3=require('sqlite3');
var Promise=require('promise');
var path=require('path');
var db = new SQLite3.Database(path.resolve(__dirname,"../cache/db/mcode.db"));

function insert (obj) {
	var sql=`insert into code_manager 
	(name,content,template,parent_id,is_leaf) 
	values(?,?,?,?,?)`;
	var parmas=[
			obj.name,
			obj.content,
			obj.template,
			obj.parent_id,
			obj.is_leaf
		];
	return runSql (sql,parmas);
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

function update (obj) {
	var sql=`update  code_manager 
	set name=?,content=?,template=?,parent_id=?,is_leaf=?
	where id=?
	`;
	var parmas=[
			obj.name,
			obj.content,
			obj.template,
			obj.parent_id,
			obj.is_leaf,
			obj.id
		];
	return runSql (sql,parmas);
}

function deleteRow (obj) {
	var sql='delete from code_manager where id=?';
	return runSql (sql,[obj.id]);
}
function deleteModel (obj) {
	var sql='delete from code_manager where id=? or parent_id=?';
	return runSql (sql,[obj.id,obj.id]);
}

function getRow (obj) {//查询一行
	var sql='select * from code_manager where id=?';
	return new Promise(function  (resolve,reject) {
		db.get(sql,[obj.id],function  (err,data) {
			if(err)reject(err);
			else{
				resolve(data);
			}
		});
	});
}

function getAll () {//查所有数据一般需要做分页
	var sql='select * from code_manager';
	return new Promise(function  (resolve,reject) {
		db.all(sql,function  (err,data) {
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
	deleteModel:deleteModel
}

/*var promiseResult=getAll({

	id:4
});

promiseResult.then(function  (data) {
	console.log(data);
},function  (err) {
	console.error(err);
});*/