var SQLite3=require('sqlite3');
var path=require('path');
var db = new SQLite3.Database(path.resolve(__dirname,"../cache/db/mcode.db"));

function insert (obj) {
	if(!obj)return;
	var sql=`insert into code_manager 
	(name,content,template,parent_id) 
	values(?,?,?,?)`;
	db.run(sql,[
		obj.name,
		obj.content,
		obj.template,
		obj.parent_id
	],function  (err) {
		console.log(err);
	});
}

insert({
	name:"css"
	,content:""
	,template:""
	,parent_id:0
});